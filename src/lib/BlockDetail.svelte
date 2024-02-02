<script lang="ts">
    import type { Block, Model2 } from "../model";
    import { getBlock } from "../model";
    import { BLOCK_FOCUSED } from "./stores";

    export let model: Model2;

    let block: Block | null = null;
    $: {
        let focused = $BLOCK_FOCUSED;
        block = focused ? getBlock(model, focused) : null;
    }
</script>

<div
    class="flex-1 rounded-xl border-solid border-slate-200 border-2 p-4 min-w-80"
>
    {#if block != null}
        <h3 class="text-2xl mb-4">{block.title}</h3>
        <p>Here will be all the details...</p>
    {:else}
        <p>No block selected</p>
    {/if}
</div>
