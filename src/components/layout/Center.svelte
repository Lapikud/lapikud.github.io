<script>
  export let dir = "row"; // 'row' | 'col' (default: 'row')
  export let gap = "gap-4";
  export let className = "";
</script>

<div
  class={"flex " +
    (dir === "row" ? "flex-row" : "flex-col") +
    " items-center justify-center " +
    gap +
    " " +
    className}
>
  <slot />
</div>
