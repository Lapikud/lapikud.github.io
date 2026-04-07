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
    } else {
        const selectedLang =
            localStorage.getItem('language') ||
            getLanguageFromRoute(window.location.pathname) ||
            'est';

        const resolvedPath = getTranslatedRoute(path, selectedLang);

        window.history.pushState({}, "", resolvedPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
        
        // Update language based on new route
        const lang = getLanguageFromRoute(resolvedPath);
        if (lang) {
            switchLang(lang);
        }
    }
}

/**
 * Switch language and navigate to translated route
 * @param {string} targetLang - Target language ('est' or 'en')
 */
export function switchLanguageRoute(targetLang) {
    const currentPath = window.location.pathname;
    const translatedPath = getTranslatedRoute(currentPath, targetLang);
    
    // Always update the language first
    switchLang(targetLang);
    
    // Only navigate if the path is different
    if (translatedPath !== currentPath) {
        navigate(translatedPath);
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