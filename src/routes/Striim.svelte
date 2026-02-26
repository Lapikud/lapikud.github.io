<script>
  import { Section, Grid } from "$components";

  let sectionElement;
  let imagesLoaded = 0;
  const totalImages = 3;
  
  function handleImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === totalImages && sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<div bind:this={sectionElement}>
<Section>
  <Grid min="400px">
    <a href="https://master.lapikud.ee/stream/1/stream">
      <img src="https://master.lapikud.ee/stream/1/substream" alt="video0" style="width:100%;" on:load={handleImageLoad}/>
    </a>

    <a href="https://master.lapikud.ee/stream/2/stream">
      <img src="https://master.lapikud.ee/stream/2/substream" alt="video1" style="width:100%;" on:load={handleImageLoad}/>
    </a>

    <a href="https://master.lapikud.ee/stream/3/stream">
      <img src="https://master.lapikud.ee/stream/3/substream" alt="video2" style="width:100%;" on:load={handleImageLoad}/>
    </a>
    </Grid>
</Section>
</div>
