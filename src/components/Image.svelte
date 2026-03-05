<!--
Multi-purpose image component with optional link wrapper,
hover effects, size variants, and object-fit options. Includes support for WebP format with fallback to standard formats.
-->

<script>
  export let webpSrc = ""; // Optional WebP source for browsers that support it
  export let src = "";     // Fallback (some devices don't support WebP) or primary source if webpSrc is not provided
  export let alt = "";
  export let href = null; // optional link URL
  export let target = "_blank";
  export let rel = "noopener noreferrer";
  export let objectFit = "contain"; // 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  export let hover = false;
  export let className = "";

  // optional srcset for responsive images (w descriptors means width-based, x descriptors means pixel density-based)
  // e.g. "image-400.jpg 400w, image-800.jpg 800w"
  export let srcSet = "";      // always set src if using this
  export let webpSrcSet = "";  // always set src if using this
  export let pictureClass = ""; // CSS/Tailwind classes applied to the <picture> element
  
  $: objectFitClass = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down"
  }[objectFit];

  $: hoverClasses = hover ? "transition-all duration-200 hover:scale-105 hover:opacity-90" : "";
</script>

{#if href}
  <a {href} {target} {rel} class="inline-block leading-none">
    <picture class={pictureClass}>
      {#if webpSrc || webpSrcSet}
        <source srcset={webpSrcSet || webpSrc} type="image/webp" />
      {/if}
      <img
        {src}
        srcset={srcSet || undefined}
        alt={alt}
        class="block h-auto max-w-full {objectFitClass} {hoverClasses} {className}"
      />
    </picture>
  </a>
{:else}
  <picture class={pictureClass}>
    {#if webpSrc || webpSrcSet}
      <source srcset={webpSrcSet || webpSrc} type="image/webp" />
    {/if}
    <img
      {src}
      srcset={srcSet || undefined}
      alt={alt}
      class="block h-auto max-w-full {objectFitClass} {hoverClasses} {className}"
    />
  </picture>
{/if}