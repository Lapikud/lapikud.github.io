<!--
Full-width colored section with configurable background and padding.
Content is projected via the default slot.
-->

<script>
  export let background = "var(--orange)";
  export let paddingX = "var(--site-padding)";
  export let paddingY = "var(--space-4)";
  export let className = "";
</script>

<div
  class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-center {className}"
  style="background: {background}; padding: {paddingY} {paddingX};"
>
  <slot />
</div>