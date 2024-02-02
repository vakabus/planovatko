<script lang="ts">
    import {
        getAllSuperblocks,
        type Model,
        type ScheduleInterval,
    } from "../model";
    import {
        BLOCK_FOCUSED,
        BLOCK_HIGHLIGHTED,
        INTERVAL_FOCUSED,
    } from "./stores";

    export let index: number;
    export let interval: ScheduleInterval;
    export let pixelsPerSecond: number;
    export let model: Model;

    let superblocks: Set<string>;
    $: superblocks = getAllSuperblocks(model, interval.block);

    function mouseover(ev: MouseEvent) {
        $BLOCK_HIGHLIGHTED = interval.block;
    }

    function highlight(_e: Event) {
        $BLOCK_HIGHLIGHTED = interval.block;
    }

    function stopHighlight(_e: Event) {
        $BLOCK_HIGHLIGHTED = null;
    }

    function focus(e: Event) {
        $BLOCK_FOCUSED = interval.block;
        $INTERVAL_FOCUSED = index;
        e.stopPropagation();
    }

    function shouldWeHighlight(highligtedBlockId: string | null) {
        if (highligtedBlockId == null) return false;
        return superblocks.has(highligtedBlockId);
    }
</script>

<div
    on:mouseenter={highlight}
    on:mouseleave={stopHighlight}
    on:click={focus}
    on:keypress={focus}
    role="cell"
    tabindex="-1"
    class="{shouldWeHighlight($BLOCK_HIGHLIGHTED)
        ? 'bg-indigo-800'
        : 'bg-indigo-500'} absolute top-0 h-full rounded"
    style="left: {pixelsPerSecond * interval.start}px; width: {pixelsPerSecond *
        (interval.end - interval.start)}px"
></div>
