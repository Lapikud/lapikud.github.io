<script setup>
import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue';

const props = defineProps({ routes: { type: Object, required: true } });
const currentPath = shallowRef(window.location.pathname);
const CurrentComponent = shallowRef(null);

async function resolveCurrentComponent(path) {
  const routeEntry = props.routes[path] || props.routes['/'];
  if (typeof routeEntry !== 'function') {
    CurrentComponent.value = routeEntry || null;
    return;
  }

  try {
    const module = await routeEntry();
    CurrentComponent.value = module?.default || null;
  } catch {
    CurrentComponent.value = null;
  }
}

function navigate(path) {
  window.history.pushState({}, '', path);
  window.scrollTo(0, 0);
  currentPath.value = path;
}

const handlePopState = () => {
  currentPath.value = window.location.pathname;
};

const handleClick = (event) => {
  if (event.target.tagName === 'A' && event.target.getAttribute('href')?.startsWith('/')) {
    event.preventDefault();
    navigate(event.target.getAttribute('href'));
  }
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
