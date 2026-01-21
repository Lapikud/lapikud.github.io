<script>
  export let onClick = () => {};
  export let border = false;
  export let textAlign = "left";
  export let whiteSpace = "nowrap";
</script>

<button 
  onclick={onClick} 
  class="btn" 
  class:borderless={!border} 
  style={`text-align: ${textAlign}; white-space: ${whiteSpace};`}
  {...$$restProps}
>
  <slot />
</button>

<style>
  .btn {
    background: var(--white);
    color: var(--black);
    border-radius: 8px;
    border: 1.5px solid transparent;
    padding: 0.6em 1.2em;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .btn:not(.borderless) {
    border-color: var(--orange);
  }

  .btn:hover {
    background: var(--orange);
  }
</style>
