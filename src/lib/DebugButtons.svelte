<script lang="ts">
    import { loadFromCloud, loadTestData2, saveToCloud } from "../loader";
    import { MODEL, INTERVAL_FOCUSED } from "./stores";

    async function save(e: Event) {
        if ($MODEL == null) {
            alert("wtf, model je null. Nic se nebude ukladat");
        } else {
            await saveToCloud($MODEL);
            alert("Done.");
        }
    }

    function testData() {
        $MODEL = loadTestData2();
    }
    async function cloudData() {
        $MODEL = await loadFromCloud();
    }

    function deleteSelectedInterval() {
        if ($INTERVAL_FOCUSED == null) {
            alert("nic neni vybrano")
            return
        } else {
            let focused = $INTERVAL_FOCUSED
            MODEL.update((model) => {
                if (model == null) return null;
                let _ = model.schedule.splice(focused, 1)
                return model
            })
            INTERVAL_FOCUSED.set(null)
        }
    }
</script>

<div
    class="flex-1 rounded-xl border-solid border-slate-200 border-2 p-4 min-w-80 bg-gray-200 flex flex-row flex-wrap"
>
    <button
        class="block bg-lime-300 hover:bg-lime-500 rounded shadow m-4 p-2 font-bold"
        on:click={testData}>Load test data</button
    >
    <button
        class="block bg-amber-300 hover:bg-amber-500 rounded shadow m-4 p-2 font-bold"
        on:click={cloudData}>Load cloud data</button
    >
    <button
        on:click={save}
        class="block bg-rose-300 hover:bg-rose-500 rounded shadow m-4 p-2 font-bold"
        >Save to cloud</button
    >

    <button
        on:click={deleteSelectedInterval}
        class="block bg-blue-300 hover:bg-blue-500 rounded shadow m-4 p-2 font-bold"
        >Delete selected interval</button
    >
</div>
