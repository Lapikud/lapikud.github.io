import { getTranslatedRoute, getLanguageFromRoute } from '../../routes';
import { switchLang } from '../i18n.js';

/**
 * Navigate to a path (internal or external)
 * @param {string} path - The path or URL to navigate to
 * @param {Object} options - Navigation options
 * @param {boolean} options.external - Whether this is an external link
 */
export function navigate(path, options = {}) {
    const { external = false } = options;

    if (external) {
        window.open(path, '_blank', 'noopener,noreferrer');
    } else if (path.startsWith('#')) {
        const hash = path;
        const target = document.getElementById(hash.slice(1));
        if (target) {
            window.history.pushState({}, '', `${window.location.pathname}${window.location.search}${hash}`);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
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
}

function commitNavigation(path) {
    const hash = new URL(path, window.location.origin).hash;
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));

    const lang = getLanguageFromRoute(new URL(path, window.location.origin).pathname);
    if (lang) switchLang(lang);

    if (hash) {
        const scrollToHash = () => {
            const target = document.getElementById(hash.slice(1));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
        requestAnimationFrame(scrollToHash);
    } else {
        window.scrollTo(0, 0);
    }
}

/**
 * Switch language and navigate to translated route
 * @param {string} targetLang - Target language ('est' or 'en')
 */
export function switchLanguageRoute(targetLang) {
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
export function goBack() {
    window.history.back();
}

/**
 * Reload the current page
 */
export function reload() {
    window.location.reload();
}

/**
 * Get the current pathname
 * @returns {string} Current path
 */
export function getPath() {
    return window.location.pathname;
}

/**
 * Get URL query parameters as an object
 * @returns {Object} Query parameters
 */
export function getQuery() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}
