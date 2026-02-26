<script>
  import { onDestroy } from 'svelte';

  export let images = [];
  export let width = '100%';
  export let height = '100%';
  export let interactive = false;

  // automatic cycling options
  export let autoplay = false;
  export let interval = 3000;
  export let loop = true;

  export let startIndex = 0;

  let current = startIndex;
  let timer;

  const next = () => {
    if (current < images.length - 1) {
      current += 1;
    } else if (loop) {
      current = 0;
    }
  };

  const prev = () => {
    if (current > 0) {
      current -= 1;
    } else if (loop) {
      current = images.length - 1;
    }
  };

  // react to autoplay or interval changes
  $: {
    clearInterval(timer);
    if (autoplay && images.length > 1) {
      timer = setInterval(next, interval);
    }
  }

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div
  class="slideshow"
  style="width: {width}; height: {height};"
  aria-live="polite"
>
  {#if images.length}
    <img
      src={typeof images[current] === 'string' ? images[current] : images[current].src}
      alt={typeof images[current] === 'string' ? '' : images[current].alt || ''}
      class="slide"
    />

    {#if interactive && images.length > 1}
      <button class="prev" on:click={prev} aria-label="Previous">&#10094;</button>
      <button class="next" on:click={next} aria-label="Next">&#10095;</button>

      <div class="indicators">
        {#each images as _, i}
          <button
            type="button"
            class:active={i === current}
            on:click={() => (current = i)}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .slideshow {
    position: relative;
    overflow: hidden;
    display: block;
  }

  .slide {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* interactive controls */
  .prev,
  .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    z-index: 1;
  }

  .prev {
    left: 0.5rem;
  }

  .next {
    right: 0.5rem;
  }

  .indicators {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
  }

  .indicators button {
    width: 0.75rem;
    height: 0.75rem;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background 0.2s;
    padding: 0;
  }

  .indicators button.active {
    background: white;
  }
</style>
