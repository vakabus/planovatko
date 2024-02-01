<script lang="ts">
  import BlockDetail from "./lib/BlockDetail.svelte";
import Timeline from "./lib/Timeline.svelte";
  import { loadTestData2 } from "./loader";

  let model = loadTestData2();
</script>

<main>
  <h1>{model.title}</h1>
  <Timeline {model} />
  <hr />
  <BlockDetail {model} />
</main>

<style>
  main {
    width: 100%;
  }
</style>
