<!--
A simple stack/column layout that stacks children vertically.
-->

<script>
  export let gap = "var(--space-3)";
  export let align = "stretch";
  export let className = "";
</script>

<div class="flex flex-col {className}" style="gap: {gap}; align-items: {align};">
  <slot />
</div>
