<script>
  import Button from "./Button.svelte";

  export let name = "";
  export let border = false;
  export let borderRadius = "8px";

  let isOpen = false;

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

<div class="relative inline-block" on:focusout={handleFocusOut}>
  <Button borderRadius={borderRadius} onClick={toggle} border={border}>
    {name}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="w-5 ml-2 mt-1 transition-transform inline-block"
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
    class="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black/5 overflow-hidden flex flex-col"
    style="border-radius: {borderRadius}"
    style:visibility={isOpen ? "visible" : "hidden"}
  >
    <slot />
  </div>
</div>
