<script setup>
  import { Section, Grid, Card, Button } from "../components/index.js";
  import { computed, onMounted, ref } from 'vue';
  import { loadYaml } from '../lib/yaml.js';
  import { currentLang, getLangText, navigate, usePageText } from "../lib/index.js";
  import { getOptimisedImagePath, getOptimisedImageFallback } from "../lib/imageHelpers.js";

  import { ExternalLink } from "@lucide/vue";

  const projects = ref([]);
  const text = usePageText("OurWork");

  onMounted(async () => {
    const parsed = await loadYaml('/_data/ourwork.yml', []);
    projects.value = parsed.filter((p) => p?.title);
  });

  const featuredProject = computed(() => projects.value[0] || null);
  const regularProjects = computed(() => projects.value.slice(1));

  function projectTitle(project) {
    return getLangText(project, "title", currentLang.value);
  }

  function projectDescription(project) {
    return getLangText(project, "description", currentLang.value);
  }

  function projectImage(project) {
    return project?.photo
      ? getOptimisedImagePath("ourwork-images", project.photo, "webp")
      : "";
  }

  function handleImageError(event, photo) {
    event.currentTarget.src = getOptimisedImageFallback("ourwork-images", photo);
  }

  function openCtaEmail() {
    window.location.href = "mailto:lapikud@lapikud.ee";
  }

  function openCtaContact() {
    navigate('/contact');
  }
</script>

