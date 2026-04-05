<script>
  let {
    onClick = () => {},
    class: className = "",
    children,
  } = $props();
</script>

<button
  onclick={onClick}
  data-animation
  class="btn flex p-2.5 {className}"
>
  {@render children?.()}
</button>

<style>
  .btn {
    border-width: 2px;
    border-style: solid;
    border-radius: 0.2rem;
    cursor: pointer;
    align-items: center;
    white-space: nowrap;
    transition: color 200ms ease, background-color 200ms ease,
      border-color 200ms ease, transform 120ms ease, box-shadow 200ms ease;
  }

  .btn:active {
    transform: translateY(1px);
  }
</style>
