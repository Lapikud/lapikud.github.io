<script setup>
defineOptions({ inheritAttrs: false });
defineProps({ onClick: { type: Function, default: () => {} } });
</script>

<template>
<button
  @click="onClick"
  v-bind="$attrs"
  data-animation
  :class="['btn flex p-2.5', $attrs.class]"
>
  <slot />
</button>
</template>

<style>
  .btn {
    border-width: 2px;
    border-style: solid;
    border-radius: 0.2rem;
    cursor: pointer;
    align-items: center;
    white-space: nowrap;
    transition: color 200ms ease, background-color 200ms ease,
      border-color 200ms ease, transform 120ms ease, box-shadow 200ms ease;
  }

  .btn:active {
    transform: translateY(1px);
  }
</style>
