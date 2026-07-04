/**
 * Image path helpers for assets under /public/assets.
 *
 * Optimised convention:
 * /assets/{category}/optimised/{imageName}/
 *   full.webp, full.jpg
 *   400.webp, 800.webp, 1200.webp (optional responsive variants)
 */

/**
 * Get the image name without extension
 * @param {string} filename - e.g., "mari.jpg"
 * @returns {string} - e.g., "mari"
 */
function getImageName(filename) {
  if (!filename) return "";
  const lastDot = filename.lastIndexOf(".");
  return lastDot > 0 ? filename.slice(0, lastDot) : filename;
}

function normaliseFormat(format) {
  return String(format || "").toLowerCase() === "webp" ? "webp" : "jpg";
}

function getOptimisedBasePath(category, filename) {
  const imageName = getImageName(filename);
  return `/assets/${category}/optimised/${imageName}`;
}

function getVariantSrc(category, filename, variant = "full", format = "webp") {
  const ext = normaliseFormat(format);
  const safeVariant = String(variant || "full").trim() || "full";
  return `${getOptimisedBasePath(category, filename)}/${safeVariant}.${ext}`;
}

/**
 * Get an asset path from category root (e.g. SVG icons).
 * @param {string} category - e.g., "helpdesk-page-images"
 * @param {string} filename - e.g., "helpdesk-icon.svg" or "helpdesk-icon"
 * @param {string} defaultExt - e.g., "svg"
 * @returns {string} - e.g., "/assets/helpdesk-page-images/helpdesk-icon.svg"
 */
export function getRootAssetPath(category, filename, defaultExt = "svg") {
  const value = String(filename || "").trim();
  if (!value) return "";
  const hasExt = /\.[^./\\]+$/.test(value);
  const fileWithExt = hasExt ? value : `${value}.${defaultExt}`;
  return `/assets/${category}/${fileWithExt}`;
}

/**
 * Get the optimised image path.
 * @param {string} category - e.g., "mentors-images", "past-management-images"
 * @param {string} filename - e.g., "mari.jpg"
 * @param {string} format - "webp" or "jpg" (default: "webp")
 * @param {string} variant - e.g., "full", "400", "800", "1200" (default: "full")
 * @returns {string} - e.g., "/assets/mentors-images/optimised/mari/full.webp"
 */
export function getOptimisedImagePath(category, filename, format = "webp", variant = "full") {
  return getVariantSrc(category, filename, variant, format);
}

/**
 * Get srcset for responsive variants.
 * @param {string} category - e.g., "home-page-images"
 * @param {string} filename - e.g., "hero.png"
 * @param {number[]} widths - e.g., [400, 800, 1200]
 * @param {string} format - "webp" or "jpg"
 * @returns {string} - srcset string with width descriptors
 */
export function getResponsiveImageSrcSet(category, filename, widths = [400, 800, 1200], format = "webp") {
  return widths
    .map((w) => `${getVariantSrc(category, filename, w, format)} ${w}w`)
    .join(", ");
}

/**
 * Get srcset for hero/background images with responsive variants
 * @param {string} category - e.g., "home-page-images"
 * @param {string} filename - e.g., "hero.png"
 * @returns {string} - srcset string with 400w, 800w, 1200w variants
 */
export function getHeroImageSrcSet(category, filename) {
  return getResponsiveImageSrcSet(category, filename, [400, 800, 1200], "webp");
}

/**
 * Get the full size image path for hero images
 * @param {string} category - e.g., "home-page-images"
 * @param {string} filename - e.g., "hero.png"
 * @returns {string} - e.g., "/assets/home-page-images/optimised/hero/1200.webp"
 */
export function getHeroImagePath(category, filename) {
  return getOptimisedImagePath(category, filename, "webp", "1200");
}

/**
 * Get the fallback (jpg) path for hero images.
 * @param {string} category - e.g., "home-page-images"
 * @param {string} filename - e.g., "hero.png"
 * @returns {string} - e.g., "/assets/home-page-images/optimised/hero/full.jpg"
 */
export function getHeroImageFallback(category, filename) {
  return getOptimisedImagePath(category, filename, "jpg");
}

/**
 * Get srcset for regular optimised images (full variant only)
 * @param {string} category - e.g., "mentors-images"
 * @param {string} filename - e.g., "mari.jpg"
 * @returns {string} - srcset string with webp and jpg variants
 */
export function getOptimisedImageSrcSet(category, filename) {
  return getOptimisedImagePath(category, filename, "webp");
}

/**
 * Get the fallback jpg for regular optimised images
 * @param {string} category - e.g., "mentors-images"
 * @param {string} filename - e.g., "mari.jpg"
 * @returns {string} - e.g., "/assets/mentors-images/optimised/mari/full.jpg"
 */
export function getOptimisedImageFallback(category, filename) {
  return getOptimisedImagePath(category, filename, "jpg");
}
