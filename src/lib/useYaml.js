import { ref } from 'vue';
import { loadYaml } from './yaml.js';

/**
 * Vue composable for YAML data loading
 * Provides reactive YAML data loading
 */
export function useYaml() {
  /**
   * Load YAML data reactively
   * @param {string} path - Path to the YAML file
   * @param {any} fallback - Fallback value if loading fails
   * @returns {import('vue').Ref<any>} Reactive reference to the loaded data
   */
  const loadYamlComposable = (path, fallback) => {
    const data = ref(fallback);
    const loading = ref(true);
    const error = ref(null);

    loadYaml(path, fallback)
      .then((result) => {
        data.value = result;
        loading.value = false;
      })
      .catch((err) => {
        error.value = err;
        data.value = fallback;
        loading.value = false;
      });

    return {
      data,
      loading,
      error
    };
  };

  return {
    loadYamlComposable,
    // Original function for backwards compatibility
    loadYaml
  };
}