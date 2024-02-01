<script lang="ts">
    import { getScheduleForDay, type Model2 } from "../model";
    import Interval from "./Interval.svelte";

    export let model: Model2;
    export let day: number;
    let width: number = 0;

    $: pixelsPerSecond = width / (24 * 3600);
    $: intervals = getScheduleForDay(model, day);
</script>

<div class="day-header">Day {day + 1}</div>

<div class="day-timeline" bind:clientWidth={width} role="row">
    {#each intervals as interval}
        <Interval {interval} {pixelsPerSecond} />
    {/each}
</div>

<style>
    .day-header {
        min-width: 5em;
    }

    .day-timeline {
        /* so that the position absolute intervals have a reference point */
        position: relative;
        widows: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
    }
</style>
