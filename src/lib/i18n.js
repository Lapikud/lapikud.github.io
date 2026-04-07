import { writable } from 'svelte/store';
import { getLanguageFromRoute } from '../routes';

const localeModules = import.meta.glob('./locales/*/*.json');

// Get initial language from URL or localStorage
function getInitialLanguage() {
    if (typeof window === 'undefined') return 'est';
    
    const path = window.location.pathname;
    const langFromRoute = getLanguageFromRoute(path);
    
    // If we detected a language from route, use it and save it
    if (langFromRoute) {
        localStorage.setItem('language', langFromRoute);
        return langFromRoute;
    }
    
    // Otherwise use saved language or default to 'est'
    return localStorage.getItem('language') || 'est';
}

const initialLang = getInitialLanguage();

export const currentLang = writable(initialLang);

// Store for translations
export const text = writable({});

async function loadTranslations(lang) {
    try {
        const translations = {};
        
        // Dynamically import all translation files for the specific language
        // Vite will code-split these and only bundle the ones actually used
        for (const path in localeModules) {
            if (path.includes(`/locales/${lang}/`) || path.includes(`\\locales\\${lang}\\`)) {
                const module = await localeModules[path]();
                Object.assign(translations, module.default || module);
            }
        }
        
        text.set(translations);
    } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
    }
}

loadTranslations(initialLang);

/**
 * Create a translation store that only loads one page file per language.
 * Example: createPageTextStore('Home') -> ./locales/est/Home.json or ./locales/en/Home.json
 */
export function createPageTextStore(pageName) {
    const pageText = writable({});

    async function loadPageTranslations(lang) {
        try {
            const filePath = `./locales/${lang}/${pageName}.json`;
            const loader = localeModules[filePath];

            if (!loader) {
                pageText.set({});
                return;
            }

            const module = await loader();
            pageText.set(module.default || module);
        } catch (error) {
            console.error(`Failed to load ${pageName} translations for ${lang}:`, error);
            pageText.set({});
        }
    }

    const unsubscribe = currentLang.subscribe((lang) => {
        loadPageTranslations(lang);
    });

    return {
        subscribe: pageText.subscribe,
        destroy: unsubscribe,
    };
}

export function switchLang(lang) {
    currentLang.set(lang);
    loadTranslations(lang);
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
    }
}

// Update language when route changes
if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
        const path = window.location.pathname;
        const lang = getLanguageFromRoute(path);
        if (lang) {
            switchLang(lang);
        }
    });
}