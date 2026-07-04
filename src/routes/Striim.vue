<script setup>
  import { Section, Grid } from "../components/index.js";
  import { ref } from 'vue';

  import { usePageText } from "../lib/index.js";

  const sectionElement = ref(null);
  const imagesLoaded = ref(0);
  const totalImages = 3;
  const text = usePageText("Striim");

  function handleImageLoad() {
    imagesLoaded.value++;
    if (imagesLoaded.value === totalImages && sectionElement.value) {
        sectionElement.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<template>
<div class="safe-area-navbar" ref="sectionElement">
<Section :fullWidth="true" contentClass="flex items-start">
  <Grid min="400px" class="w-full">
    <a href="https://master.lapikud.ee/stream/1/stream">
      <img src="https://master.lapikud.ee/stream/1/substream" :alt="text.streamAlts?.first || 'camera 1 stream'" style="width:100%;" @load="handleImageLoad"/>
    </a>

    <a href="https://master.lapikud.ee/stream/2/stream">
      <img src="https://master.lapikud.ee/stream/2/substream" :alt="text.streamAlts?.second || 'camera 2 stream'" style="width:100%;" @load="handleImageLoad"/>
    </a>

    <a href="https://master.lapikud.ee/stream/3/stream">
      <img src="https://master.lapikud.ee/stream/3/substream" :alt="text.streamAlts?.third || 'camera 3 stream'" style="width:100%;" @load="handleImageLoad"/>
    </a>
  </Grid>
</Section>
</div>
</template>
