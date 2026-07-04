import { onScopeDispose, ref, watch } from 'vue';
import { getLanguageFromRoute } from '../routes';

const localeModules = import.meta.glob('./locales/*/*.json');

function getInitialLanguage() {
    if (typeof window === 'undefined') return 'est';

    const langFromRoute = getLanguageFromRoute(window.location.pathname);
    if (langFromRoute) {
        localStorage.setItem('language', langFromRoute);
        return langFromRoute;
    }

    return localStorage.getItem('language') || 'est';
}

export const currentLang = ref(getInitialLanguage());
export const text = ref({});

async function loadTranslations(lang) {
    try {
        const translations = {};
        const matchingModules = Object.entries(localeModules).filter(([path]) =>
            path.includes(`/locales/${lang}/`),
        );
        const modules = await Promise.all(matchingModules.map(([, loader]) => loader()));
        modules.forEach((module) => Object.assign(translations, module.default || module));
        text.value = translations;
    } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
        text.value = {};
    }
}

watch(currentLang, loadTranslations, { immediate: true });

export function usePageText(pageName) {
    const pageText = ref({});
    const stop = watch(currentLang, async (lang) => {
        try {
            const loader = localeModules[`./locales/${lang}/${pageName}.json`];
            const module = loader ? await loader() : null;
            pageText.value = module?.default || module || {};
        } catch (error) {
            console.error(`Failed to load ${pageName} translations for ${lang}:`, error);
            pageText.value = {};
        }
    }, { immediate: true });

    onScopeDispose(stop);
    return pageText;
}

export function switchLang(lang) {
    currentLang.value = lang;
    if (typeof window !== 'undefined') localStorage.setItem('language', lang);
}

if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
        const lang = getLanguageFromRoute(window.location.pathname);
        if (lang) switchLang(lang);
    });
}
