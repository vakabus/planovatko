<script lang="ts">
  import BlockDetail from "./lib/BlockDetail.svelte";
  import BlockHierarchy from "./lib/BlockHierarchy.svelte";
  import Timeline from "./lib/Timeline.svelte";
  import { loadFromCloud, loadTestData2, saveToCloud } from "./loader";
  import { MODEL } from "./lib/stores"

  function testData() {
    $MODEL = loadTestData2();
  }
  async function cloudData() {
    $MODEL = await loadFromCloud();
  }

  async function saveTestToCloud() {
    let data = loadTestData2()
    await saveToCloud(data)
    alert("done")
  }
</script>

<main class="w-full pt-12 px-6 mx-auto flex flex-col flex-wrap">
  {#if $MODEL == null}
    <button class="bg-lime-300 hover:bg-lime-500 rounded shadow my-4 p-2 font-bold" on:click={testData}>Load test data</button>
    <button class="bg-amber-300 hover:bg-amber-500 rounded shadow my-4 p-2 font-bold" on:click={cloudData}>Load cloud data</button>
    <button class="bg-rose-300 hover:bg-rose-500 rounded shadow my-4 p-2 font-bold" on:click={saveTestToCloud}>Save test data to cloud data</button>
  {:else}
    <h1 class="text-4xl underline mb-6 mx-auto">{$MODEL.title}</h1>
    <Timeline model={$MODEL} />
    <div class="w-full h-2"></div>
    <div class="flex flex-row flex-wrap w-full gap-2">
      <BlockDetail model={$MODEL} />
      <BlockHierarchy model={$MODEL} />
    </div>
  {/if}
</main>
