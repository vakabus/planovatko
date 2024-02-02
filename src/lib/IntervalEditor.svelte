<script lang="ts">
    import {
        secondsToClock,
        type Model2,
        type ScheduleInterval,
        parseTime,
    } from "../model";
    import { INTERVAL_FOCUSED, MODEL } from "./stores";

    export let model: Model2;

    let startEdit: HTMLInputElement;
    let endEdit: HTMLInputElement;

    let interval: ScheduleInterval | null;
    $: {
        let focused = $INTERVAL_FOCUSED;
        if (focused == null) {
            interval = null;
        } else {
            interval = model.schedule[focused];
        }
    }

    function change(e: Event) {
        if ($INTERVAL_FOCUSED == null) return;
        try {
            var newStart = parseTime(startEdit.value);
            var newEnd = parseTime(endEdit.value);
        } catch (e) {
            alert("You did something wrong: " + e);
            return;
        }

        let focused = $INTERVAL_FOCUSED;
        MODEL.update((model) => {
            if (model == null) return null;
            model.schedule[focused].start = newStart;
            model.schedule[focused].end = newEnd;
            return model;
        });
    }
</script>

<div
    class="flex-1 rounded-xl border-solid border-slate-200 border-2 p-4 min-w-80 bg-gray-200"
>
    {#if interval == null}
        <p>No interval selected</p>
    {:else}
        <h3 class="text-2xl mb-4">
            Uprava intervalu `{interval.block}` na indexu {$INTERVAL_FOCUSED}
        </h3>
        <div class="mb-6 flex flex-row flex-wrap w-full items-center">
            <p class="pe-4">start at</p>
            <input
                class="block shadow border border-gray-700 rounded p-1 leading-tight focus:outline-none focus:shadow-outline"
                id="start"
                type="text"
                bind:this={startEdit}
                value={secondsToClock(interval.start)}
            />
            <p class="px-4">until</p>
            <input
                class="block shadow border border-gray-700 rounded p-1 leading-tight focus:outline-none focus:shadow-outline"
                id="end"
                type="text"
                value={secondsToClock(interval.end)}
                bind:this={endEdit}
            />
            <button
                on:click={change}
                class="ms-4 bg-amber-300 rounded p-1 px-2 hover:bg-amber-500"
                >Změnit</button
            >
        </div>
    {/if}
</div>
