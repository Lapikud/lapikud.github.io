<script setup>
  defineOptions({ inheritAttrs: false });
  defineProps({
    dir: { type: String, default: 'row' },
    gap: { type: String, default: 'gap-4' },
  });
</script>

<template>
<div
  :class="['flex items-center justify-center', dir === 'row' ? 'flex-row' : 'flex-col', gap, $attrs.class]"
  v-bind="$attrs"
>
  <slot />
</div>
</template>
