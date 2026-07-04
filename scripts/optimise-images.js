#!/usr/bin/env node
// optimise-images.js
// Run from project root: node scripts/optimise-images.js
//
// Finds all public/assets/**/original/ folders and generates optimised/ output.
// Category rules defined in CATEGORY_RULES below — add new pages there.
//
// Rule types per image stem (or "*" catch-all):
//   { widths: [400, 800, 1200] }  → responsive srcset variants + full at original size
//   { maxWidth: 400 }             → single size resized to maxWidth (full.webp + full.jpg)
//   omitted                       → full at original size only (format conversion only)
//
// Requires: sharp  →  npm install --save-dev sharp

import sharp from "sharp";
import { readdir, mkdir, rm } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_ROOT = path.resolve(__dirname, "../public/assets");

const CATEGORY_RULES = {
  "home-page-images": {
    hero: { widths: [400, 800, 1200] },
    "*":  { widths: [400, 800] },
  },
  "helpdesk-page-images": {
    "*": { widths: [400, 800, 1200] },
  },
  "mentors-images": {
    "*": { maxWidth: 400 },
  },
  "management-images": {
    "*": { maxWidth: 400 },
  },
  "past-management-images": {
    "*": { maxWidth: 200 },
  },
  "workshop-images": {
    "*": { widths: [400, 800] },
  },
  "ourwork-images": {
    "*": { widths: [400, 800] },
  },
  // Add future pages here, e.g.:
  // "about-page-images": { "*": { widths: [400, 800] } },
};

// Image extensions to process (SVGs are skipped)
const SUPPORTED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tiff"]);

async function findOriginalDirs(root) {
  const results = [];
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "original") results.push(full);
        else await walk(full);
      }
    }
  }
  await walk(root);
  return results;
}

async function getImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && SUPPORTED_EXT.has(path.extname(e.name).toLowerCase()))
    .map(e => e.name);
}

async function writeVariant(inputPath, outputPath, width, format) {
  let pipeline = sharp(inputPath);
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  if (format === "webp") pipeline = pipeline.webp({ quality: 82 });
  if (format === "jpg") pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
  await pipeline.toFile(outputPath);
}

async function processImage(inputPath, outputDir, rule) {
  const name = path.parse(inputPath).name;
  const imageDir = path.join(outputDir, name);

  if (existsSync(imageDir)) await rm(imageDir, { recursive: true });
  await mkdir(imageDir, { recursive: true });

  if (rule?.widths?.length > 0) {
    // Responsive: write each breakpoint variant
    for (const w of rule.widths) {
      await writeVariant(inputPath, path.join(imageDir, `${w}.webp`), w, "webp");
      await writeVariant(inputPath, path.join(imageDir, `${w}.jpg`), w, "jpg");
      console.log(`  ✓ ${name}/${w}.webp + ${w}.jpg`);
    }
    // Full at original size as fallback
    await writeVariant(inputPath, path.join(imageDir, "full.webp"), null, "webp");
    await writeVariant(inputPath, path.join(imageDir, "full.jpg"), null, "jpg");
    console.log(`  ✓ ${name}/full.webp + full.jpg`);
  } else if (rule?.maxWidth) {
    // Single size: resize to maxWidth — this is the full
    await writeVariant(inputPath, path.join(imageDir, "full.webp"), rule.maxWidth, "webp");
    await writeVariant(inputPath, path.join(imageDir, "full.jpg"), rule.maxWidth, "jpg");
    console.log(`  ✓ ${name}/full.webp + full.jpg (capped at ${rule.maxWidth}px)`);
  } else {
    // No rule: full at original size, format conversion only
    await writeVariant(inputPath, path.join(imageDir, "full.webp"), null, "webp");
    await writeVariant(inputPath, path.join(imageDir, "full.jpg"), null, "jpg");
    console.log(`  ✓ ${name}/full.webp + full.jpg`);
  }
}

async function processOriginalDir(originalDir) {
  const categoryDir = path.dirname(originalDir);
  const categoryName = path.basename(categoryDir);
  const optimisedDir = path.join(categoryDir, "optimised");

  if (existsSync(optimisedDir)) await rm(optimisedDir, { recursive: true });
  await mkdir(optimisedDir, { recursive: true });

  const images = await getImages(originalDir);
  if (images.length === 0) {
    console.log(`  (no supported images found)`);
    return;
  }

  const categoryRules = CATEGORY_RULES[categoryName] ?? null;

  for (const imgFile of images) {
    const inputPath = path.join(originalDir, imgFile);
    const stem = path.parse(imgFile).name.toLowerCase();
    const rule = categoryRules
      ? (categoryRules[stem] ?? categoryRules["*"] ?? null)
      : null;

    await processImage(inputPath, optimisedDir, rule);
  }
}

async function main() {
  console.log("🔍 Scanning for original/ folders...\n");
  const originalDirs = await findOriginalDirs(ASSETS_ROOT);

  if (originalDirs.length === 0) {
    console.log("No original/ folders found under", ASSETS_ROOT);
    process.exit(0);
  }

  for (const dir of originalDirs) {
    const rel = path.relative(process.cwd(), dir);
    console.log(`📁 ${rel}`);
    await processOriginalDir(dir);
    console.log();
  }

  console.log("✅ Done.");
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});