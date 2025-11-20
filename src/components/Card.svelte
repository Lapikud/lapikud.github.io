<script>
  export let className = '';
  export let as = 'div';
</script>

<svelte:component this={as} class={`card ${className}`}>
  <slot />
</svelte:component>
