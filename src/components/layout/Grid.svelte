<script>
  export let min = "220px";        // min column width (used when columns not set)
  export let columns = null;       // fixed number of columns for desktop
  export let mobileColumns = null; // fixed number of columns for mobile
  export let gap = "gap-3";
  export let className = "";

  $: desktopColumns = columns ? `repeat(${columns}, 1fr)` : '1fr';
  $: mobileCols = mobileColumns ? `repeat(${mobileColumns}, 1fr)` : '1fr';
</script>

<div
  class="grid {className} {gap}"
  style="
    --min: {min}; 
    --desktop-columns: {desktopColumns};
    --mobile-columns: {mobileCols};
    grid-template-columns: var(--mobile-columns);
  "
>
  <slot />
</div>

<style>
  /* Mobile first: use mobileColumns by default */
  .grid {
    grid-template-columns: var(--mobile-columns);
  }

  /* Desktop / tablet screens */
  @media (min-width: 768px) {
    .grid {
      grid-template-columns: var(--desktop-columns) !important;
    }

    /* fallback for when columns are not set, use minmax */
    .grid:not([style*="--desktop-columns: repeat"]) {
      grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr)) !important;
    }
  }
</style>