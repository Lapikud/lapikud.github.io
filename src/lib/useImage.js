import { computed } from 'vue';
import {
  getRootAssetPath,
  getOptimisedImagePath,
  getHeroImagePath,
  getHeroImageSrcSet,
  getHeroImageFallback,
  getResponsiveImageSrcSet,
  getOptimisedImageSrcSet,
  getOptimisedImageFallback
} from './imageHelpers.js';

/**
 * Vue composable for image handling
 * Provides reactive image path generation
 */
export function useImage() {
  /**
   * Get an asset path from category root
   * @param {string} category - e.g., "helpdesk-page-images"
   * @param {string} filename - e.g., "helpdesk-icon.svg" or "helpdesk-icon"
   * @param {string} defaultExt - e.g., "svg"
   * @returns {import('vue').ComputedRef<string>}
   */
  const getRootAssetPathComputed = (category, filename, defaultExt = "svg") => {
    return computed(() => getRootAssetPath(category, filename, defaultExt));
  };

  /**
   * Get the optimised image path
   * @param {string} category - e.g., "mentors-images", "past-management-images"
   * @param {string} filename - e.g., "mari.jpg"
   * @param {string} format - "webp" or "jpg" (default: "webp")
   * @param {string} variant - e.g., "full", "400", "800", "1200" (default: "full")
   * @returns {import('vue').ComputedRef<string>}
   */
  const getOptimisedImagePathComputed = (category, filename, format = "webp", variant = "full") => {
    return computed(() => getOptimisedImagePath(category, filename, format, variant));
  };

  /**
   * Get the hero image path
   * @param {string} category - e.g., "home-page-images"
   * @param {string} filename - e.g., "hero.png"
   * @returns {import('vue').ComputedRef<string>}
   */
  const getHeroImagePathComputed = (category, filename) => {
    return computed(() => getHeroImagePath(category, filename));
  };

  /**
   * Get srcset for hero/background images with responsive variants
   * @param {string} category - e.g., "home-page-images"
   * @param {string} filename - e.g., "hero.png"
   * @returns {import('vue').ComputedRef<string>}
   */
  const getHeroImageSrcSetComputed = (category, filename) => {
    return computed(() => getHeroImageSrcSet(category, filename));
  };

  /**
   * Get the fallback (jpg) path for hero images
   * @param {string} category - e.g., "home-page-images"
   * @param {string} filename - e.g., "hero.png"
   * @returns {import('vue').ComputedRef<string>}
   */
  const getHeroImageFallbackComputed = (category, filename) => {
    return computed(() => getHeroImageFallback(category, filename));
  };

  /**
   * Get srcset for responsive variants
   * @param {string} category - e.g., "home-page-images"
   * @param {string} filename - e.g., "hero.png"
   * @param {number[]} widths - e.g., [400, 800, 1200]
   * @param {string} format - "webp" or "jpg"
   * @returns {import('vue').ComputedRef<string>}
   */
  const getResponsiveImageSrcSetComputed = (category, filename, widths = [400, 800, 1200], format = "webp") => {
    return computed(() => getResponsiveImageSrcSet(category, filename, widths, format));
  };

  /**
   * Get srcset for regular optimised images (full variant only)
   * @param {string} category - e.g., "mentors-images"
   * @param {string} filename - e.g., "mari.jpg"
   * @returns {import('vue').ComputedRef<string>}
   */
  const getOptimisedImageSrcSetComputed = (category, filename) => {
    return computed(() => getOptimisedImageSrcSet(category, filename));
  };

  /**
   * Get the fallback jpg for regular optimised images
   * @param {string} category - e.g., "mentors-images"
   * @param {string} filename - e.g., "mari.jpg"
   * @returns {import('vue').ComputedRef<string>}
   */
  const getOptimisedImageFallbackComputed = (category, filename) => {
    return computed(() => getOptimisedImageFallback(category, filename));
  };

  return {
    // Computed versions
    getRootAssetPathComputed,
    getOptimisedImagePathComputed,
    getHeroImagePathComputed,
    getHeroImageSrcSetComputed,
    getHeroImageFallbackComputed,
    getResponsiveImageSrcSetComputed,
    getOptimisedImageSrcSetComputed,
    getOptimisedImageFallbackComputed,
    
    // Original functions for backwards compatibility
    getRootAssetPath,
    getOptimisedImagePath,
    getHeroImagePath,
    getHeroImageSrcSet,
    getHeroImageFallback,
    getResponsiveImageSrcSet,
    getOptimisedImageSrcSet,
    getOptimisedImageFallback
  };
}