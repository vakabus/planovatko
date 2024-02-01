<script lang="ts">
    import { getScheduleForDay, type Model2 } from "../model";
    import Interval from "./Interval.svelte";

    export let model: Model2;
    export let day: number;
    let width: number = 0;

    $: pixelsPerSecond = width / (24 * 3600);
    $: intervals = getScheduleForDay(model, day);
</script>

<div>Day {day + 1}</div>

<div
    class="relative w-full h-full flex flex-row py-2"
    bind:clientWidth={width}
    role="row"
>
    {#each intervals as interval}
        <Interval {interval} {pixelsPerSecond} />
    {/each}
</div>
