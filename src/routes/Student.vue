<script setup>
  import {
    Section,
    Button,
    Image,
  } from "../components/index.js";
  import { computed, onMounted, ref } from 'vue';
  import { useRouter, usePageText, useImage } from "../lib/index.js";
  import IconBraces from "~icons/keyline-icons/braces-duotone";
  import IconWrench from "~icons/keyline-icons/wrench-duotone";
  import IconMegaphone from "~icons/keyline-icons/megaphone-duotone";

  const router = useRouter();
  const image = useImage();
  const text = usePageText("Student");
  const joinFormUrl = "https://pilves.lapikud.ee/apps/forms/s/WXed8sbG2s45GMKGAiXCemgE";

  const teamIcons = [IconBraces, IconWrench, IconMegaphone];

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
    icon: teamIcons[index % teamIcons.length],
    anchor: (team.title || '').toLowerCase(),
  })));
</script>

<template>
<div class="safe-area-navbar">
  <Section class="overflow-hidden bg-gray-900" padding="none" :fullWidth="true" contentClass="relative !px-0">
    <div class="relative overflow-hidden py-[3rem]">
      <div class="absolute inset-y-0 right-0 w-2/5 sm:w-1/2 [mask-image:linear-gradient(to_right,transparent,black)]" aria-hidden="true">
        <Image
          :webpSrc="image.getOptimisedImagePath('home-page-images', 'event_2', 'webp')"
          :src="image.getOptimisedImageFallback('home-page-images', 'event_2')"
          alt=""
          objectFit="cover"
          class="h-full w-full max-w-none! object-[30%] sm:object-center"
          pictureClass="block h-full w-full"
        />
        <div class="absolute inset-0 bg-black/45" aria-hidden="true"></div>
      </div>

      <div class="relative z-10 mx-auto w-full max-w-(--page-max-width) px-(--page-padding-inline)">
        <div class="relative z-10 w-full max-w-3xl">
          <h1 class="mb-6 text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.03] font-medium text-white">
            {{ text.hero?.title || '' }}<br />
            <span class="italic text-orange-500">{{ text.hero?.emphasis || '' }}</span>
          </h1>
          <p class="mb-10 max-w-2xl text-base leading-8 text-white/85">
            {{ text.hero?.description || '' }}
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <Button :onClick="scrollToJoin" class="border-transparent bg-orange-500 px-8 py-3 text-sm font-semibold text-white hover:opacity-90">
              {{ text.hero?.cta || '' }}
            </Button>
            <a href="#tiimid" @click.prevent="scrollToUnderHero" class="text-sm text-white/75">{{ text.hero?.aside || '' }}</a>
          </div>
        </div>
      </div>

      <div class="pointer-events-none select-none absolute right-0 bottom-0 translate-y-1/4 text-[clamp(8rem,20vw,14rem)] leading-none italic text-white/4">
        {{ text.hero?.bgWord || "Lapikud" }}
      </div>
    </div>
  </Section>

  <Section class="bg-gray-900" padding="large">
    <div class="max-w-3xl">
      <h2 class="mb-8 text-[clamp(2rem,4vw,3rem)] leading-tight font-medium text-white">
        {{ text.activities?.title || '' }}
      </h2>
      <div class="flex flex-col gap-6">
        <template v-for="(paragraph, i) in text.activities?.paragraphs || []" :key="i">
          <p class="text-base leading-8 text-white/85">
            <template v-for="(segment, j) in paragraph" :key="j">
              <a
                v-if="segment.href"
                :href="segment.href"
                class="font-medium text-orange-400 underline-offset-4 hover:underline"
              >{{ segment.text }}</a>
              <template v-else>{{ segment.text }}</template>
            </template>
          </p>
        </template>
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

    <div class="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
      <template v-for="team in teamSections" :key="team.title">
        <article :id="team.anchor" class="group flex scroll-mt-(--navbar-offset) flex-col gap-5 rounded-xl border border-black/10 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(13,13,13,0.10)] md:gap-8 md:p-10">
          <div class="flex items-center gap-4">
            <component :is="team.icon" class="size-12 shrink-0 text-orange-500/70" aria-hidden="true" />
            <div>
              <h3 class="mb-1 text-3xl font-medium leading-tight text-black">{{ team.title }}</h3>
              <p class="text-base leading-6 text-black/55">{{ team.short || '' }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-3.5">
            <template v-for="(paragraph, i) in team.about || []" :key="i">
              <p class="text-[0.95rem] leading-7 text-black/80">{{ paragraph }}</p>
            </template>
          </div>

          <div v-if="team.tags?.length" class="flex flex-wrap gap-2">
            <span
              v-for="tag in team.tags"
              :key="tag"
              class="rounded-full border border-orange-500/30 px-3.5 py-1.5 text-sm font-medium text-orange-600"
            >{{ tag }}</span>
          </div>

          <div class="mt-auto flex flex-col gap-5 border-t border-black/8 pt-5">
            <div>
              <h4 class="mb-3 text-[0.7rem] font-semibold uppercase tracking-widest text-black/50">{{ team.whatTitle || '' }}</h4>
              <ul class="space-y-1.5">
                <template v-for="item in team.what || []" :key="item">
                  <li class="relative pl-4 text-sm leading-6 text-black/80 before:absolute before:left-0 before:top-0.5 before:text-[0.65rem] before:text-orange-500 before:content-['—']">
                    {{ item }}
                  </li>
                </template>
              </ul>
            </div>

            <div>
              <h4 class="mb-3 text-[0.7rem] font-semibold uppercase tracking-widest text-black/50">{{ team.eventsTitle || '' }}</h4>
              <ul class="space-y-1.5">
                <template v-for="event in team.events || []" :key="event">
                  <li class="relative pl-4 text-sm leading-6 text-black/80 before:absolute before:left-0 before:top-0.5 before:text-[0.65rem] before:text-black/40 before:content-['↻']">
                    {{ event }}
                  </li>
                </template>
              </ul>
            </div>

            <div v-if="team.links?.length" class="flex flex-wrap gap-x-5 gap-y-2 pt-1">
              <a
                v-for="link in team.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-semibold text-orange-500 underline-offset-4 hover:underline"
              >
                {{ link.label }} ↗
              </a>
            </div>
          </div>
        </article>
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
</div>
</template>
