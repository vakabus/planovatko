<script lang="ts">
  import BlockDetail from "./lib/BlockDetail.svelte";
  import BlockHierarchy from "./lib/BlockHierarchy.svelte";
  import Timeline from "./lib/Timeline.svelte";
  import { loadTestData2 } from "./loader";

  let model = loadTestData2();
</script>

<main class="w-full pt-24 px-6 mx-auto flex flex-col">
  <h1 class="text-3xl font-bold mb-6 mx-auto">{model.title}</h1>
  <Timeline {model} />
  <hr class="my-6" />
  <div class="flex flex-row flex-wrap w-full">
    <BlockDetail {model} />
    <BlockHierarchy {model} />
  </div>
</main>
