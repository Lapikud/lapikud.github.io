<script>
  let {
    min = "220px", // min column width (used when columns not set)
    columns = null, // fixed number of columns for desktop
    largeColumns = null, // fixed number of columns for large desktop
    mobileColumns = null, // fixed number of columns for mobile
    gap = "gap-3",
    class: className = "",
    children,
  } = $props();

  const desktopColumns = $derived(columns ? `repeat(${columns}, 1fr)` : "1fr");
  const largeDesktopColumns = $derived(
    largeColumns ? `repeat(${largeColumns}, 1fr)` : desktopColumns
  );
  const mobileCols = $derived(mobileColumns ? `repeat(${mobileColumns}, 1fr)` : "1fr");
</script>

<div
  class="grid {className} {gap}"
  style="
    --min: {min}; 
    --desktop-columns: {desktopColumns};
    --large-desktop-columns: {largeDesktopColumns};
    --mobile-columns: {mobileCols};
    grid-template-columns: var(--mobile-columns);
  "
>
  {@render children?.()}
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

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: var(--large-desktop-columns) !important;
    }
  }
</style>
