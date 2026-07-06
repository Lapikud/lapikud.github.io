<script setup>
  import { computed, onBeforeUnmount, ref, watch } from 'vue';
  import Image from './Image.vue';

  /**
   * Images can be either strings or objects with optimization options:
   *
   * String format (simple):
   *   images={["image1.jpg", "image2.jpg"]}
   *
   * Object format (multiple image options):
   *   images={[
   *     { src: "image1.jpg", webpSrc: "image1.webp", alt: "Description" },
   *     { src: "image2.jpg", webpSrc: "image2.webp", alt: "Description" }
   *   ]}
   *
   */

  const props = defineProps({
    images: { type: Array, default: () => [] },
    width: { type: String, default: '100%' },
    height: { type: String, default: '100%' },
    interactive: { type: Boolean, default: false },
    autoplay: { type: Boolean, default: false },
    interval: { type: Number, default: 3000 },
    loop: { type: Boolean, default: true },
    startIndex: { type: Number, default: 0 },
  });
  const current = ref(props.startIndex);
  let timer;

  const currentImage = computed(() => props.images[current.value]);
  const isObjectImage = computed(() => typeof currentImage.value === 'object' && currentImage.value !== null);
  const imageSrc = computed(() => typeof currentImage.value === 'string' ? currentImage.value : currentImage.value?.src || '');
  const imageAlt = computed(() => typeof currentImage.value === 'string' ? '' : currentImage.value?.alt || '');
  const imageWebpSrc = computed(() => isObjectImage.value ? currentImage.value?.webpSrc || '' : '');
  const imageSrcSet = computed(() => isObjectImage.value ? currentImage.value?.srcSet || '' : '');
  const imageWebpSrcSet = computed(() => isObjectImage.value ? currentImage.value?.webpSrcSet || '' : '');
  const imageClass = computed(() => isObjectImage.value ? currentImage.value?.class || '' : '');

  const next = () => {
    if (current.value < props.images.length - 1) {
      current.value += 1;
    } else if (props.loop) {
      current.value = 0;
    }
  };

  const prev = () => {
    if (current.value > 0) {
      current.value -= 1;
    } else if (props.loop) {
      current.value = props.images.length - 1;
    }
  };

  // react to autoplay or interval changes
  watch(() => [props.autoplay, props.interval, props.images.length], () => {
    clearInterval(timer);
    if (props.autoplay && props.images.length > 1) {
      timer = setInterval(next, props.interval);
    }
  }, { immediate: true });

  onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
<div
  class="slideshow"
  :style="{ width, height }"
  aria-live="polite"
>
  <template v-if="images.length">
    <Image
      :src="imageSrc"
      :alt="imageAlt"
      :webpSrc="imageWebpSrc"
      :srcSet="imageSrcSet"
      :webpSrcSet="imageWebpSrcSet"
      objectFit="cover"
      :class="`w-full h-full block ${imageClass}`"
    />

    <template v-if="interactive && images.length > 1">
      <button class="prev" @click="prev" aria-label="Previous">&#10094;</button>
      <button class="next" @click="next" aria-label="Next">&#10095;</button>

      <div class="indicators">
        <template v-for="(_, i) in images">
          <button
            type="button"
            :class="{ 'active': i === current }"
            @click="current = i"
            :aria-label="`Go to slide ${i + 1}`"
          ></button>
        </template>
      </div>
    </template>
  </template>
</div>
</template>

<style>
  .slideshow {
    position: relative;
    overflow: hidden;
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
