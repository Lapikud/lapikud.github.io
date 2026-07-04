<script setup>
  import { computed } from 'vue';
  defineOptions({ inheritAttrs: false });
  const props = defineProps({
    webpSrc: { type: String, default: '' },
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    href: { type: String, default: null },
    target: { type: String, default: '_blank' },
    rel: { type: String, default: 'noopener noreferrer' },
    objectFit: { type: String, default: 'contain' },
    hover: { type: Boolean, default: false },
    srcSet: { type: String, default: '' },
    webpSrcSet: { type: String, default: '' },
    pictureClass: { type: String, default: '' },
  });
  const objectFitClass = computed(() => ({
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down"
  }[props.objectFit]));

  const hoverClasses = computed(() => props.hover ? "transition-all duration-200 hover:scale-105 hover:opacity-90" : "");
</script>

<template>
<!--
Multi-purpose image component with optional link wrapper,
hover effects, size variants, and object-fit options. Includes support for WebP format with fallback to standard formats.
-->



<template v-if="href">
  <a :href="href" :target="target" :rel="rel" class="inline-block leading-none">
    <picture :class="pictureClass">
      <template v-if="webpSrc || webpSrcSet">
        <source :srcset="webpSrcSet || webpSrc" type="image/webp" />
      </template>
      <img
        :src="src"
        :srcset="srcSet || undefined"
        :alt="alt"
        :class="['block h-auto max-w-full', objectFitClass, hoverClasses, $attrs.class]"
        v-bind="$attrs"
      />
    </picture>
  </a>
</template><template v-else>
  <picture :class="pictureClass">
    <template v-if="webpSrc || webpSrcSet">
      <source :srcset="webpSrcSet || webpSrc" type="image/webp" />
    </template>
    <img
      :src="src"
      :srcset="srcSet || undefined"
      :alt="alt"
      :class="['block h-auto max-w-full', objectFitClass, hoverClasses, $attrs.class]"
      v-bind="$attrs"
    />
  </picture>
</template>
</template>
