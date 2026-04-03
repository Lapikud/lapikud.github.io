<script>
  let { 
    bg = "", 
    background = "",
    padding = "normal", 
    fullWidth = false, 
    id = "", 
    className = "",
    contentClassName = "",
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
  class="relative w-full {bg} {className}"
  style={background ? `background: ${background};` : undefined}
>
  <div class="w-full {fullWidth ? '' : 'max-w-(--page-max-width)'} mx-auto px-(--page-padding-inline) {paddingClasses[padding]} {contentClassName}">
    {@render children?.()}
  </div>
</section>