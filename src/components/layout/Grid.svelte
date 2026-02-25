<!--
A responsive grid wrapper using CSS Grid. It exposes `min`, `columns`,
and `gap` props to control the responsive column minimum width, fixed
column count, and spacing. Content is projected into the default slot.
-->

<script>
  export let min = "220px"; // minimum column width (used when columns is not set)
  export let columns = null; // fixed number of columns (e.g., "2", "3", "4")
  export let gap = "var(--space-3)";
  export let className = "";
  
  $: gridTemplateColumns = columns 
    ? `repeat(${columns}, 1fr)` 
    : '1fr';
</script>

<div
  class="grid {className}"
  style="--min: {min}; --gap: {gap}; --columns: {gridTemplateColumns}; grid-template-columns: var(--columns); gap: var(--gap);"
>
  <slot />
</div>

<style>
  @media (min-width: 768px) {
    .grid {
      grid-template-columns: var(--columns) !important;
    }
    
    .grid:not([style*="--columns: repeat"]) {
      grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr)) !important;
    }
  }
</style>
