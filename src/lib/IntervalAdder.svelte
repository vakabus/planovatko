<script lang="ts">
    import {
        secondsToClock,
        type Model,
        type ScheduleInterval,
        parseTime,
    } from "../model";
    import { MODEL } from "./stores";

    let startEdit: HTMLInputElement;
    let endEdit: HTMLInputElement;
    let blockSelect: HTMLSelectElement;

    function add(e: Event) {
        try {
            var newStart = parseTime(startEdit.value);
            var newEnd = parseTime(endEdit.value);
        } catch (e) {
            alert("You did something wrong: " + e);
            return;
        }

        let interval: ScheduleInterval = {
            block: blockSelect.value,
            start: newStart,
            end: newEnd,
        };

        MODEL.update((model) => {
            if (model == null) return null;
            model.schedule.push(interval);
            return model;
        });
    }
</script>

<div
    class="flex-1 rounded-xl border-solid border-slate-200 border-2 p-4 min-w-80 bg-gray-200"
>
    {#if $MODEL == null}
        <p>Wut?</p>
    {:else}
        <h3 class="text-2xl mb-4">Přidat interval</h3>
        <div class="flex flex-row flex-wrap">
            <div class="pe-2">Block:</div>
            <select
                class="block shadow border bg-white p-1 border-gray-700 rounded"
                bind:this={blockSelect}
            >
                {#each Object.keys($MODEL.blocks) as key}
                    <option>{key}</option>
                {/each}
            </select>
        </div>
        <div class="mb-6 flex flex-row flex-wrap w-full items-center">
            <p class="pe-4">start at</p>
            <input
                class="block shadow border border-gray-700 rounded p-1 leading-tight focus:outline-none focus:shadow-outline"
                id="start"
                type="text"
                bind:this={startEdit}
                value="day 1 @ 8:00"
            />
            <p class="px-4">until</p>
            <input
                class="block shadow border border-gray-700 rounded p-1 leading-tight focus:outline-none focus:shadow-outline"
                id="end"
                type="text"
                value="day 1 @ 9:00"
                bind:this={endEdit}
            />
        </div>
        <button
            on:click={add}
            class="block ms-4 bg-amber-300 rounded p-1 px-2 hover:bg-amber-500"
            >Přidat</button
        >
    {/if}
</div>
