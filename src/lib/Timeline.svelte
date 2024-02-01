<script lang="ts">
    import { type Model2 } from "../model";
    import Day from "./Day.svelte";

    export let model: Model2;

    let width: number = 0;

    let days: IterableIterator<number>;
    let offsetX: number = -1;
    let headerElement: HTMLElement | undefined;
    $: maxDay = Math.ceil(
        Math.max(...model.schedule.map((int) => int.end / (24 * 3600))),
    );
    $: days = Array(maxDay).keys();
    $: console.log(days);
    $: console.log(width);

    function handle(ev: MouseEvent) {
        if (headerElement == null) return;
        offsetX = ev.pageX - headerElement.getBoundingClientRect().left;
    }

    function handleLeave(ev: MouseEvent) {
        // make the time disappear
        offsetX = -100
    }

    function offsetToTime(offset: number): number {
        return (offsetX * 24 * 3600) / (headerElement?.offsetWidth ?? 100);
    }

    function secondsToClock(seconds: number): string {
        let hours = Math.floor(seconds / 3600);
        let hoursStr = hours.toString().padStart(2, "0");
        let minutes = Math.round((seconds % 3600) / 60);
        let minutesStr = minutes.toString().padStart(2, "0");
        if (hours < 0 || minutes < 0) return "_";
        return `${hoursStr}:${minutesStr}`;
    }
</script>

<div
    on:mousemove={handle}
    on:mouseleave={handleLeave}
    role="grid"
    tabindex="-1"
    class="grid grid-cols-[6em_1fr] gap-2 p-4 rounded-xl border-solid border-slate-200 border-2"
>
    <div class="schedule-header">
        {secondsToClock(offsetToTime(offsetX))}
    </div>
    <div bind:this={headerElement}></div>
    {#each days as day}
        <Day {model} {day} />
    {:else}
        <div>Nope</div>
        <div>No data for timeline</div>
    {/each}
</div>
