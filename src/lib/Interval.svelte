<script lang="ts">
    import type { ScheduleInterval } from "../model";
    import { BLOCK_FOCUSED, BLOCK_HIGHLIGHTED } from "./stores";

    export let interval: ScheduleInterval;
    export let pixelsPerSecond: number;

    function mouseover(ev: MouseEvent) {
        $BLOCK_HIGHLIGHTED = interval.block;
    }
</script>

<div
    on:mouseenter={(ev) => ($BLOCK_HIGHLIGHTED = interval.block)}
    on:mouseleave={(ev) => ($BLOCK_HIGHLIGHTED = null)}
    on:click={(ev) => ($BLOCK_FOCUSED = interval.block)}
    on:keypress={(ev) => ($BLOCK_FOCUSED = interval.block)}
    role="cell"
    tabindex="-1"
    class="{$BLOCK_HIGHLIGHTED == interval.block
        ? 'bg-indigo-800'
        : 'bg-indigo-500'} absolute top-0 h-full rounded"
    style="left: {pixelsPerSecond * interval.start}px; width: {pixelsPerSecond *
        (interval.end - interval.start)}px"
></div>
