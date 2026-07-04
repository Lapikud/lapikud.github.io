<script setup>
  defineOptions({ inheritAttrs: false });
  defineProps({
    maxWidth: { type: Boolean, default: false },
    center: { type: Boolean, default: true },
  });
</script>

<template>
<!--
A responsive container that centers content and optionally
removes the max-width when `fluid` is true. Use the `class`
add additional CSS classes to the root element. Content is
projected via the default slot.
-->



<div :class="['w-full', center && 'px-(--page-padding-inline) mx-auto', !maxWidth && 'max-w-(--page-max-width)', $attrs.class]" v-bind="$attrs">
  <slot />
</div>
</template>
