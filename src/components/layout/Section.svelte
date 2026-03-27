<script>
  let { 
    bg = "", 
    padding = "normal", 
    fullWidth = true, 
    id = "", 
    className = "",
    children
  } = $props();

  const paddingClasses = {
    none: "py-0",
    tight: "py-2 md:py-3",
    small: "py-4 md:py-8",
    normal: "py-12 max-md:py-8",
    large: "py-[clamp(3rem,8vw,6rem)] max-md:py-12",
  };
</script>

<section
  {id}
  class="w-full {paddingClasses[padding]} {bg} {className}"
>
  <div class="{fullWidth ? '' : 'max-w-[1200px]'} mx-auto">
    {@render children?.()}
  </div>
</section>