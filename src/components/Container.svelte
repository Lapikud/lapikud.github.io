<script>
  export let fluid = false; // when true, removes max-width
  export let className = '';
  export let as = 'div';
</script>

<svelte:component this={as} class={`container ${fluid ? 'container--fluid' : ''} ${className}`}>
  <slot />
</svelte:component>
