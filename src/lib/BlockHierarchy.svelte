<script lang="ts">
    import type { Block, Model } from "../model";
    import { BLOCK_FOCUSED, BLOCK_HIGHLIGHTED } from "./stores";
    import { DataSet, Network } from "vis-network/standalone";

    export let model: Model;
    let container: HTMLElement;
    let width: number = 200;
    let height: number = 200;
    let network: Network | null = null;

    function constructVisGraph(model: Model): Network {
        // create an array with nodes
        let nodes = new DataSet(
            Object.entries(model.blocks).map(([id, obj]) => ({
                id: id,
                label: obj.title ?? "?? no title ??",
            })),
        );

        let edgeData = [];
        for (let id of Object.keys(model.blocks)) {
            for (let e of model.blocks[id].extends ?? []) {
                edgeData.push({ from: id, to: e, arrows: "to" });
            }
        }
        let edges = new DataSet(edgeData);

        // create a network
        var data = {
            nodes: nodes,
            edges: edges,
        };
        let options = {
            autoResize: true,
            layout: {
                hierarchical: {
                    direction: "DU",
                    sortMethod: "directed",
                },
            },
            physics: {
                enabled: false,
            },
            interaction: {
                hover: true,
                hoverConnectedEdges: false,
                multiselect: false,
                selectable: false,
                selectConnectedEdges: false,
                zoomView: false,
            },
        };
        return new Network(container, data, options);
    }

    function redraw(model: Model) {
        if (container != null) {
            if (network != null) {
                network.destroy()
            }

            network = constructVisGraph(model);
            network.on("hoverNode", (ev) => {
                $BLOCK_HIGHLIGHTED = ev.node;
            });
            network.on("blurNode", (_ev) => {
                $BLOCK_HIGHLIGHTED = null;
            });
            network.on("click", (ev) => {
                if (ev.items.length > 0) {
                    $BLOCK_FOCUSED = $BLOCK_HIGHLIGHTED;
                } else {
                    $BLOCK_FOCUSED = null;
                }
            });
        }
    }

    $: redraw(model), container
</script>

<div
    class="relative rounded-xl border-solid border-slate-200 border-2 p-4 min-w-120 min-h-96"
>
    <div
        class="absolute top-0 bottom-0 left-0 right-0"
        bind:this={container}
        on:resize={() => {
            redraw(model)
        }}
    ></div>
    <h3 class="text-2xl mb-4">Hierarchie</h3>
</div>
