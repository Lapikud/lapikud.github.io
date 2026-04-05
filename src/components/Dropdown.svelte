<script>
  import Button from "./Button.svelte";

  let {
    name = "",
    buttonClass = "",
    panelClass = "",
    children,
  } = $props();

  let isOpen = $state(false);

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
</script>

<div class="relative inline-block" onfocusout={handleFocusOut}>
  <Button onClick={toggle} class={`${buttonClass} gap-0`}>
    {name}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="w-4 h-4 ml-1 mr-0 mt-0.5 transition-transform inline-block"
      style:transform={isOpen ? "rotate(180deg)" : "none"}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  </Button>

  <div
    class="{panelClass} absolute mt-2 rounded-md shadow-lg overflow-visible flex flex-col"
    style:visibility={isOpen ? "visible" : "hidden"}
  >
    <div>
      {@render children?.()}
    </div>
  </div>
</div>
