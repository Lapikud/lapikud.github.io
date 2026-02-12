<script>
  export let onClick = () => {};
  export let buttonHoverStyle = "";
  export let style = "";

  let isHovered = false;
</script>

<button
  on:click={onClick}
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  class={`btn border-[1.5px] px-5 py-2.5 font-medium cursor-pointer flex items-center gap-2 whitespace-nowrap ${$$restProps.class}`}
  style={isHovered && buttonHoverStyle ? buttonHoverStyle : style}
>
  <slot />
</button>

<style>
  .btn {
    transition: background-color 0.2s ease, color 0.2s ease;
  }
</style>
