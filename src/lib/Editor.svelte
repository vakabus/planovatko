<script lang="ts">
    import type { Model } from "../model";
    import BlockDetail from "./BlockDetail.svelte";
    import BlockHierarchy from "./BlockHierarchy.svelte";
    import Timeline from "./Timeline.svelte";

    export let model: Model
</script>

<h1 class="text-4xl underline mb-6 mx-auto">{model.title}</h1>
<Timeline {model} />
<div class="w-full h-2"></div>
<div class="flex flex-row flex-wrap w-full gap-2">
    <IntervalEditor {model} />
    <BlockDetail {model} />
</div>