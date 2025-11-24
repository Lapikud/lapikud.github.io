import { writable } from 'svelte/store';

// Load saved language or default to 'est'
const savedLang = typeof window !== 'undefined'
    ? localStorage.getItem('language') || 'est'
    : 'est';

export const currentLang = writable(savedLang);

// Store for translations
export const text = writable({});

async function loadTranslations(lang) {
    try {
        const response = await fetch(`/locales/${lang}.json`);
        const data = await response.json();
        text.set(data);
    } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
    }
}

loadTranslations(savedLang);

export function switchLang(lang) {
    currentLang.set(lang);
    loadTranslations(lang);
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
    }
}