<template>
<div class="safe-area-navbar">

  <!-- Hero Section -->
  <Section
    padding="none"
    bg="bg-gray-900"
    class="overflow-hidden"
    contentClass="relative z-10 py-[clamp(3.5rem,8vw,5rem)]"
  >
    <div class="relative z-10">
      <h1 class="max-w-[20ch] text-[clamp(2.6rem,5.5vw,4.8rem)] leading-none font-bold tracking-[-0.03em] text-white">
        {{ text.intro?.prefix || "Meie tehtud " }}
        <br />
        <span class="text-orange-500">{{ text.intro?.emphasis || "tööd." }}</span>
      </h1>
      <p class="mt-5 max-w-105 text-[0.95rem] leading-[1.7] text-white/45">
        {{ text.intro?.subtitle || "Valik projekte, mida meie liikmed on teostanud, veebilehtedest mobiilirakendusteni." }}
      </p>
    </div>
  </Section>

  <!-- CTA Section -->
  <Section
    padding="none"
    bg="bg-orange-500"
    contentClass="py-[clamp(2.3rem,5vw,3.25rem)]"
  >
    <div class="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-10">
      <div>
        <h2 class="mb-2 text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.1] font-bold tracking-[-0.02em] text-gray-900">
          {{ text.cta?.title || "Alustame koostööd?" }}
        </h2>
        <p class="max-w-95 text-[0.88rem] leading-[1.6] text-gray-900/70">
          {{ text.cta?.description || "Võta ühendust ja arutame, kuidas saame sinu ideed ellu viia!" }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Button
          :onClick="openCtaEmail"
          class="gap-2 rounded-none! border-gray-900! bg-gray-900 px-5.5 py-3 text-[0.83rem] font-semibold text-white transition-colors hover:border-gray-800 hover:bg-gray-800"
        >
          {{ text.cta?.emailButton || "Saada e-kiri" }} <span aria-hidden="true">&rarr;</span>
        </Button>
        <Button
          :onClick="openCtaContact"
          class="rounded-none! border-gray-900/35! bg-transparent px-5.5 py-3 text-[0.83rem] font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900/6"
        >
          {{ text.cta?.contactButton || "Kontaktandmed" }}
        </Button>
      </div>
    </div>
  </Section>

  <Section padding="large">
    <div class="mb-22">
      <p class="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-orange-500">{{ text.portfolio?.label || "Tehtud tööd" }}</p>
      <h1 class="m-0 max-w-[20ch] text-[clamp(1.9rem,4vw,3.15rem)] leading-[1.08] tracking-[-0.03em]">{{ text.portfolio?.title || "Projektid, mis räägivad enda eest." }}</h1>
      <p class="mt-4 max-w-[62ch] leading-[1.65] text-gray-900">
        {{ text.portfolio?.subtitle || "Igal projektil on oma lugu. Siin on valik töödest, mida meie liikmed on aastate jooksul ellu viinud." }}
      </p>
    </div>

    <template v-if="featuredProject">
      <Card class="mb-5! grid! gap-4 rounded-none! border-0! bg-white! p-0! md:grid-cols-[1.25fr_1fr]! md:gap-6" variant="default">
        <div class="flex min-h-[220px] items-center justify-center md:min-h-[280px]">
          <template v-if="featuredProject.photo">
            <img
              :src="projectImage(featuredProject)"
              :alt="projectTitle(featuredProject)"
              class="block h-auto max-h-full w-auto max-w-full object-contain object-center shadow-[0_1px_2px_rgba(13,13,13,0.05)]"
              @error="(event) => handleImageError(event, featuredProject.photo)"
            />
          </template><template v-else>
            <div class="grid h-full min-h-[180px] w-full place-items-center text-[0.85rem] text-gray-900">{{ text.portfolio?.placeholder || "Pilt puudub" }}</div>
          </template>
        </div>

        <div class="flex h-full flex-1 flex-col justify-between gap-[clamp(0.75rem,2vw,1.5rem)] p-[clamp(1.5rem,3vw,2.5rem)]">
          <div class="flex flex-col gap-[clamp(0.45rem,1vw,0.8rem)]">
            <h2 class="m-0 text-[clamp(1.45rem,2.7vw,2rem)] leading-[1.2] tracking-[-0.02em]">{{ projectTitle(featuredProject) }}</h2>
            <template v-if="projectDescription(featuredProject)">
              <p class="m-0 text-[0.9rem] leading-[1.6] text-gray-900">{{ projectDescription(featuredProject) }}</p>
            </template>
          </div>
          <template v-if="featuredProject.url">
            <a
              :href="featuredProject.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 font-semibold text-orange-500 hover:underline"
            >
              {{ text.portfolio?.projectLink || "Vaata projekti" }}
              <ExternalLink :size="16" />
            </a>
          </template>
        </div>
      </Card>
    </template>
      <div class="ourwork-grid">
        <template v-for="project in regularProjects">
          <Card variant="default" class="ourwork-grid-card gap-4 rounded-none! border-0! bg-white! p-0!">
            <div class="flex aspect-16/10 items-center justify-center">
              <template v-if="project.photo">
                <img
                  :src="projectImage(project)"
                  :alt="projectTitle(project)"
                  class="block h-auto max-h-full w-auto max-w-full object-contain object-center shadow-[0_1px_2px_rgba(13,13,13,0.05)]"
                  @error="(event) => handleImageError(event, project.photo)"
                />
              </template><template v-else>
                <div class="grid h-full min-h-[180px] w-full place-items-center text-[0.85rem] text-gray-900">{{ text.portfolio?.placeholder || "Pilt puudub" }}</div>
              </template>
            </div>

            <div class="ourwork-card-content flex h-full flex-1 flex-col justify-between gap-[clamp(0.55rem,1vw,0.95rem)] px-5 pb-5 pt-1.5">
              <div class="flex flex-col gap-[clamp(0.4rem,0.9vw,0.75rem)]">
                <h3 class="ourwork-card-title m-0 text-base leading-[1.2] tracking-[-0.02em]">{{ projectTitle(project) }}</h3>
                <template v-if="projectDescription(project)">
                  <p class="ourwork-card-description m-0 text-[0.9rem] leading-[1.6] text-gray-900">{{ projectDescription(project) }}</p>
                </template><template v-else>
                  <p class="ourwork-card-description m-0 text-[0.9rem] leading-[1.6] text-gray-900 italic">{{ text.portfolio?.noDescription || "Kirjeldus lisamisel." }}</p>
                </template>
              </div>

              <template v-if="project.url">
                <a
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 font-semibold text-orange-500 hover:underline"
                >
                  {{ text.portfolio?.projectLink || "Vaata projekti" }}
                  <ExternalLink :size="16" />
                </a>
              </template>
            </div>
          </Card>
        </template>
      </div>
  </Section>
</div>
</template>

<style>
  .ourwork-grid {
    display: grid;
    gap: clamp(0.75rem, 1.5vw, 1.1rem);
    align-items: stretch;
    grid-template-columns: 1fr;
  }

  .ourwork-grid .ourwork-grid-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 0;
    width: 100%;
  }

  @media (min-width: 768px) {
    .ourwork-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .ourwork-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
