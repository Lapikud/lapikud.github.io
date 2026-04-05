<script>
  let {
    dir = "row", // 'row' | 'col' (default: 'row')
    gap = "gap-4",
    class: className = "",
    children,
  } = $props();
</script>

<div
  class={"flex " +
    (dir === "row" ? "flex-row" : "flex-col") +
    " items-center justify-center " +
    gap +
    " " +
    className}
>
  {@render children?.()}
</div>
