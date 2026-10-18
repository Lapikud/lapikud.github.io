<script setup>
  import {
    Section,
    Grid,
  } from "../components/index.js";
  import { computed, onMounted, ref } from "vue";
  import { usePageText, useYaml } from "../lib/index.js";

  const yaml = useYaml();
  const members = ref({ junior: [], senior: [], graduates: [] });
  const text = usePageText("Liikmed");

  onMounted(async () => {
    members.value = await yaml.loadYaml("/_data/members.yml", { junior: [], senior: [], graduates: [] });
  });

  const memberSections = computed(() => [
    { key: "junior", label: text.value.groups?.junior || "Noorliikmed" },
    { key: "senior", label: text.value.groups?.senior || "Vanemliikmed" },
    { key: "graduates", label: text.value.groups?.graduates || "Vilistlased" },
  ]);
</script>

<template>
<div class="safe-area-navbar">
  <Section class="bg-white" padding="large">
    <div class="mb-12">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{{ text.hero?.kicker || "Meist" }}</p>
      <h1 class="mb-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-tight font-medium text-black">
        {{ text.hero?.title || "Liikmed" }}
      </h1>
      <p class="max-w-2xl text-base leading-8 text-black/60">
        {{ text.hero?.description || "" }}
      </p>
    </div>

    <template v-for="(section, idx) in memberSections">
      <template v-if="members[section.key] && members[section.key].length > 0">
        <div :class="idx < memberSections.length - 1 ? 'mb-12' : ''">
          <h2 class="mb-5 border-b border-orange-500/30 pb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            {{ section.label }}
          </h2>
          <Grid :columns="5" :tabletColumns="4" :mobileColumns="2" gap="gap-x-4 gap-y-2">
            <template v-for="member in members[section.key]" :key="member">
              <span class="py-1 text-sm leading-6 text-black/80">{{ member }}</span>
            </template>
          </Grid>
        </div>
      </template>
    </template>
  </Section>
</div>
</template>
