<script>
  export let background = "transparent"; // CSS color code or color variable name from app.css
  export let padding = "normal"; // 'none' | 'small' | 'normal' | 'large'
  export let fullWidth = false;
  export let id = "";
  export let className = "";

  const paddingClasses = {
    none: "py-0",
    small: "py-8",
    normal: "py-12 max-md:py-8",
    large: "py-[clamp(3rem,8vw,6rem)] max-md:py-12",
  };

  // Convert background to appropriate CSS value
  $: backgroundStyle = (() => {
    if (!background || background === "transparent") return "";
    // If it starts with # or rgb/rgba or hsl, it's a direct color
    if (background.startsWith("#") || background.startsWith("rgb") || background.startsWith("hsl")) {
      return background;
    }
    // Otherwise treat as CSS variable name
    return `var(--${background})`;
  })();
</script>

<section
  {id}
  class="w-full relative {paddingClasses[padding]} {className}"
  style={backgroundStyle ? `background: ${backgroundStyle};` : ""}
>
  <div class="{fullWidth ? '' : 'max-w-[1200px]'} mx-auto px-(--site-padding)">
    <slot />
  </div>
</section>
