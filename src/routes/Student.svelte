<script>
  import {
    Section,
    Grid,
    Button,
  } from "$components";
  import { onMount, onDestroy } from "svelte";
  import yaml from 'js-yaml';
  import { createPageTextStore } from "$lib";

  let members = { junior: [], senior: [] };
  const text = createPageTextStore("Student");
  const joinFormUrl = "https://pilves.lapikud.ee/apps/forms/s/WXed8sbG2s45GMKGAiXCemgE";
  
  onMount(async () => {
    try {
      const response = await fetch('/_data/members.yml');
      const yamlText = await response.text();
      members = yaml.load(yamlText) || { junior: [], senior: [] };
    } catch {
      members = { junior: [], senior: [] };
    }
  });

  onDestroy(() => {
    text.destroy();
  });

  const scrollToJoin = () => {
    document.getElementById("liitu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openJoinForm = () => {
    window.open(joinFormUrl, "_blank", "noopener,noreferrer");
  };

  $: teamSections = ($text["teams"]?.items || []).map((team, index) => ({
    ...team,
    number: team.number || `0${index + 1}`,
  }));

  $: memberSections = [
    { key: "junior", label: $text["members"]?.junior || "" },
    { key: "senior", label: $text["members"]?.senior || "" },
    { key: "graduates", label: $text["members"]?.graduates || "" },
  ];
</script>

<div class="safe-area-navbar">
  <Section class="overflow-hidden bg-[#0f0f0f]" padding="none" fullWidth={true} contentClass="relative !px-0">
    <div class="relative overflow-hidden py-[clamp(3rem,8vw,6rem)]">
      <div class="relative z-10 mx-auto w-full max-w-(--page-max-width) px-(--page-padding-inline)">
        <div class="relative z-10 w-full max-w-3xl">
          <h1 class="mb-6 text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.03] font-medium text-white">
            {$text["hero"]?.title || ""}<br />
            <span class="italic text-orange-500">{$text["hero"]?.emphasis || ""}</span>
          </h1>
          <p class="mb-10 max-w-2xl text-base leading-8 text-white/55">
            {$text["hero"]?.description || ""}
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <Button onClick={scrollToJoin} class="border-transparent bg-orange-500 px-8 py-3 text-sm font-semibold text-white hover:opacity-90">
              {$text["hero"]?.cta || ""}
            </Button>
            <span class="text-sm text-white/40">{$text["hero"]?.aside || ""}</span>
          </div>
        </div>
      </div>

      <div class="pointer-events-none select-none absolute right-0 bottom-0 translate-y-1/4 text-[clamp(8rem,20vw,14rem)] leading-none italic text-white/4">
        {$text["hero"]?.bgWord || "Lapikud"}
      </div>
    </div>
  </Section>

  <div class="mx-(--page-padding-inline) border-t border-orange-500/30"></div>

  <Section id="tiimid" class="bg-white" padding="large">
    <div class="mb-14">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{$text["teams"]?.kicker || ""}</p>
      <h2 class="mb-4 max-w-4xl text-[clamp(2rem,4vw,3rem)] leading-tight font-medium text-black">
        {$text["teams"]?.title || ""}
      </h2>
      <p class="max-w-2xl text-base leading-8 text-black/60">
        {$text["teams"]?.subtitle || ""}
      </p>
    </div>

    <div class="flex flex-col">
      {#each teamSections as team, index}
        <div class="grid border-t border-black/10 py-12 last:border-b xl:grid-cols-[240px_1fr_1fr]">
          <div class="pr-10">
            <h3 class="my-3 text-4xl leading-none font-medium text-black">{team.title}</h3>
            <p class="text-sm leading-5 text-black/55">{team.short || ""}</p>
          </div>

          <div class="pt-8 xl:border-l xl:border-black/10 xl:px-12 xl:pt-0">
            {#each team.about || [] as paragraph}
              <p class="mb-5 text-[0.95rem] leading-8 text-black/80 last:mb-0">{paragraph}</p>
            {/each}
            <div class="mt-6 flex flex-wrap gap-2">
              {#each team.tags || [] as tag}
                <span class="px-3 py-1.5 text-xs font-medium text-orange-500">{tag}</span>
              {/each}
            </div>
          </div>

          <div class="pt-8 xl:border-l xl:border-black/10 xl:pl-12 xl:pt-0">
            <h4 class="mb-4 text-xs font-semibold uppercase tracking-widest text-black">{team.whatTitle || ""}</h4>
            <ul class="mb-8 space-y-2">
              {#each team.what || [] as item}
                <li class="relative pl-4 text-sm leading-6 text-black/80 before:absolute before:left-0 before:top-0.5 before:text-[0.65rem] before:text-orange-500 before:content-['—']">
                  {item}
                </li>
              {/each}
            </ul>

            <h4 class="mb-4 text-xs font-semibold uppercase tracking-widest text-black">{team.eventsTitle || ""}</h4>
            <ul class="space-y-2">
              {#each team.events || [] as event}
                <li class="relative pl-4 text-sm leading-6 text-black/80 before:absolute before:left-0 before:top-0.5 before:text-[0.65rem] before:text-black/50 before:content-['↻']">
                  {event}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </Section>

  <Section id="liitu" class="overflow-hidden bg-orange-500" padding="large">
    <div class="relative grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_auto]">
      <div class="pointer-events-none select-none absolute -right-6 -top-10 text-[clamp(7rem,16vw,12rem)] leading-none italic text-black/10">
        {$text["join"]?.bgWord || ""}
      </div>

      <div class="relative">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-black/45">{$text["join"]?.kicker || ""}</p>
        <h2 class="mb-4 text-[clamp(2rem,4vw,3.3rem)] leading-tight font-medium text-black">
          {$text["join"]?.title || ""}<br />{$text["join"]?.titleLine2 || ""}
        </h2>
        <p class="max-w-2xl text-base leading-8 text-black/70">
          {$text["join"]?.description || ""}
        </p>
      </div>

      <div class="relative">
        <Button onClick={openJoinForm} class="border-transparent bg-black px-9 py-3 text-base font-semibold text-white hover:opacity-90">
          {$text["join"]?.cta || ""}
        </Button>
      </div>
    </div>
  </Section>

  <div class="mx-(--page-padding-inline) border-t border-black/10"></div>

  <Section id="liikmed" class="bg-[#f7f6f3]" padding="large">
    <div class="mb-10">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{$text["members"]?.kicker || ""}</p>
      <h2 class="text-[clamp(2rem,3.6vw,2.9rem)] leading-tight font-medium text-black">
        {$text["members"]?.title || ""}
      </h2>
    </div>

    {#each memberSections as section, idx}
      {#if members[section.key] && members[section.key].length > 0}
        <div class={idx < memberSections.length - 1 ? "mb-12" : ""}>
          <h3 class="mb-5 border-b border-orange-500/30 pb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            {section.label}
          </h3>
          <Grid columns={5} tabletColumns={4} mobileColumns={2} gap="gap-x-4 gap-y-2">
            {#each members[section.key] as member}
              <span class="py-1 text-sm leading-6 text-black/80">{member}</span>
            {/each}
          </Grid>
        </div>
      {/if}
    {/each}
  </Section>
</div>
