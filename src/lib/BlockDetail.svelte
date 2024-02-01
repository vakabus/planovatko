<script lang="ts">
    import type {Block, Model2} from "../model"
    import {getBlock} from "../model"
    import { BLOCK_FOCUSED } from "./stores";

    export let model: Model2

    let block: Block | null = null
    $: {
        let focused = $BLOCK_FOCUSED
        if (focused != null) block = getBlock(model, focused)
    }
</script>

<style>

</style>

<div>
    {#if block != null}
        <h3>{block.title}</h3>
        <p></p>
    {:else}
        <p>No block selected</p>
    {/if}
    
</div>