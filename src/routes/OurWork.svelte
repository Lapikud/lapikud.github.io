<script>
  import { Section, Grid, Card, Button } from "$components";
  import { onMount, onDestroy } from "svelte";
  import yaml from "js-yaml";
  import { currentLang, getLangText, createPageTextStore } from "$lib";

  import ExternalLink from "lucide-svelte/icons/external-link";

  let projects = [];
  const text = createPageTextStore("OurWork");

  onMount(async () => {
    const response = await fetch("/_data/ourwork.yml");
    const yamlText = await response.text();
    const parsed = yaml.load(yamlText) || [];
    projects = parsed.filter((p) => p?.title);
  });

  onDestroy(() => {
    text.destroy();
  });

  $: featuredProject = projects[0] || null;
  $: regularProjects = projects.slice(1);

  function projectTitle(project) {
    return getLangText(project, "title", $currentLang);
  }

  function projectDescription(project) {
    return getLangText(project, "description", $currentLang);
  }

  function projectImage(project) {
    return project?.photo
      ? `/assets/ourwork-images/optimised/${project.photo}`
      : "";
  }

  function handleImageError(event, photo) {
    event.currentTarget.src = `/assets/ourwork-images/original/${photo}`;
  }

  function openCtaEmail() {
    window.location.href = "mailto:lapikud@lapikud.ee";
  }

  function openCtaContact() {
    window.location.href = "/contact";
  }
