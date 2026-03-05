<!--
A simple stack/column layout that stacks children vertically.
-->

<script>
  export let gap = "gap-3";
  export let align = "stretch";
  export let className = "";
</script>

<div class="flex flex-col {className} {gap}" style="align-items: {align};">
  <slot />
</div>
