<script setup>
  import { Section, Stack, Image } from "../components/index.js";
  import { onMounted, ref } from 'vue';
  import { loadYaml } from '../lib/yaml.js';
  import { currentLang, currentLocale, getLangText, usePageText } from "../lib/index.js";
  import { getRootAssetPath } from "../lib/imageHelpers.js";

  const workshops = ref([]);
  const text = usePageText("Workshops");

  onMounted(async () => {
    const parsed = await loadYaml('/_data/workshops.yml', []);
    workshops.value = parsed.filter((w) => w?.title);
  });

  function getField(workshop, field) {
    return getLangText(workshop, field, currentLang.value);
  }

  function formatDate(value) {
    const match = String(value || '').match(/^(\d{4})-(\d{2})$/);
    if (!match) return '';
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
    return new Intl.DateTimeFormat(currentLocale.value, {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  }

  function getGallery(workshop) {
    return Array.isArray(workshop?.gallery) ? workshop.gallery : [];
  }

  function getGalleryClass(count) {
    const classes = {
      1: "grid-cols-1 grid-rows-1",
      2: "grid-cols-2",
      3: "grid-cols-2 grid-rows-2",
      4: "grid-cols-2 grid-rows-2",
    };
    return classes[count] || "grid-cols-2";
  }

  function getImageHeightClass(count, index) {
    if (count === 1) return "h-56";
    if (count === 2) return "h-40";
    if (count === 3) {
      return index === 0 ? "h-72 row-span-2" : "h-32";
    }
    if (count === 4) return "h-32";
    return "h-32";
  }
</script>

<template>
<div class="safe-area-navbar">
  <!-- Hero Section -->
  <Section bg="bg-gray-900" class="text-white">
      <div class="max-w-2xl">
        <p class="font-dm-mono text-xs uppercase tracking-widest text-orange-500 mb-4">
          {{ text.hero?.label }}
        </p>
        <h1 class="font-syne text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
          {{ text.hero?.title }}
          <em class="block text-orange-500 not-italic"
            >{{ text.hero?.titleHighlight }}</em
          >
        </h1>
        <p class="text-sm text-gray-400 max-w-sm leading-relaxed font-space-grotesk font-light">
          {{ text.hero?.subtitle }}
        </p>
      </div>
  </Section>

  <!-- Workshops Content -->
  <Section>
    <Stack gap="lg">
      <template v-for="(workshop, index) in workshops" :key="index">
        <div :class="`grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 py-16 border-b border-orange-500 ${index === workshops.length - 1 ? 'border-b-0' : ''}`">
          <!-- Gallery -->
          <div
            :class="`grid gap-1.5 ${index % 2 === 1 ? 'md:order-2' : ''}`"
          >
            <div :class="`grid ${getGalleryClass(getGallery(workshop).length)} gap-1.5`">
              <template v-for="(filename, i) in getGallery(workshop)" :key="filename">
                <div
                  :class="`overflow-hidden ${getImageHeightClass(getGallery(workshop).length, i)}`"
                >
                  <Image
                    :src="getRootAssetPath('workshop-images', filename, 'jpg')"
                    :alt="`${getField(workshop, 'title')} ${i + 1}`"
                    objectFit="cover"
                    class="h-full w-full"
                    pictureClass="h-full w-full"
                  />
                </div>
              </template>
            </div>
          </div>

          <!-- Content -->
          <div :class="`pt-2 ${index % 2 === 1 ? 'md:order-1' : ''}`">
            <h2 class="font-syne text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {{ getField(workshop, "title") }}
            </h2>
            <p class="text-sm leading-7 text-gray-600 font-space-grotesk font-light mb-7">
              {{ getField(workshop, "description") }}
            </p>
            <div class="flex flex-wrap gap-7">
              <div class="flex flex-col gap-1">
                <span class="font-dm-mono text-xs uppercase tracking-wide text-gray-500">
                  {{ text.details?.mentor }}
                </span>
                <span class="text-sm text-gray-700 font-space-grotesk">
                  {{ getField(workshop, "mentor") }}
                </span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-dm-mono text-xs uppercase tracking-wide text-gray-500">
                  {{ text.details?.duration }}
                </span>
                <span class="text-sm text-gray-700 font-space-grotesk">
                  {{ getField(workshop, "duration") }}
                </span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-dm-mono text-xs uppercase tracking-wide text-gray-500">
                  {{ text.details?.date }}
                </span>
                <span class="text-sm text-gray-700 font-space-grotesk">
                  {{ formatDate(workshop.date) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Stack>
  </Section>
</div>
</template>
