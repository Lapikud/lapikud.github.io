export { navigate, goBack, reload, getPath, getQuery, switchLanguageRoute } from './router/router.js';
export { default as Router } from './router/Router.svelte';

export { currentLang, text, switchLang, createPageTextStore } from './i18n.js';
export { getLangText } from './langHelpers.js';