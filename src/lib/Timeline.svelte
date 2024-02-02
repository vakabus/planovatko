<script lang="ts">
    import { secondsToClock, type Model2, SECONDS_IN_A_DAY } from "../model";
    import Day from "./Day.svelte";
    import { BLOCK_FOCUSED, INTERVAL_FOCUSED } from "./stores";

    export let model: Model2;

    let days: IterableIterator<number>;
    let offsetX: number = -1;
    let headerElement: HTMLElement | undefined;
    let maxDay: number;
    $: {
        maxDay = Math.ceil(
            Math.max(
                ...model.schedule.map((int) => int.end / SECONDS_IN_A_DAY),
            ),
        );
        days = Array(maxDay).keys();
    }

    function handle(ev: MouseEvent) {
        if (headerElement == null) return;
        offsetX = ev.pageX - headerElement.getBoundingClientRect().left;
    }

    function handleLeave(ev: MouseEvent) {
        // make the time disappear
        offsetX = -100;
    }

    function offsetToTime(offset: number): number {
        return (
            (offsetX * SECONDS_IN_A_DAY) / (headerElement?.offsetWidth ?? 100)
        );
    }

    function clearIntervalFocus(e: Event) {
        $INTERVAL_FOCUSED = null;
        $BLOCK_FOCUSED = null;
    }
</script>

<div
    on:mousemove={handle}
    on:mouseleave={handleLeave}
    on:click={clearIntervalFocus}
    on:keypress={clearIntervalFocus}
    role="grid"
    tabindex="-1"
    class="grid grid-cols-[6em_1fr] gap-2 p-4 rounded-xl border-solid border-slate-200 border-2"
>
    <div class="col-span-2">{secondsToClock(offsetToTime(offsetX))}</div>
    <div class="schedule-header"></div>
    <div bind:this={headerElement}></div>
    {#each days as day}
        <Day {model} {day} />
    {:else}
        <div>Nope</div>
        <div>No data for timeline</div>
        <div></div>
        <div>{JSON.stringify(model)}</div>
    {/each}
</div>
