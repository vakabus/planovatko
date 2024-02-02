<script lang="ts">
    import type { Model2 } from "../model";
    import BlockDetail from "./BlockDetail.svelte";
    import BlockHierarchy from "./BlockHierarchy.svelte";
    import IntervalEditor from "./IntervalEditor.svelte";
    import Timeline from "./Timeline.svelte";
    import DebugButtons from "./DebugButtons.svelte";

    export let model: Model2;
</script>

<h1 class="text-4xl underline mb-6 mx-auto">{model.title}</h1>
<Timeline {model} />
<div class="w-full h-2"></div>
<div class="flex flex-row flex-wrap w-full gap-2">
    <BlockDetail {model} />
    <BlockHierarchy {model} />
    <IntervalEditor {model} />
    <DebugButtons {model} />
</div>
