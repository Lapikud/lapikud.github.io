<!--
A responsive container that centers content and optionally
removes the max-width when `fluid` is true. Use the `class`
add additional CSS classes to the root element. Content is
projected via the default slot.
-->

<script>
  let {
    maxWidth = false, // true removes max-width
    center = true, // false prevents centering and removes horizontal padding
    class: className = "",
    children,
  } = $props();
</script>

<div class="w-full {center ? 'px-(--page-padding-inline)' : ''} {maxWidth ? '' : 'max-w-(--page-max-width)'} {center ? 'mx-auto' : ''} {className}">
  {@render children?.()}
</div>
