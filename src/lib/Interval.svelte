<script lang="ts">
    import type { ScheduleInterval } from "../model";
    import { BLOCK_FOCUSED, BLOCK_HIGHLIGHTED, INTERVAL_FOCUSED } from "./stores";

    export let index: number
    export let interval: ScheduleInterval;
    export let pixelsPerSecond: number;

    function mouseover(ev: MouseEvent) {
        $BLOCK_HIGHLIGHTED = interval.block;
    }

    function highlight(_e: Event) {
        $BLOCK_HIGHLIGHTED = interval.block
    }

    function stopHighlight(_e: Event) {
        $BLOCK_HIGHLIGHTED = null
    }

    function focus(e: Event) {
        $BLOCK_FOCUSED = interval.block
        $INTERVAL_FOCUSED = index
        e.stopPropagation()
    }
</script>

<div
    on:mouseenter={highlight}
    on:mouseleave={stopHighlight}
    on:click={focus}
    on:keypress={focus}
    role="cell"
    tabindex="-1"
    class="{$BLOCK_HIGHLIGHTED == interval.block
        ? 'bg-indigo-800'
        : 'bg-indigo-500'} absolute top-0 h-full rounded"
    style="left: {pixelsPerSecond * interval.start}px; width: {pixelsPerSecond *
        (interval.end - interval.start)}px"
></div>