</script>

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
        {$text["intro"]?.prefix || "Meie tehtud "}
        <br />
        <span class="text-orange-500">{$text["intro"]?.emphasis || "tööd."}</span>
      </h1>
      <p class="mt-5 max-w-105 text-[0.95rem] leading-[1.7] text-white/45">
        {$text["intro"]?.subtitle || "Valik projekte, mida meie liikmed on teostanud, veebilehtedest mobiilirakendusteni."}
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
          {$text["cta"]?.title || "Alustame koostööd?"}
        </h2>
        <p class="max-w-95 text-[0.88rem] leading-[1.6] text-gray-900/70">
          {$text["cta"]?.description || "Võta ühendust ja arutame, kuidas saame sinu ideed ellu viia!"}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Button
          onClick={openCtaEmail}
          class="gap-2 rounded-none! border-gray-900! bg-gray-900 px-5.5 py-3 text-[0.83rem] font-semibold text-white transition-colors hover:border-gray-800 hover:bg-gray-800"
        >
          {$text["cta"]?.emailButton || "Saada e-kiri"} <span aria-hidden="true">&rarr;</span>
        </Button>
        <Button
          onClick={openCtaContact}
          class="rounded-none! border-gray-900/35! bg-transparent px-5.5 py-3 text-[0.83rem] font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900/6"
        >
          {$text["cta"]?.contactButton || "Kontaktandmed"}
        </Button>
      </div>
    </div>
  </Section>

  <Section padding="large">
    <div class="mb-12">
      <p class="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-orange-500">{$text["portfolio"]?.label || "Tehtud tööd"}</p>
      <h1 class="m-0 max-w-[20ch] text-[clamp(1.9rem,4vw,3.15rem)] leading-[1.08] tracking-[-0.03em]">{$text["portfolio"]?.title || "Projektid, mis räägivad enda eest."}</h1>
      <p class="mt-4 max-w-[62ch] leading-[1.65] text-gray-900">
        {$text["portfolio"]?.subtitle || "Igal projektil on oma lugu. Siin on valik töödest, mida meie liikmed on aastate jooksul ellu viinud."}
      </p>
    </div>

    {#if featuredProject}
      <Card class="mb-5! grid! overflow-hidden! rounded-none! border-0! bg-white! p-0! ring-1 ring-gray-200 md:grid-cols-[1.25fr_1fr]!" variant="default">
        <div class="min-h-[220px] overflow-hidden bg-gray-100/70 p-2 md:min-h-[280px]">
          {#if featuredProject.photo}
            <img
              src={projectImage(featuredProject)}
              alt={projectTitle(featuredProject)}
              class="block h-full w-full border border-gray-200 bg-white object-contain object-center shadow-[0_1px_2px_rgba(13,13,13,0.05)]"
              on:error={(event) => handleImageError(event, featuredProject.photo)}
            />
          {:else}
            <div class="grid h-full min-h-[180px] w-full place-items-center text-[0.85rem] text-gray-900">{$text["portfolio"]?.placeholder || "Pilt puudub"}</div>
          {/if}
        </div>

        <div class="flex flex-col justify-center gap-2 p-[clamp(1.5rem,3vw,2.5rem)]">
          <h2 class="m-0 text-[clamp(1.45rem,2.7vw,2rem)] leading-[1.2] tracking-[-0.02em]">{projectTitle(featuredProject)}</h2>
          {#if projectDescription(featuredProject)}
            <p class="m-0 text-[0.9rem] leading-[1.6] text-gray-900">{projectDescription(featuredProject)}</p>
          {/if}
          {#if featuredProject.url}
            <a
              href={featuredProject.url}
              target="_blank"
              rel="noopener noreferrer"
              class="mt-0.5 inline-flex w-fit items-center gap-1.5 font-semibold text-orange-500 hover:underline"
            >
              {$text["portfolio"]?.projectLink || "Vaata projekti"}
              <ExternalLink size={16} />
            </a>
          {/if}
        </div>
      </Card>
    {/if}
      <div class="ourwork-grid">
        {#each regularProjects as project}
          <Card variant="default" class="ourwork-grid-card rounded-none! border-0! bg-white! p-0!">
            <div class="aspect-16/10 overflow-hidden bg-gray-100/70 p-2">
              {#if project.photo}
                <img
                  src={projectImage(project)}
                  alt={projectTitle(project)}
                  class="block h-full w-full border border-gray-200 bg-white object-contain object-center shadow-[0_1px_2px_rgba(13,13,13,0.05)]"
                  on:error={(event) => handleImageError(event, project.photo)}
                />
              {:else}
                <div class="grid h-full min-h-[180px] w-full place-items-center text-[0.85rem] text-gray-900">{$text["portfolio"]?.placeholder || "Pilt puudub"}</div>
              {/if}
            </div>

            <div class="ourwork-card-content flex h-full flex-1 flex-col gap-2 p-5">
              <h3 class="ourwork-card-title m-0 text-base leading-[1.2] tracking-[-0.02em]">{projectTitle(project)}</h3>
              {#if projectDescription(project)}
                <p class="ourwork-card-description m-0 text-[0.9rem] leading-[1.6] text-gray-900">{projectDescription(project)}</p>
              {:else}
                <p class="ourwork-card-description m-0 text-[0.9rem] leading-[1.6] text-gray-900 italic">{$text["portfolio"]?.noDescription || "Kirjeldus lisamisel."}</p>
              {/if}

              {#if project.url}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 font-semibold text-orange-500 hover:underline"
                >
                  {$text["portfolio"]?.projectLink || "Vaata projekti"}
                  <ExternalLink size={16} />
                </a>
              {/if}
            </div>
          </Card>
        {/each}
      </div>
  </Section>
</div>

<style>
  .ourwork-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    justify-content: center;
  }

  .ourwork-grid :global(.ourwork-grid-card) {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 0;
    width: 100%;
  }

  .ourwork-card-content {
    min-height: 10.25rem;
  }

  .ourwork-card-title {
    min-height: calc(1.2em * 2);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .ourwork-card-description {
    min-height: calc(1.6em * 3);
    display: -webkit-box;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .ourwork-grid :global(.ourwork-grid-card) {
      width: calc((100% - 1px) / 2);
    }
  }

  @media (min-width: 1200px) {
    .ourwork-grid :global(.ourwork-grid-card) {
      width: calc((100% - 2px) / 3);
    }
  }
</style>
