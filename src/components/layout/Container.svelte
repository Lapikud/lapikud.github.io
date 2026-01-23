<!--
A responsive container that centers content and optionally
removes the max-width when `fluid` is true. Use `className` to
add additional CSS classes to the root element. Content is
projected via the default slot.
-->

<script>
  export let maxWidth = false; // true removes max-width
  export let center = true; // false prevents centering and removes horizontal padding
  export let className = "";
</script>

<div class="w-full {center ? 'px-4 md:px-6 lg:px-8' : ''} {maxWidth ? '' : 'max-w-[1200px]'} {center ? 'mx-auto' : ''} {className}">
  <slot />
</div>
