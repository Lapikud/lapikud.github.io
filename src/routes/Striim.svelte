<script>
  import { Section, Grid } from "$components";
  import { onDestroy } from "svelte";
  import { createPageTextStore } from "$lib";

  let sectionElement;
  let imagesLoaded = 0;
  const totalImages = 3;
  const text = createPageTextStore("Striim");
  
  function handleImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === totalImages && sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onDestroy(() => {
    text.destroy();
  });
</script>

<div class="safe-area-navbar" bind:this={sectionElement}>
<Section fullWidth={true} contentClass="flex items-start">
  <Grid min="400px" class="w-full">
    <a href="https://master.lapikud.ee/stream/1/stream">
      <img src="https://master.lapikud.ee/stream/1/substream" alt={$text.streamAlts?.first || "camera 1 stream"} style="width:100%;" on:load={handleImageLoad}/>
    </a>

    <a href="https://master.lapikud.ee/stream/2/stream">
      <img src="https://master.lapikud.ee/stream/2/substream" alt={$text.streamAlts?.second || "camera 2 stream"} style="width:100%;" on:load={handleImageLoad}/>
    </a>

    <a href="https://master.lapikud.ee/stream/3/stream">
      <img src="https://master.lapikud.ee/stream/3/substream" alt={$text.streamAlts?.third || "camera 3 stream"} style="width:100%;" on:load={handleImageLoad}/>
    </a>
  </Grid>
</Section>
</div>
