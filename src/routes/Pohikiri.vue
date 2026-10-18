<script setup>
  import {
    Section,
  } from "../components/index.js";

  import { onMounted, ref } from 'vue';
  import { usePageText, useYaml } from "../lib/index.js";

  const text = usePageText("Pohikiri");
  const yaml = useYaml();

  const pohikiri = ref({ chapters: [], updated: '' });

  onMounted(async () => {
    pohikiri.value = await yaml.loadYaml('/_data/pohikiri.yml', { chapters: [], updated: '' });
  });
</script>

<template>
<div class="safe-area-navbar">
  <Section padding="large">
    <article class="mx-auto max-w-3xl">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{{ text.kicker || '' }}</p>
      <h1 class="mb-4 text-[clamp(2.5rem,6vw,4rem)] leading-tight font-medium text-black">{{ text.title || '' }}</h1>
      <p class="mb-10 max-w-2xl text-base leading-8 text-black/60">{{ text.description || '' }}</p>

      <div class="flex flex-col gap-10 border-t border-black/10 pt-10 md:gap-12">
        <section v-for="chapter in pohikiri.chapters || []" :key="chapter.title" class="flex flex-col gap-4">
          <h2 class="text-xl font-semibold text-black md:text-2xl">{{ chapter.title }}</h2>
          <div class="flex flex-col gap-3">
            <template v-for="(item, i) in chapter.items || []" :key="i">
              <p v-if="item.text" class="text-sm leading-7 text-black/80 md:text-[0.95rem]">{{ item.text }}</p>
              <ul v-else-if="item.list" class="flex flex-col gap-1.5 pl-5">
                <li v-for="li in item.list" :key="li" class="list-disc text-sm leading-7 text-black/80 marker:text-black/40 md:text-[0.95rem]">{{ li }}</li>
              </ul>
            </template>
          </div>
        </section>
      </div>

      <p v-if="pohikiri.updated" class="mt-12 border-t border-black/10 pt-6 text-sm text-black/50">{{ pohikiri.updated }}</p>
    </article>
  </Section>
</div>
</template>
