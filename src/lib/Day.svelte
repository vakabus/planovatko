<script lang="ts">
    import { getScheduleForDay, SECONDS_IN_A_DAY, type Model2, type ScheduleInterval } from "../model";
    import Interval from "./Interval.svelte";

    export let model: Model2;
    export let day: number;
    $: startTime = day * SECONDS_IN_A_DAY;
    let width: number = 0;

    $: pixelsPerSecond = width / SECONDS_IN_A_DAY;

    /* get the relevant intervals capped just to this day */
    let intervals: [number, ScheduleInterval][]
    $: intervals = getScheduleForDay(model, day).map(([i, int]) => [
        i,
        {
            ...int,
            start: Math.max(0, int.start - startTime),
            end: Math.min(SECONDS_IN_A_DAY - 1, int.end - startTime),
        },
    ]);
</script>

<div>Day {day + 1}</div>

<div
    class="relative w-full h-full flex flex-row py-2"
    bind:clientWidth={width}
    role="row"
>
    {#each intervals as interval}
        <Interval
            index={interval[0]}
            interval={interval[1]}
            {pixelsPerSecond}
        />
    {/each}
</div>
