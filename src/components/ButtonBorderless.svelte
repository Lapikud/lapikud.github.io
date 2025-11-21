<script>
  export let onClick = () => {};
</script>

<button onclick={onClick} class="btn">
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
    justify-content: center;
    gap: 0.5em;
  }
  .btn:hover {
    background: var(--orange);
  }
</style>
