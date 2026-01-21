<script>
  export let background = "transparent"; // CSS color code or color variable name from app.css
  export let padding = "normal"; // 'none' | 'small' | 'normal' | 'large'
  export let fullWidth = false;
  export let id = "";
  export let className = "";

  const paddingClasses = {
    none: "py-0",
    small: "py-section-sm",
    normal: "py-section",
    large: "py-section-lg",
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
  class={`section ${paddingClasses[padding]} ${className}`}
  style={backgroundStyle ? `background: ${backgroundStyle};` : ""}
>
  <div class="section-inner" class:full-width={fullWidth}>
    <slot />
  </div>
</section>

<style>
  .section {
    width: 100%;
    position: relative;
  }

  .section-inner {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 0 var(--site-padding);
  }

  .section-inner.full-width {
    max-width: none;
  }

  .py-0 {
    padding-top: 0;
    padding-bottom: 0;
  }

  .py-section-sm {
    padding-top: var(--space-5);
    padding-bottom: var(--space-5);
  }

  .py-section {
    padding-top: var(--space-6);
    padding-bottom: var(--space-6);
  }

  .py-section-lg {
    padding-top: clamp(3rem, 8vw, 6rem);
    padding-bottom: clamp(3rem, 8vw, 6rem);
  }

  @media (max-width: 768px) {
    .py-section {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
    }

    .py-section-lg {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
  }
</style>
