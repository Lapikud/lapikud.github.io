<script>
  import {
    Section,
    Grid,
    Center,
  } from "$components";
  import { onDestroy } from "svelte";
  import { createPageTextStore } from "$lib";

  const text = createPageTextStore("Contact");

  onDestroy(() => {
    text.destroy();
  });
</script>

<div class="safe-area-navbar">
<Section>
  <p>In development...</p>
</Section>
</div>
