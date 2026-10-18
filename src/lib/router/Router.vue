<script setup>
import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue';
import { useRouter } from './useRouter.js';
import { redirects } from '../../routes';

const props = defineProps({ routes: { type: Object, required: true } });
const router = useRouter();

// Follow legacy English route redirects and normalise the URL
function normalizePath(path) {
  return redirects[path] || path;
}

function applyRedirect(path) {
  const target = normalizePath(path);
  if (target !== path) {
    window.history.replaceState({}, '', target);
  }
  return target;
}

const currentPath = shallowRef(
  typeof window !== 'undefined' ? applyRedirect(window.location.pathname) : '/',
);
const CurrentComponent = shallowRef(null);
let routeRequest = 0;

// Sync with router composable's currentPath
watch(() => router.currentPath.value, (path) => {
  currentPath.value = normalizePath(path);
}, { immediate: true });

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
  url.pathname = normalizePath(url.pathname);
  window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
  window.scrollTo(0, 0);
  currentPath.value = url.pathname;
  router.currentPath.value = url.pathname;
  window.dispatchEvent(new PopStateEvent('popstate'));
}

const handlePopState = () => {
  const newPath = applyRedirect(window.location.pathname);
  currentPath.value = newPath;
  router.currentPath.value = newPath;
};

const handleClick = (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!anchor || anchor.target || anchor.hasAttribute('download')) return;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return;
  if (url.pathname !== window.location.pathname && !props.routes[normalizePath(url.pathname)]) return;
  if (url.pathname === window.location.pathname && url.hash) return;

  event.preventDefault();
  navigate(url);
};

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
});
onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState);
});

watch(currentPath, resolveCurrentComponent, { immediate: true });
</script>

<template>
<component :is="CurrentComponent" v-if="CurrentComponent" />
</template>
