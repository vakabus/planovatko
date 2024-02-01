<script lang="ts">
    import type {Block, Model2} from "../model"
    import {getBlock} from "../model"
    import { BLOCK_FOCUSED } from "./stores";

    export let model: Model2

    let hierarchy: string[][] = []
    $: {
        if ($BLOCK_FOCUSED != null) {
            let res: string[][] = []
            let layer: string[] = [$BLOCK_FOCUSED]
            let newLayer: string[] = []
            while (layer.length > 0) {
                for (let b of layer) {
                    for (let e of model.blocks[b].extends ?? []) {
                        newLayer.push(e)
                    }
                }
                res.push(layer)
                layer = newLayer
                newLayer = []
            }
            hierarchy = res
        }
    }
</script>

<div class="flex-1 rounded-xl border-solid border-slate-200 border-2 p-4 min-w-80">
    <h3 class="text-2xl mb-4 ">Hierarchie</h3>
    {#each hierarchy as layer}
        <p>
         {#each layer as block}
             <span>{block}</span>
         {/each}
        </p>
    {:else}
         <p>nothing</p>
    {/each}
    
</div>