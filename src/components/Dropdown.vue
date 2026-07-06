<script setup>
  import { onBeforeUnmount, ref, watch } from 'vue';
  import Button from "./Button.vue";

  defineProps({
    name: { type: String, default: '' },
    buttonClass: { type: String, default: '' },
    panelClass: { type: String, default: '' },
  });
  const isOpen = ref(false);
  const panelElement = ref(null);
  const toggle = () => (isOpen.value = !isOpen.value);
  const close = () => (isOpen.value = false);

  function handleFocusOut({ relatedTarget, currentTarget }) {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return;
    close();
  }


  const handleDocumentClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !panelElement.value) return;

      if (
        panelElement.value.contains(target) &&
        target.closest("button, a, [role='menuitem']")
      ) {
        close();
      }
  };
  watch(isOpen, (open) => {
    document[open ? 'addEventListener' : 'removeEventListener']('click', handleDocumentClick);
  });
  onBeforeUnmount(() => document.removeEventListener('click', handleDocumentClick));
</script>

<template>
<div class="relative inline-block" @focusout="handleFocusOut">
  <Button :onClick="toggle" :class="`${buttonClass} gap-0`">
    {{ name }}
    <span
      class="ml-1 mr-0 mt-0.5 transition-transform inline-block text-[0.9em] opacity-60"
      :style="{ transform: isOpen ? 'rotate(180deg)' : 'none' }"
      aria-hidden="true"
    >
      ↓
    </span>
  </Button>

  <div
    :class="[panelClass, 'absolute mt-2 rounded-md shadow-lg overflow-visible flex flex-col']"
    :style="{ visibility: isOpen ? 'visible' : 'hidden' }"
    ref="panelElement"
  >
    <div>
      <slot />
    </div>
  </div>
</div>
</template>
