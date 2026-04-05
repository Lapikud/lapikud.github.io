<!--
A simple stack/column layout that stacks children vertically.
-->

<script>
  let  {
    gap = "gap-3",
    align = "stretch",
    class: className = "",
    children
  } = $props();
</script>

<div class="flex flex-col {className} {gap}" style="align-items: {align};">
  {@render children?.()}
</div>
