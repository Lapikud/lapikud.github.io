<!--
A responsive grid wrapper using CSS Grid. It exposes `min` and
`gap` props to control the responsive column minimum width and
spacing. Content is projected into the default slot.
-->

<script>
  export let min = "220px"; // minimum column width
  export let gap = "var(--space-3)";
  export let className = "";
</script>

<div
  class="grid {className}"
  style="--min: {min}; --gap: {gap}; grid-template-columns: 1fr; gap: var(--gap);"
>
  <slot />
</div>

<style>
  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr)) !important;
    }
  }
</style>
