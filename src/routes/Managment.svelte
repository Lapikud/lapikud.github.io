<script>
  import {
    Section,
    Grid,
    Container,
    Image,
  } from "$components";
  import { onMount, onDestroy } from "svelte";
  import yaml from "js-yaml";
  import { currentLang, getLangText, createPageTextStore } from "$lib";
  import { getOptimisedImagePath, getOptimisedImageFallback } from "$lib/imageHelpers.js";
  import Mail from "lucide-svelte/icons/mail";
  import Phone from "lucide-svelte/icons/phone";

  let currentManagement = [];
  let pastManagement = [];
  let loading = true;
  let loadError = false;
  const text = createPageTextStore("Management");

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

  onMount(async () => {
    try {
      const currentRes = await fetch('/_data/management.yml');
      const currentYaml = await currentRes.text();
      currentManagement = yaml.load(currentYaml) || [];

      const pastRes = await fetch('/_data/past_management.yml');
      const pastYaml = await pastRes.text();
      pastManagement = yaml.load(pastYaml) || [];
    } catch (error) {
      console.error('Error loading management data:', error);
      loadError = true;
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    text.destroy();
  });
</script>

<div class="safe-area-navbar">
<Section
  padding="none"
  fullWidth={true}
  contentClass="!px-0 !py-0"
  class="overflow-hidden text-white"
>
  <div class="relative overflow-hidden bg-linear-to-b bg-gray-900 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[rgba(240,148,29,0.16)] after:content-['']">
    <div class="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full border border-[rgba(240,148,29,0.12)]" aria-hidden="true"></div>
    <div class="pointer-events-none absolute -bottom-20 right-16 h-52 w-52 rounded-full border border-[rgba(240,148,29,0.08)]" aria-hidden="true"></div>

    <Container class="relative z-10 py-[clamp(3rem,8vw,6rem)]">
      <div class="max-w-4xl">
        <p class="mb-4 text-xs tracking-[0.16em] uppercase text-orange-500">{$text.hero?.eyebrow || "MTÜ Lapikud"}</p>
        <h1 class="m-0 text-[clamp(2.4rem,6vw,4.2rem)] font-bold">{$text.hero?.title || "Management"}</h1>
        <p class="mt-4 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.25rem)] text-white/75">{$text.hero?.intro || "People who keep the organisation moving forward."}</p>
      </div>
    </Container>
  </div>
</Section>

<!-- Current Management Section -->
<Section padding="large">
  <h1 class="m-0 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.12] tracking-[-0.03em] mb-10">{$text.current?.label || "Current board"}</h1>
    <Grid min="500px">
      {#each currentManagement as member (member.name)}
        <div class="flex flex-col sm:flex-row gap-6 items-start">
          <div class="w-full sm:w-auto sm:max-w-[200px] aspect-square shrink-0">
            <picture>
              <source srcset={getOptimisedImagePath("management-images", member.photo, "webp")} type="image/webp" />
              <img
                src={getOptimisedImageFallback("management-images", member.photo)}
                alt={member.name}
                class="w-full h-full object-cover rounded-md"
              />
            </picture>
          </div>
          <div class="flex flex-col gap-2 grow">
            <h3 class="text-2xl font-medium">{member.name}</h3>
            <p class="text-base text-gray-700">
              {getLangText(member, 'role', $currentLang)} - {getLangText(member, 'subrole', $currentLang)}
            </p>
            <a
              href="mailto:{member.email}"
              class="text-base flex items-center gap-2 text-orange-500 hover:opacity-80 transition"
            >
              <Mail size={18} />{member.email}
            </a>
            <a
              href="tel:{member.phone}"
              class="text-base flex items-center gap-2 text-orange-500 hover:opacity-80 transition"
            >
              <Phone size={18} />{member.phone}
            </a>
          </div>
        </div>
      {/each}
    </Grid>
</Section>

<!-- Past Management Section -->
<Section padding="large">
    <div class="mb-7 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h2 class="m-0 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.12] tracking-[-0.03em]">{$text.history?.label || "People who have led the organisation over time"}</h2>
        <p class="mt-2 text-[0.98rem] text-[rgba(13,13,13,0.62)]">{$text.history?.hint || "Thanks to everyone who has helped guide Lapikud"}</p>
      </div>
    </div>

    {#if loading}
      <p class="m-0 py-4 text-black">{$text.loading || "Loading data..."}</p>
    {:else if loadError}
      <p class="m-0 py-4 text-red-500">{$text.error || "Failed to load the management data."}</p>
    {:else}
      <div class="flex flex-col gap-10">
        {#each pastManagement as yearData (yearData.year)}
          <section class="mb-5">
            <div class="mb-4 flex w-full flex-col items-start gap-3 border-b border-orange-500 pb-3">
              <div class="flex items-baseline gap-3 whitespace-nowrap">
                <span class="text-[1.6rem] leading-none font-bold text-orange-500 tracking-[-0.04em]">{parseYearLabel(yearData.year).year}</span>
                {#if parseYearLabel(yearData.year).tag}
                  <span class="rounded-full px-[0.55rem] py-[0.2rem] text-[0.64rem] tracking-widest uppercase self-center text-orange-500">{parseYearLabel(yearData.year).tag}</span>
                {/if}
              </div>
            </div>

            <Grid min="150px" mobileColumns={2} gap="gap-5" class="items-start">
              {#each yearData.members as member (member.name)}
                <div class="group flex flex-col items-center gap-2.5 text-center">
                  <div class="h-24 w-24 overflow-hidden rounded-[10px] bg-linear-to-br outline-2 outline-transparent outline-offset-2 transition [@media(min-width:769px)]:h-28 [@media(min-width:769px)]:w-28">
                    {#if member.image}
                      <Image
                        webpSrc={getOptimisedImagePath("past-management-images", member.image, "webp")}
                        src={getOptimisedImageFallback("past-management-images", member.image)}
                        alt={member.name}
                        objectFit="cover"
                        class="block h-full w-full"
                        pictureClass="h-full w-full"
                      />
                    {:else}
                      <div class="grid h-full w-full place-items-center text-sm font-bold text-orange-600">{getInitials(member.name)}</div>
                    {/if}
                  </div>
                  <span class="max-w-[14ch] text-[0.86rem] font-semibold leading-[1.35] text-gray-900">{member.name}</span>
                </div>
              {/each}
            </Grid>
          </section>
        {/each}
      </div>
    {/if}
</Section>
</div>
