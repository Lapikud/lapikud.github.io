<script>
  import {
    Section,
  } from "$components";
  import { onDestroy } from "svelte";
  import { createPageTextStore } from "$lib";

  const text = createPageTextStore("AboutUs");

  onDestroy(() => {
    text.destroy();
  });
  
</script>

<div class="safe-area-navbar">
<Section>
  <p>In development...</p>
  <p>Põhikiri siia?</p>
</Section>
</div>