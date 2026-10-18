<script setup>
  import {
    Section,
    Grid,
    Image,
  } from "../components/index.js";

  import { onMounted, ref } from 'vue';
  import { usePageText, useYaml, useImage } from "../lib/index.js";

  const text = usePageText("Ajalugu");
  const yaml = useYaml();
  const image = useImage();

  const pastManagement = ref([]);
  const loading = ref(true);
  const loadError = ref(false);

  function parseYearLabel(label) {
    const value = String(label ?? "");
    const match = value.match(/^(\d{4})(?:\s*\((.+)\))?$/);

    if (!match) {
      return { year: value, tag: "" };
    }

    return {
      year: match[1],
      tag: match[2] ?? "",
    };
  }

  function getInitials(name) {
    return (
      String(name ?? "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "?"
    );
  }

  onMounted(async () => {
    try {
      pastManagement.value = await yaml.loadYaml('/_data/past_management.yml', []);
    } catch (error) {
      console.error('Error loading past management data:', error);
      loadError.value = true;
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
<div class="safe-area-navbar">
  <Section padding="large">
    <article class="mx-auto max-w-3xl">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{{ text.kicker || '' }}</p>
      <h1 class="mb-8 text-[clamp(2.5rem,6vw,4rem)] leading-tight font-medium text-black">{{ text.title || '' }}</h1>
      <div class="flex flex-col gap-6">
        <template v-for="paragraph in text.paragraphs || []" :key="paragraph">
          <p class="text-base leading-8 text-black/80 md:text-lg md:leading-9">{{ paragraph }}</p>
        </template>
      </div>
    </article>
  </Section>

  <!-- People who have led the organisation over time -->
  <Section padding="large">
    <div class="mb-7 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h2 class="m-0 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.12] tracking-[-0.03em]">{{ text.history?.label || '' }}</h2>
        <p class="mt-2 text-[0.98rem] text-[rgba(13,13,13,0.62)]">{{ text.history?.hint || '' }}</p>
      </div>
    </div>

    <template v-if="loading">
      <p class="m-0 py-4 text-black">{{ text.loading || '' }}</p>
    </template><template v-else-if="loadError">
      <p class="m-0 py-4 text-red-500">{{ text.error || '' }}</p>
    </template><template v-else>
      <div class="flex flex-col gap-10">
        <template v-for="yearData in pastManagement" :key="yearData.year">
          <section class="mb-5">
            <div class="mb-4 flex w-full flex-col items-start gap-3 border-b border-orange-500 pb-3">
              <div class="flex items-baseline gap-3 whitespace-nowrap">
                <span class="text-[1.6rem] leading-none font-bold text-orange-500 tracking-[-0.04em]">{{ parseYearLabel(yearData.year).year }}</span>
                <template v-if="parseYearLabel(yearData.year).tag">
                  <span class="rounded-full px-[0.55rem] py-[0.2rem] text-[0.64rem] tracking-widest uppercase self-center text-orange-500">{{ parseYearLabel(yearData.year).tag }}</span>
                </template>
              </div>
            </div>

            <Grid min="150px" :mobileColumns="2" gap="gap-5" class="items-start">
              <template v-for="member in yearData.members" :key="member.name">
                <div class="group flex flex-col items-center gap-2.5 text-center">
                  <div class="h-24 w-24 overflow-hidden rounded-[10px] bg-linear-to-br outline-2 outline-transparent outline-offset-2 transition [@media(min-width:769px)]:h-28 [@media(min-width:769px)]:w-28">
                    <template v-if="member.image">
                      <Image
                        :webpSrc="image.getOptimisedImagePath('past-management-images', member.image, 'webp')"
                        :src="image.getOptimisedImageFallback('past-management-images', member.image)"
                        :alt="member.name"
                        objectFit="cover"
                        class="block h-full w-full"
                        pictureClass="h-full w-full"
                      />
                    </template><template v-else>
                      <div class="grid h-full w-full place-items-center text-sm font-bold text-orange-600">{{ getInitials(member.name) }}</div>
                    </template>
                  </div>
                  <span class="max-w-[14ch] text-[0.86rem] font-semibold leading-[1.35] text-gray-900">{{ member.name }}</span>
                </div>
              </template>
            </Grid>
          </section>
        </template>
      </div>
    </template>
  </Section>
</div>
</template>
