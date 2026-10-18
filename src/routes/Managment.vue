<script setup>
  import {
    Section,
    Grid,
  } from "../components/index.js";
  import { onMounted, ref } from 'vue';
  import { currentLang, getLangText, usePageText, useYaml, useImage } from "../lib/index.js";
  import IconMail from "~icons/keyline-icons/mail-duotone";
  import IconPhone from "~icons/keyline-icons/phone-duotone";

  // Initialize composables
  const yaml = useYaml();
  const image = useImage();

  const currentManagement = ref([]);
  const text = usePageText("Management");

  onMounted(async () => {
    try {
      currentManagement.value = await yaml.loadYaml('/_data/management.yml', []);
    } catch (error) {
      console.error('Error loading management data:', error);
    }
  });
</script>

<template>
<div class="safe-area-navbar">
<Section padding="large">
  <div class="mb-12 max-w-3xl">
    <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{{ text.hero?.eyebrow || "Meist" }}</p>
    <h1 class="mb-4 text-[clamp(2.5rem,6vw,4rem)] leading-tight font-medium text-black">{{ text.hero?.title || "Juhtkond" }}</h1>
    <p class="text-base leading-8 text-black/60">{{ text.hero?.intro || '' }}</p>
  </div>

  <h2 class="mb-8 text-xl font-semibold text-black md:text-2xl">{{ text.current?.label || '' }}</h2>

  <Grid min="500px">
      <template v-for="member in currentManagement" :key="member.name">
        <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div class="h-[150px] w-[150px] shrink-0">
            <picture>
              <source :srcset="image.getOptimisedImagePath('management-images', member.photo, 'webp')" type="image/webp" />
              <img
                :src="image.getOptimisedImageFallback('management-images', member.photo)"
                :alt="member.name"
                class="w-full h-full object-cover rounded-md"
              />
            </picture>
          </div>
          <div class="flex flex-col gap-2 grow">
            <h3 class="text-2xl font-medium">{{ member.name }}</h3>
            <p class="text-base text-gray-700">
              {{ getLangText(member, 'role', currentLang) }} - {{ getLangText(member, 'subrole', currentLang) }}
            </p>
            <a
              :href="`mailto:${member.email}`"
              class="text-base flex items-center gap-2 text-orange-500 hover:opacity-80 transition"
            >
              <IconMail class="size-[18px]" />{{ member.email }}
            </a>
            <a
              :href="`tel:${member.phone}`"
              class="text-base flex items-center gap-2 text-orange-500 hover:opacity-80 transition"
            >
              <IconPhone class="size-[18px]" />{{ member.phone }}
            </a>
          </div>
        </div>
      </template>
    </Grid>
</Section>
</div>
</template>
