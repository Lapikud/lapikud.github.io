<!--
A responsive container that centers content and optionally
removes the max-width when `fluid` is true. Use `className` to
add additional CSS classes to the root element. Content is
projected via the default slot.
-->

<script>
  export let maxWidth = false; // true removes max-width
  export let className = "";
</script>

<div class={`container ${maxWidth ? "container--fluid" : ""} ${className}`}>
  <slot />
</div>
