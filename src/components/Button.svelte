<script>
  export let onClick = () => {};
</script>

<button
  on:click={onClick}
  class="btn border-[1.5px] px-5 py-2.5 font-medium cursor-pointer flex items-center gap-2 whitespace-nowrap {$$props.class ?? ''}"
>
  <slot />
</button>
