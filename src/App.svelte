<script lang="ts">
  import { MODEL } from "./lib/stores"
  import Viewer from "./lib/Viewer.svelte";
  import DebugButtons from "./lib/DebugButtons.svelte";  
</script>

<main class="w-full pt-12 px-6 mx-auto flex flex-col flex-wrap">
  {#if $MODEL == null}
    <DebugButtons />
  {:else}
    <Viewer model={$MODEL} />
  {/if}
</main>
