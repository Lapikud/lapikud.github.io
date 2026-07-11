import { computed, onScopeDispose, ref, watch } from 'vue';
import { getLanguageFromRoute, getTranslatedRoute } from '../../routes';
import { switchLang } from '../i18n.js';

/**
 * Vue composable for router functionality
 * Provides reactive navigation and route management
 */
export function useRouter() {
  const currentPath = ref(typeof window !== 'undefined' ? window.location.pathname : '/');
  const currentRoute = computed(() => currentPath.value);

  /**
   * Navigate to a path (internal or external)
   * @param {string} path - The path or URL to navigate to
   * @param {Object} options - Navigation options
   * @param {boolean} options.external - Whether this is an external link
   */
  function navigate(path, options = {}) {
    const { external = false } = options;

    if (external) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }

    const url = new URL(path, window.location.origin);
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href);
      return;
    }

    const selectedLang =
      getLanguageFromRoute(window.location.pathname) ||
      localStorage.getItem('language') ||
      'est';
    url.pathname = getTranslatedRoute(url.pathname, selectedLang);
    commitNavigation(`${url.pathname}${url.search}${url.hash}`);
  }

  /**
   * Commit navigation by updating history and path
   */
  function commitNavigation(path) {
    window.history.pushState({}, '', path);
    window.scrollTo(0, 0);
    currentPath.value = path;
    window.dispatchEvent(new PopStateEvent('popstate'));

    const lang = getLanguageFromRoute(new URL(path, window.location.origin).pathname);
    if (lang) switchLang(lang);
  }

  /**
   * Switch language and navigate to translated route
   * @param {string} targetLang - Target language ('est' or 'en')
   */
  function switchLanguageRoute(targetLang) {
    const currentPath = window.location.pathname;
    const translatedPath = getTranslatedRoute(currentPath, targetLang);
    
    switchLang(targetLang);

    if (translatedPath !== currentPath) {
      commitNavigation(translatedPath);
    }
  }

  /**
   * Go back in browser history
   */
  function goBack() {
    window.history.back();
  }

  /**
   * Reload the current page
   */
  function reload() {
    window.location.reload();
  }

  /**
   * Get the current pathname
   * @returns {string} Current path
   */
  function getPath() {
    return currentPath.value;
  }

  /**
   * Get URL query parameters as an object
   * @returns {Object} Query parameters
   */
  function getQuery() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  }

  // Set up popstate listener for browser navigation
  if (typeof window !== 'undefined') {
    const handlePopState = () => {
      currentPath.value = window.location.pathname;
      const lang = getLanguageFromRoute(window.location.pathname);
      if (lang) switchLang(lang);
    };

    window.addEventListener('popstate', handlePopState);
    
    onScopeDispose(() => {
      window.removeEventListener('popstate', handlePopState);
    });
  }

  return {
    currentPath,
    currentRoute,
    navigate,
    switchLanguageRoute,
    goBack,
    reload,
    getPath,
    getQuery
  };
}