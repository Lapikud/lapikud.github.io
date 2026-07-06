import { computed, onScopeDispose, ref, watch } from 'vue';
import { getLanguageFromRoute } from '../routes';

const localeModules = import.meta.glob('./locales/*/*.json');
const supportedLanguages = new Set(['est', 'en']);
export const languageLocales = { est: 'et-EE', en: 'en-GB' };

function getInitialLanguage() {
    if (typeof window === 'undefined') return 'est';

    const langFromRoute = getLanguageFromRoute(window.location.pathname);
    if (langFromRoute) {
        localStorage.setItem('language', langFromRoute);
        return langFromRoute;
    }

    const savedLanguage = localStorage.getItem('language');
    return supportedLanguages.has(savedLanguage) ? savedLanguage : 'est';
}

export const currentLang = ref(getInitialLanguage());
export const currentLocale = computed(() => languageLocales[currentLang.value]);
export const text = ref({});
let translationRequest = 0;

async function loadTranslations(lang) {
    const request = ++translationRequest;
    try {
        const translations = {};
        const matchingModules = Object.entries(localeModules).filter(([path]) =>
            path.includes(`/locales/${lang}/`),
        );
        const modules = await Promise.all(matchingModules.map(([, loader]) => loader()));
        modules.forEach((module) => Object.assign(translations, module.default || module));
        if (request === translationRequest) text.value = translations;
    } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
        if (request === translationRequest) text.value = {};
    }
}

watch(currentLang, loadTranslations, { immediate: true });

export function usePageText(pageName) {
    const pageText = ref({});
    let pageRequest = 0;
    const stop = watch(currentLang, async (lang) => {
        const request = ++pageRequest;
        try {
            const loader = localeModules[`./locales/${lang}/${pageName}.json`];
            const module = loader ? await loader() : null;
            if (request === pageRequest) pageText.value = module?.default || module || {};
        } catch (error) {
            console.error(`Failed to load ${pageName} translations for ${lang}:`, error);
            if (request === pageRequest) pageText.value = {};
        }
    }, { immediate: true });

    onScopeDispose(stop);
    return pageText;
}

export function switchLang(lang) {
    if (!supportedLanguages.has(lang)) return;
    currentLang.value = lang;
    if (typeof window !== 'undefined') localStorage.setItem('language', lang);
}

watch(currentLocale, (locale) => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale;
}, { immediate: true });

if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
        const lang = getLanguageFromRoute(window.location.pathname);
        if (lang) switchLang(lang);
    });
}
