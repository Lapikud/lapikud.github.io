<script>
  import Button from "./Button.svelte";

  let {
    name = "",
    buttonClass = "",
    panelClass = "",
    children,
  } = $props();

  let isOpen = $state(false);
  let panelElement = $state(null);

  const toggle = () => (isOpen = !isOpen);
  const close = () => (isOpen = false);

  function handleFocusOut({ relatedTarget, currentTarget }) {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return;
    close();
  }


  $effect(() => {
    if (!isOpen) return;

    const handleDocumentClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !panelElement) return;

      if (
        panelElement.contains(target) &&
        target.closest("button, a, [role='menuitem']")
      ) {
        close();
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  });
</script>

<div class="relative inline-block" onfocusout={handleFocusOut}>
  <Button onClick={toggle} class={`${buttonClass} gap-0`}>
    {name}
    <span
      class="ml-1 mr-0 mt-0.5 transition-transform inline-block text-[0.9em] opacity-60"
      style:transform={isOpen ? "rotate(180deg)" : "none"}
      aria-hidden="true"
    >
      ↓
    </span>
  </Button>

  <div
    class="{panelClass} absolute mt-2 rounded-md shadow-lg overflow-visible flex flex-col"
    style:visibility={isOpen ? "visible" : "hidden"}
    bind:this={panelElement}
  >
    <div>
      {@render children?.()}
    </div>
  </div>
</div>
