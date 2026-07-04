<script setup>
  import {
    Section,
    Grid,
    Button,
  } from "../components/index.js";
  import { computed, onMounted, ref } from 'vue';
  import { loadYaml } from '../lib/yaml.js';
  import { usePageText } from "../lib/index.js";

  const members = ref({ junior: [], senior: [] });
  const text = usePageText("Student");
  const joinFormUrl = "https://pilves.lapikud.ee/apps/forms/s/WXed8sbG2s45GMKGAiXCemgE";

  onMounted(async () => {
    members.value = await loadYaml('/_data/members.yml', { junior: [], senior: [] });
  });

  const scrollToJoin = () => {
    document.getElementById("liitu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToUnderHero = () => {
    document.getElementById("tiimid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openJoinForm = () => {
    window.open(joinFormUrl, "_blank", "noopener,noreferrer");
  };

  const teamSections = computed(() => (text.value.teams?.items || []).map((team, index) => ({
    ...team,
    number: team.number || `0${index + 1}`,
  })));

  const memberSections = computed(() => [
    { key: "junior", label: text.value.members?.junior || '' },
    { key: "senior", label: text.value.members?.senior || '' },
    { key: "graduates", label: text.value.members?.graduates || '' },
  ]);
</script>

<template>
<div class="safe-area-navbar">
  <Section class="overflow-hidden bg-gray-900" padding="none" :fullWidth="true" contentClass="relative !px-0">
    <div class="relative overflow-hidden py-[3rem]">
      <div class="relative z-10 mx-auto w-full max-w-(--page-max-width) px-(--page-padding-inline)">
        <div class="relative z-10 w-full max-w-3xl">
          <h1 class="mb-6 text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.03] font-medium text-white">
            {{ text.hero?.title || '' }}<br />
            <span class="italic text-orange-500">{{ text.hero?.emphasis || '' }}</span>
          </h1>
          <p class="mb-10 max-w-2xl text-base leading-8 text-white/55">
            {{ text.hero?.description || '' }}
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <Button :onClick="scrollToJoin" class="border-transparent bg-orange-500 px-8 py-3 text-sm font-semibold text-white hover:opacity-90">
              {{ text.hero?.cta || '' }}
            </Button>
            <a href="#tiimid" @click.prevent="scrollToUnderHero" class="text-sm text-white/40">{{ text.hero?.aside || '' }}</a>
          </div>
        </div>
      </div>

      <div class="pointer-events-none select-none absolute right-0 bottom-0 translate-y-1/4 text-[clamp(8rem,20vw,14rem)] leading-none italic text-white/4">
        {{ text.hero?.bgWord || "Lapikud" }}
      </div>
    </div>
  </Section>

  <div class="mx-(--page-padding-inline) border-t border-orange-500/30"></div>

  <Section id="tiimid" class="bg-white" padding="large">
    <div class="mb-14">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{{ text.teams?.kicker || '' }}</p>
      <h2 class="mb-4 max-w-4xl text-[clamp(2rem,4vw,3rem)] leading-tight font-medium text-black">
        {{ text.teams?.title || '' }}
      </h2>
      <p class="max-w-2xl text-base leading-8 text-black/60">
        {{ text.teams?.subtitle || '' }}
      </p>
    </div>

    <div class="flex flex-col">
      <template v-for="(team, index) in teamSections">
        <div class="grid border-t border-black/10 py-12 last:border-b xl:grid-cols-[240px_1fr_1fr]">
          <div class="pr-10">
            <h3 class="my-3 text-4xl leading-none font-medium text-black">{{ team.title }}</h3>
            <p class="text-sm leading-5 text-black/55">{{ team.short || '' }}</p>
          </div>

          <div class="pt-8 xl:border-l xl:border-black/10 xl:px-12 xl:pt-0">
            <template v-for="paragraph in team.about || []">
              <p class="mb-5 text-[0.95rem] leading-8 text-black/80 last:mb-0">{{ paragraph }}</p>
            </template>
            <div class="mt-6 flex flex-wrap gap-2">
              <template v-for="tag in team.tags || []">
                <span class="px-3 py-1.5 text-xs font-medium text-orange-500">{{ tag }}</span>
              </template>
            </div>
          </div>

          <div class="pt-8 xl:border-l xl:border-black/10 xl:pl-12 xl:pt-0">
            <h4 class="mb-4 text-xs font-semibold uppercase tracking-widest text-black">{{ team.whatTitle || '' }}</h4>
            <ul class="mb-8 space-y-2">
              <template v-for="item in team.what || []">
                <li class="relative pl-4 text-sm leading-6 text-black/80 before:absolute before:left-0 before:top-0.5 before:text-[0.65rem] before:text-orange-500 before:content-['—']">
                  {{ item }}
                </li>
              </template>
            </ul>

            <h4 class="mb-4 text-xs font-semibold uppercase tracking-widest text-black">{{ team.eventsTitle || '' }}</h4>
            <ul class="space-y-2">
              <template v-for="event in team.events || []">
                <li class="relative pl-4 text-sm leading-6 text-black/80 before:absolute before:left-0 before:top-0.5 before:text-[0.65rem] before:text-black/50 before:content-['↻']">
                  {{ event }}
                </li>
              </template>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </Section>

  <Section id="liitu" class="overflow-hidden bg-orange-500" padding="large">
    <div class="relative grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_auto]">
      <div class="pointer-events-none select-none absolute -right-6 -top-10 text-[clamp(7rem,16vw,12rem)] leading-none italic text-black/10">
        {{ text.join?.bgWord || '' }}
      </div>

      <div class="relative">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-black/45">{{ text.join?.kicker || '' }}</p>
        <h2 class="mb-4 text-[clamp(2rem,4vw,3.3rem)] leading-tight font-medium text-black">
          {{ text.join?.title || '' }}<br />{{ text.join?.titleLine2 || '' }}
        </h2>
        <p class="max-w-2xl text-base leading-8 text-black/70">
          {{ text.join?.description || '' }}
        </p>
      </div>

      <div class="relative">
        <Button :onClick="openJoinForm" class="border-transparent bg-black px-9 py-3 text-base font-semibold text-white hover:opacity-90">
          {{ text.join?.cta || '' }}
        </Button>
      </div>
    </div>
  </Section>

  <div class="mx-(--page-padding-inline) border-t border-black/10"></div>

  <Section id="liikmed" class="bg-[#f7f6f3]" padding="large">
    <div class="mb-10">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{{ text.members?.kicker || '' }}</p>
      <h2 class="text-[clamp(2rem,3.6vw,2.9rem)] leading-tight font-medium text-black">
        {{ text.members?.title || '' }}
      </h2>
    </div>

    <template v-for="(section, idx) in memberSections">
      <template v-if="members[section.key] && members[section.key].length > 0">
        <div :class="idx < memberSections.length - 1 ? 'mb-12' : ''">
          <h3 class="mb-5 border-b border-orange-500/30 pb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            {{ section.label }}
          </h3>
          <Grid :columns="5" :tabletColumns="4" :mobileColumns="2" gap="gap-x-4 gap-y-2">
            <template v-for="member in members[section.key]">
              <span class="py-1 text-sm leading-6 text-black/80">{{ member }}</span>
            </template>
          </Grid>
        </div>
      </template>
    </template>
  </Section>
</div>
</template>
