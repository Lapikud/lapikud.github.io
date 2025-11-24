<!--
Multi-purpose image/SVG component with optional link wrapper,
hover effects, size variants, and object-fit options.
-->

<script>
  export let src = "";
  export let alt = "";
  export let href = null; // optional link URL
  export let target = "_blank";
  export let rel = "noopener noreferrer";
  export let objectFit = "contain"; // 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  export let hover = false;
  export let className = "";
  
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
  <a
    {href}
    {target}
    {rel}
    class="inline-block leading-none"
  >
    <img
      {src}
      {alt}
      class="block h-auto max-w-full {objectFitClass} {hoverClasses} {className}"
    />
  </a>
{:else}
  <img
    {src}
    {alt}
    class="block h-auto max-w-full {objectFitClass} {hoverClasses} {className}"
  />
{/if}