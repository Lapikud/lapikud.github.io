<script>
  import { Section, Stack, Container } from "$components";
  import { onMount, onDestroy } from "svelte";
  import yaml from "js-yaml";
  import { currentLang, getLangText, createPageTextStore } from "$lib";

  let workshops = [];
  const text = createPageTextStore("Workshops");

  onMount(async () => {
    const response = await fetch("/_data/workshops.yml");
    const yamlText = await response.text();
    const parsed = yaml.load(yamlText) || [];
    workshops = parsed.filter((w) => w?.title);
  });

  onDestroy(() => {
    text.destroy();
  });

  function getField(workshop, field) {
    return getLangText(workshop, field, $currentLang);
  }

  function getGalleryClass(count) {
    const classes = {
      1: "grid-cols-1 grid-rows-1",
      2: "grid-cols-2",
      3: "grid-cols-2 grid-rows-2",
      4: "grid-cols-2 grid-rows-2",
    };
    return classes[count] || classes[1];
  }

  function getImageHeightClass(count, index) {
    if (count === 1) return "h-56";
    if (count === 2) return "h-40";
    if (count === 3) {
      return index === 0 ? "h-72 row-span-2" : "h-32";
    }
    if (count === 4) return "h-32";
    return "h-40";
  }
</script>

<div class="safe-area-navbar">
  <!-- Hero Section -->
  <Section bg="bg-black" class="text-white">
      <div class="max-w-2xl">
        <p class="font-dm-mono text-xs uppercase tracking-widest text-orange-500 mb-4">
          {$text["hero"]?.label}
        </p>
        <h1 class="font-syne text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
          {$text["hero"]?.title}
          <em class="block text-orange-500 not-italic"
            >{@html $text["hero"]?.titleHighlight}</em
          >
        </h1>
        <p class="text-sm text-gray-400 max-w-sm leading-relaxed font-space-grotesk font-light">
          {$text["hero"]?.subtitle}
        </p>
      </div>
  </Section>

  <!-- Workshops Content -->
  <Section>
    <Stack gap="lg">
      {#each workshops as workshop, index (index)}
        <div class={`grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 py-16 border-b border-gray-100 ${index === workshops.length - 1 ? "border-b-0" : ""}`}>
          <!-- Gallery -->
          <div
            class={`grid gap-1.5 ${index % 2 === 1 ? "md:order-2" : ""}`}
          >
            <div class={`grid ${getGalleryClass(workshop.gallery)} gap-1.5`}>
              {#each Array(workshop.gallery) as _, i}
                <div
                  class={`bg-gray-100 overflow-hidden flex items-center justify-center ${getImageHeightClass(workshop.gallery, i)}`}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    class="text-gray-300"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              {/each}
            </div>
          </div>

          <!-- Content -->
          <div class={`pt-2 ${index % 2 === 1 ? "md:order-1" : ""}`}>
            <h2 class="font-syne text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {getField(workshop, "title")}
            </h2>
            <p class="text-sm leading-7 text-gray-600 font-space-grotesk font-light mb-7">
              {getField(workshop, "description")}
            </p>
            <div class="flex flex-wrap gap-7">
              <div class="flex flex-col gap-1">
                <span class="font-dm-mono text-xs uppercase tracking-wide text-gray-500">
                  {$text["details"]?.mentor}
                </span>
                <span class="text-sm text-gray-700 font-space-grotesk">
                  {getField(workshop, "mentor")}
                </span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-dm-mono text-xs uppercase tracking-wide text-gray-500">
                  {$text["details"]?.duration}
                </span>
                <span class="text-sm text-gray-700 font-space-grotesk">
                  {getField(workshop, "duration")}
                </span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-dm-mono text-xs uppercase tracking-wide text-gray-500">
                  {$text["details"]?.date}
                </span>
                <span class="text-sm text-gray-700 font-space-grotesk">
                  {getField(workshop, "date")}
                </span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </Stack>
  </Section>
</div>
