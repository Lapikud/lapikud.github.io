<script>
  export let onClick = () => {}
</script>

<button on:click={onClick} class="btn">
  <slot />
</button>

<style>
  .btn {
    background: var(--button-bg);
    color: var(--button-text);
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-weight: 500;
    cursor: pointer;
  }
  .btn:hover { border-color: var(--primary); }
</style>