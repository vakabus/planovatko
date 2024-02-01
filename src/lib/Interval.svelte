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
    on:mouseenter={(ev) => $BLOCK_HIGHLIGHTED = interval.block}
    on:mouseleave={(ev) => $BLOCK_HIGHLIGHTED = null}
    on:click={(ev) => $BLOCK_FOCUSED = interval.block}
    on:keypress={(ev) => $BLOCK_FOCUSED = interval.block}
    role="cell"
    tabindex="-1"
    class="interval {$BLOCK_HIGHLIGHTED == interval.block ? 'highlighted' : ''}"
    style="left: {pixelsPerSecond * interval.start}px; width: {pixelsPerSecond * (interval.end - interval.start)}px"
></div>

<style>
    .interval {
        position: absolute;
        top: 0;
        height: 100%;

        background-color: pink;
    }

    .highlighted {
        background-color: red;
    }
</style>
