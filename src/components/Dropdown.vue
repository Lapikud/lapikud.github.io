<script setup>
  import { onBeforeUnmount, ref, watch } from 'vue';
  import IconChevronDown from '~icons/keyline-icons/chevron-down-duotone';
  import IconExternalLink from '~icons/keyline-icons/square-arrow-out-up-right-duotone';

  /*
    Standalone, self-themed dropdown menu.
    items: [{ label, href, icon?, img?, imgClass?, external?, active? }]
  */
  const props = defineProps({
    name: { type: String, default: '' },
    items: { type: Array, default: () => [] },
    active: { type: Boolean, default: false }, // highlight the trigger when one of its routes is current
    onSelect: { type: Function, default: () => {} }, // receives the clicked item
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

  function handleKeydown({ key }) {
    if (key === 'Escape') close();
  }

  function select(item) {
    close();
    props.onSelect(item);
  }

  const handleDocumentClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !panelElement.value) return;
    if (target.closest('.dropdown-panel')) close();
  };

  watch(isOpen, (open) => {
    document[open ? 'addEventListener' : 'removeEventListener']('click', handleDocumentClick);
  });
  onBeforeUnmount(() => document.removeEventListener('click', handleDocumentClick));
</script>

<template>
  <div class="dropdown" @focusout="handleFocusOut" @keydown="handleKeydown">
    <button
      type="button"
      class="dropdown-trigger"
      :class="{ 'dropdown-trigger-active': active, 'dropdown-trigger-open': isOpen }"
      @click="toggle"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      {{ name }}
      <IconChevronDown class="chevron size-[18px]" :class="{ 'chevron-open': isOpen }" aria-hidden="true" />
    </button>

    <div
      class="dropdown-panel"
      :class="{ 'dropdown-panel-open': isOpen }"
      ref="panelElement"
    >
      <button
        v-for="item in items"
        :key="item.href"
        type="button"
        class="dropdown-item"
        :class="{ 'dropdown-item-active': item.active }"
        @click="select(item)"
      >
        <component :is="item.icon" v-if="item.icon" class="size-[18px]" aria-hidden="true" />
        <img v-else-if="item.img" :src="item.img" :class="item.imgClass" alt="" aria-hidden="true" />
        <span class="dropdown-item-label">{{ item.label }}</span>
        <IconExternalLink v-if="item.external" class="size-3.5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Trigger: matches the navbar link style (white/75, orange when active) */
  .dropdown-trigger {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    color: rgb(255 255 255 / 0.75);
    font: inherit;
    cursor: pointer;
    background: none;
    border: 0;
    transition: color 200ms ease, background-color 200ms ease;
  }

  .dropdown-trigger:hover {
    color: #fff;
    background: rgb(255 255 255 / 0.05);
  }

  .dropdown-trigger:focus-visible {
    outline: 2px solid var(--color-orange-500);
    outline-offset: 2px;
  }

  .dropdown-trigger-active {
    color: var(--color-orange-500);
  }

  /* Pill underline, same indicator the navbar links use */
  .dropdown-trigger::after {
    content: '';
    position: absolute;
    left: 0.75rem;
    right: 0.75rem;
    bottom: 2px;
    height: 3px;
    border-radius: 9999px;
    background: var(--color-orange-500);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 200ms ease;
  }

  .dropdown-trigger:hover::after,
  .dropdown-trigger-active::after {
    transform: scaleX(1);
  }

  .chevron {
    transition: transform 200ms ease;
  }

  .chevron-open {
    transform: rotate(180deg);
  }

  /* Floating panel: warm white, rounded, soft border and shadow */
  .dropdown-panel {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
    min-width: 14rem;
    display: flex;
    flex-direction: column;
    padding: 0.375rem;
    background: var(--color-gray-100);
    border: 2px solid rgb(0 0 0 / 0.08);
    border-radius: var(--radius-xl);
    box-shadow: 0 12px 32px rgb(0 0 0 / 0.16);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-6px) scale(0.98);
    transform-origin: top left;
    pointer-events: none;
    transition: opacity 150ms ease, transform 150ms ease, visibility 150ms;
  }

  .dropdown-panel-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  /* Menu items: rounded rows with orange hover/active tints */
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-lg);
    color: var(--color-gray-900);
    font: inherit;
    text-align: left;
    cursor: pointer;
    background: none;
    border: 0;
    transition: background-color 150ms ease, color 150ms ease;
  }

  .dropdown-item:hover {
    background: rgb(240 148 29 / 0.1);
    color: var(--color-orange-600);
  }

  .dropdown-item:focus-visible {
    outline: 2px solid var(--color-orange-500);
    outline-offset: -2px;
  }

  .dropdown-item-active,
  .dropdown-item-active:hover {
    background: rgb(240 148 29 / 0.15);
    color: var(--color-orange-600);
  }

  .dropdown-item-label {
    flex: 1;
  }
</style>
