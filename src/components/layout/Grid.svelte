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
  class={`grid ${className}`}
  style={`grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr)); gap: ${gap};`}
>
  <slot />
</div>
