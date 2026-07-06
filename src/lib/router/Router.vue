<script setup>
import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue';

const props = defineProps({ routes: { type: Object, required: true } });
const currentPath = shallowRef(window.location.pathname);
const CurrentComponent = shallowRef(null);
let routeRequest = 0;

async function resolveCurrentComponent(path) {
  const request = ++routeRequest;
  const routeEntry = props.routes[path] || props.routes['/'];
  if (typeof routeEntry !== 'function') {
    if (request === routeRequest) CurrentComponent.value = routeEntry || null;
    return;
  }

  try {
    const module = await routeEntry();
    if (request === routeRequest) CurrentComponent.value = module?.default || null;
  } catch {
    if (request === routeRequest) CurrentComponent.value = null;
  }
}

function navigate(url) {
  window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
  window.scrollTo(0, 0);
  currentPath.value = url.pathname;
  window.dispatchEvent(new PopStateEvent('popstate'));
}

const handlePopState = () => {
  currentPath.value = window.location.pathname;
};

const handleClick = (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!anchor || anchor.target || anchor.hasAttribute('download')) return;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin || !props.routes[url.pathname]) return;
  if (url.pathname === window.location.pathname && url.hash) return;

  event.preventDefault();
  navigate(url);
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
  window.addEventListener('click', handleClick);
});
onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState);
  window.removeEventListener('click', handleClick);
});
watch(currentPath, resolveCurrentComponent, { immediate: true });
</script>

<template>
<component :is="CurrentComponent" v-if="CurrentComponent" />
</template>
