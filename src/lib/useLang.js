import { computed } from 'vue';
import { getLangText } from './langHelpers.js';
import { currentLang } from './i18n.js';

/**
 * Vue composable for language helpers
 * Provides reactive language text handling
 */
export function useLang() {
  /**
   * Get text with language fallback (reactive version)
   * @param {Object} item - The item containing text
   * @param {string} key - The key to get text for
   * @returns {import('vue').ComputedRef<string>}
   */
  const getLangTextComputed = (item, key) => {
    return computed(() => getLangText(item, key, currentLang.value));
  };

  /**
   * Get text with specific language fallback
   * @param {Object} item - The item containing text
   * @param {string} key - The key to get text for
   * @param {string} lang - Specific language to use (default: current language)
   * @returns {string}
   */
  const getLangTextStatic = (item, key, lang = currentLang.value) => {
    return getLangText(item, key, lang);
  };

  return {
    getLangTextComputed,
    getLangTextStatic,
    // Original function for backwards compatibility
    getLangText
  };
}