<script>
  let {
    min = "220px", // min column width (used when columns not set)
    columns = null, // fixed number of columns for desktop
    tabletColumns = null, // fixed number of columns for tablet / mid screens
    largeColumns = null, // fixed number of columns for large desktop
    mobileColumns = null, // fixed number of columns for mobile
    gap = "gap-3",
    class: className = "",
    children,
  } = $props();

  const hasTabletColumns = $derived(tabletColumns !== null);
  const tabletCols = $derived(
    tabletColumns ? `repeat(${tabletColumns}, 1fr)` : "1fr"
  );
  const desktopColumns = $derived(columns ? `repeat(${columns}, 1fr)` : "1fr");
  const largeDesktopColumns = $derived(
    largeColumns ? `repeat(${largeColumns}, 1fr)` : desktopColumns
  );
  const mobileCols = $derived(mobileColumns ? `repeat(${mobileColumns}, 1fr)` : "1fr");
</script>

<div
  class="grid {className} {gap}"
  data-has-tablet={hasTabletColumns ? "true" : "false"}
  style="
    --min: {min}; 
    --tablet-columns: {tabletCols};
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

  /* Legacy mode (no tabletColumns): desktop starts at 768px */
  @media (min-width: 768px) {
    .grid[data-has-tablet="false"] {
      grid-template-columns: var(--desktop-columns) !important;
    }

    /* fallback for when columns are not set, use minmax */
    .grid[data-has-tablet="false"]:not([style*="--desktop-columns: repeat"]) {
      grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr)) !important;
    }

    /* Tablet mode (when tabletColumns is provided) */
    .grid[data-has-tablet="true"] {
      grid-template-columns: var(--tablet-columns) !important;
    }
  }

  /* Legacy large desktop */
  @media (min-width: 1024px) {
    .grid[data-has-tablet="false"] {
      grid-template-columns: var(--large-desktop-columns) !important;
    }
  }

  /* Tablet mode desktop breakpoint */
  @media (min-width: 1200px) {
    .grid[data-has-tablet="true"] {
      grid-template-columns: var(--desktop-columns) !important;
    }

    .grid[data-has-tablet="true"]:not([style*="--desktop-columns: repeat"]) {
      grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr)) !important;
    }
  }

  /* Tablet mode large desktop breakpoint */
  @media (min-width: 1536px) {
    .grid[data-has-tablet="true"] {
      grid-template-columns: var(--large-desktop-columns) !important;
    }
  }
</style>
