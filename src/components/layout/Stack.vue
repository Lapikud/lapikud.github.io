<script setup>
  defineOptions({ inheritAttrs: false });
  defineProps({
    gap: { type: String, default: 'gap-3' },
    align: { type: String, default: 'stretch' },
  });
</script>

<template>
<!--
A simple stack/column layout that stacks children vertically.
-->



<div :class="['flex flex-col', gap, $attrs.class]" :style="{ alignItems: align }" v-bind="$attrs">
  <slot />
</div>
</template>
