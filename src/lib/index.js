export { useRouter } from './router/useRouter.js';
export { default as Router } from './router/Router.vue';

export { currentLang, currentLocale, languageLocales, text, switchLang, usePageText } from './i18n.js';
export { useLang } from './useLang.js';
export { useImage } from './useImage.js';
export { useYaml } from './useYaml.js';

// Backwards compatibility exports from old utilities
export { navigate, goBack, reload, getPath, getQuery, switchLanguageRoute } from './router/router.js';
export { getLangText } from './langHelpers.js';
export { loadYaml } from './yaml.js';
export {
  getRootAssetPath,
  getOptimisedImagePath,
  getHeroImagePath,
  getHeroImageSrcSet,
  getHeroImageFallback,
  getResponsiveImageSrcSet,
  getOptimisedImageSrcSet,
  getOptimisedImageFallback
} from './imageHelpers.js';
