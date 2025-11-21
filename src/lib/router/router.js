/**
 * Navigate to a path (internal or external)
 * @param {string} path - The path or URL to navigate to
 * @param {boolean} external - Whether this is an external link (default: false)
 */
export function navigate(path, external = false) {
    if (external) {
        window.location.href = path;
    } else {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new PopStateEvent('popstate'));
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