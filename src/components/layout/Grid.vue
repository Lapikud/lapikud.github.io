<script setup>
  import { computed } from 'vue';
  defineOptions({ inheritAttrs: false });
  const props = defineProps({
    min: { type: String, default: '220px' },
    columns: { type: [String, Number], default: null },
    tabletColumns: { type: [String, Number], default: null },
    largeColumns: { type: [String, Number], default: null },
    mobileColumns: { type: [String, Number], default: null },
    gap: { type: String, default: 'gap-3' },
  });
  const hasTabletColumns = computed(() => props.tabletColumns !== null);
  const tabletCols = computed(() => props.tabletColumns ? `repeat(${props.tabletColumns}, 1fr)` : '1fr');
  const desktopColumns = computed(() => props.columns ? `repeat(${props.columns}, 1fr)` : '1fr');
  const largeDesktopColumns = computed(() => props.largeColumns ? `repeat(${props.largeColumns}, 1fr)` : desktopColumns.value);
  const mobileCols = computed(() => props.mobileColumns ? `repeat(${props.mobileColumns}, 1fr)` : '1fr');
</script>

<template>
<div
  :class="['grid', gap, $attrs.class]"
  :data-has-tablet="hasTabletColumns ? 'true' : 'false'"
  :style="{
    '--min': min,
    '--tablet-columns': tabletCols,
    '--desktop-columns': desktopColumns,
    '--large-desktop-columns': largeDesktopColumns,
    '--mobile-columns': mobileCols,
    gridTemplateColumns: 'var(--mobile-columns)',
  }"
  v-bind="$attrs"
>
  <slot />
</div>
</template>

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
