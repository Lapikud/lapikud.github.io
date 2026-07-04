<script setup>
  defineOptions({ inheritAttrs: false });
  defineProps({
    bg: { type: String, default: '' },
    background: { type: String, default: '' },
    padding: { type: String, default: 'normal' },
    fullWidth: { type: Boolean, default: false },
    id: { type: String, default: '' },
    contentClass: { type: String, default: '' },
  });

  const paddingClasses = {
    none: "py-0",
    tight: "py-2 md:py-3",
    small: "py-4 md:py-8",
    normal: "py-12 max-md:py-8",
    large: "py-[clamp(3rem,8vw,6rem)] max-md:py-12",
  };
</script>

<template>
<section
  :id="id || undefined"
  :class="['relative w-full', bg, $attrs.class]"
  :style="background ? { background } : undefined"
  v-bind="$attrs"
>
  <div :class="['w-full mx-auto px-(--page-padding-inline)', !fullWidth && 'max-w-(--page-max-width)', paddingClasses[padding], contentClass]">
    <slot />
  </div>
</section>
</template>
