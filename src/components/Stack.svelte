<script>
  // Vertical stack helper. Accepts a gap and alignment so pages can tune spacing.
  export let gap = 'var(--space-3)';
  export let align = 'stretch';
  export let className = '';
  export let as = 'div';
</script>

<svelte:component this={as} class={`stack ${className}`} style={`gap: ${gap}; align-items: ${align};`}>
  <slot />
</svelte:component>
