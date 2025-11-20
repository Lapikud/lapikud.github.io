<script>
  export let min = '220px'; // minimum column width
  export let gap = 'var(--space-3)';
  export let className = '';
  export let as = 'div';
</script>

<svelte:component this={as} class={`grid ${className}`} style={`grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr)); gap: ${gap};`}>
  <slot />
</svelte:component>
