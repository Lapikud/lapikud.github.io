<script setup>
  import {
    Section,
    Grid,
    Svg,
    Button,
  } from "../components/index.js";
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { useRouter, usePageText, useImage, useYaml } from "../lib/index.js";

  import * as maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  // Vite serves the worker as an asset; without this, maplibre resolves it
  // relative to import.meta.url, which 404s under the dev optimizer
  import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';

  maplibregl.setWorkerUrl(maplibreWorkerUrl);
  import IconClock from "~icons/keyline-icons/clock-duotone";
  import IconMapPin from "~icons/keyline-icons/map-pin-duotone";
  import IconScanSearch from "~icons/keyline-icons/scan-search-duotone";
  import IconBroom from "~icons/keyline-icons/broom-duotone";
  import IconTerminal from "~icons/keyline-icons/terminal-duotone";
  import IconDownload from "~icons/keyline-icons/download-duotone";
  import IconCpu from "~icons/keyline-icons/cpu-duotone";
  import IconAlert from "~icons/keyline-icons/alert-duotone";
  import IconBuildings from "~icons/keyline-icons/buildings-duotone";
  import IconHeartSparkles from "~icons/keyline-icons/heart-sparkles-duotone";
  import IconMail from "~icons/keyline-icons/mail-duotone";
  import IconPhone from "~icons/keyline-icons/phone-duotone";
  import IconMessage from "~icons/keyline-icons/message-duotone";

  // Marker icons inlined as SVG (map markers render outside Vue)
  const markerSvg = {
    location: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="currentColor" fill-opacity=".4" d="M18.708204 16L12.745356 22.666667C12.555648 22.878767 12.284562 23 12 23C11.715438 23 11.444352 22.878767 11.254644 22.666667L5.291796 16C3.815931 14.349933 3 12.213797 3 10C3 5.029437 7.029437 1 12 1C16.970563 1 21 5.029437 21 10C21 12.213797 20.184069 14.349933 18.708204 16Z" stroke="none"/><path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.3431 10.3431 7 12 7C13.6569 7 15 8.3431 15 10Z"/></g></svg>',
    bus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 2L17 2C18.6569 2 20 3.3431 20 5L20 15C20 16.6569 18.6569 18 17 18L7 18C5.3431 18 4 16.6569 4 15L4 5C4 3.3431 5.3431 2 7 2ZM4 9L20 9M4 5L2 5M20 5L22 5M7 18L5 22M17 18L19 22"/><path fill="currentColor" d="M10 13.5C10 14.3284 9.3284 15 8.5 15C7.6716 15 7 14.3284 7 13.5C7 12.6716 7.6716 12 8.5 12C9.3284 12 10 12.6716 10 13.5ZM17 13.5C17 14.3284 16.3284 15 15.5 15C14.6716 15 14 14.3284 14 13.5C14 12.6716 14.6716 12 15.5 12C16.3284 12 17 12.6716 17 13.5Z" stroke="none"/></g></svg>',
  };

  function createMarkerIcon(type) {
    const template = document.createElement('template');
    template.innerHTML = markerSvg[type];
    const svg = template.content.firstElementChild;
    svg.setAttribute('aria-hidden', 'true');
    return svg;
  }

  // Initialize composables
  const router = useRouter();
  const image = useImage();
  const yaml = useYaml();

  // Images
  const helpdeskbg = image.getHeroImageFallback("helpdesk-page-images", "helpdesk_bg");
  const helpdeskbgWebpSet = image.getHeroImageSrcSet("helpdesk-page-images", "helpdesk_bg");
  const helpdesk = image.getRootAssetPath("helpdesk-page-images", "helpdesk-on-black.png");

  // Icons for the service rows (index-aligned with the locale list)
  const serviceIcons = [IconScanSearch, IconBroom, IconTerminal, IconDownload, IconCpu];

  // Icons for the pricing notes (index-aligned with the locale list)
  const noteIcons = [IconAlert, IconBuildings, IconHeartSparkles];

  // Icons for the contact rows (index-aligned with the locale list)
  const contactIcons = [IconMail, IconPhone, IconMessage];

  // Lapikud Facebook page
  const facebookUrl = "https://www.facebook.com/Lapikud";

  const openFacebook = () => {
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  // Coordinates for Akadeemia tee 5, 12616 Tallinn [longitude, latitude]
  const center = [24.66887400515207, 59.396427975093935];
  // Coordinates for Keemia bus stop [longitude, latitude]
  const keemiaBusStop = [24.668325396145953, 59.397074517662276];
  // Coordinates for Tehnikaülikool bus stop [longitude, latitude]
  const tehnikaBusStop = [24.67328945396854, 59.39508874042947];

  // Google Maps directions URL
  const getDirectionsUrl = (lng, lat, loc) => {
    if (loc == "bus"){
      return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=transit`;
    }

    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  // Lapikud has its own Google Maps location
  const lapikudMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Lapikud';

  // Navigate to directions using router
  const openDirections = (lng, lat, loc) => {
    router.navigate(getDirectionsUrl(lng, lat, loc), { external: true });
  };

  // Load pricing data
  const pricingData = ref({ services: [] });
  const mapElement = ref(null);
  let map;
  let disposed = false;
  const text = usePageText("Helpdesk");

  onMounted(async () => {
    pricingData.value = await yaml.loadYaml('/_data/hinnakiri.yml', { services: [] });
    if (disposed || !mapElement.value) return;

    map = new maplibregl.Map({
      container: mapElement.value,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center,
      zoom: 15,
      interactive: false,
      attributionControl: false,
    });

    const locations = [
      { coordinates: center, label: 'Akadeemia tee 5', type: 'location' },
      { coordinates: keemiaBusStop, label: 'Keemia', type: 'bus' },
      { coordinates: tehnikaBusStop, label: 'Tehnikaülikool', type: 'bus' },
    ];
    locations.forEach(({ coordinates, label, type }) => {
      const marker = document.createElement('button');
      marker.type = 'button';
      marker.className = `helpdesk-marker helpdesk-marker--${type}`;
      marker.setAttribute('aria-label', `Get directions to ${label}`);
      const markerLabel = document.createElement('span');
      markerLabel.textContent = label;
      const markerIcon = createMarkerIcon(type);
      markerIcon.setAttribute('aria-hidden', 'true');
      marker.replaceChildren(markerLabel, markerIcon);
      marker.addEventListener('click', () => openDirections(coordinates[0], coordinates[1], type));
      new maplibregl.Marker({ element: marker }).setLngLat(coordinates).addTo(map);
    });
  });

  onBeforeUnmount(() => {
    disposed = true;
    map?.remove();
  });
</script>

<template>
<div class="safe-area-navbar">
  <!-- Hero: logo + the two facts a visitor needs before scrolling -->
  <Section class="relative bg-gray-900 min-h-[36vh] overflow-hidden" padding="none" :fullWidth="true">
    <div class="absolute inset-0 z-0" aria-hidden="true">
      <picture>
        <source :srcset="helpdeskbgWebpSet" type="image/webp" />
        <img
          class="h-full w-full object-cover object-left opacity-50 blur-[1.5px]"
          :src="helpdeskbg"
          alt="Helpdesk"
        />
      </picture>
    </div>
    <div class="absolute inset-0 w-full h-full bg-black/60 z-10 pointer-events-none"></div>
    <div class="relative z-20 flex flex-col justify-center items-center min-h-[36vh] gap-6 py-10">
      <img :src="helpdesk" :alt="text['hero']?.title || 'Helpdesk logo'" class="max-h-40 w-auto drop-shadow-xl" />
      <div class="flex flex-wrap items-center justify-center gap-3">
        <a
          href="#lahtiolekuajad"
          class="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-md transition-colors hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 md:text-base"
        >
          <IconClock class="size-5" aria-hidden="true" />
          {{ text.hours?.short || '' }}
        </a>
        <a
          :href="lapikudMapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-md transition-colors hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 md:text-base"
        >
          <IconMapPin class="size-5" aria-hidden="true" />
          {{ text.location?.short || '' }}
        </a>
      </div>
    </div>
  </Section>

  <!-- Intro: what is Helpdesk + services -->
  <Section class="relative overflow-hidden" padding="normal">
    <div class="pointer-events-none absolute inset-x-0 left-1/2 top-15 z-0 hidden w-screen -translate-x-1/2 md:block" aria-hidden="true">
      <Svg
        type="connector"
        class="absolute left-0 w-[14vw] text-orange-500"
      />
      <Svg
        type="mirrorH"
        class="absolute right-0 w-[14vw] text-orange-500"
      />
    </div>
    <Grid :columns="2" :tabletColumns="1" :mobileColumns="1" gap="gap-8 md:gap-12" class="relative z-10 items-start md:my-24">
      <div class="flex flex-col">
        <h2 class="text-3xl font-light pb-4 md:text-4xl">{{ text.whatIs?.title || '' }}</h2>
        <p class="text-base md:text-lg md:leading-relaxed">
          {{ text.whatIs?.description || '' }}
        </p>
      </div>

      <div class="flex flex-col">
        <h2 class="text-3xl font-light pb-4 md:text-4xl">{{ text.services?.title || '' }}</h2>
        <ul class="flex flex-col gap-2.5">
          <template v-for="(service, i) in text.services?.list || []" :key="service">
            <li class="flex items-center gap-3">
              <component :is="serviceIcons[i % serviceIcons.length]" class="shrink-0 size-4 md:size-5 text-orange-500" aria-hidden="true" />
              <span class="text-base md:text-lg">{{ service }}</span>
            </li>
          </template>
        </ul>
      </div>
    </Grid>
  </Section>

  <!-- Pricing -->
  <Section class="bg-[#f7f6f3]" padding="normal">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-3xl font-light pb-6 md:text-4xl">{{ text.pricing?.title || '' }}</h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr class="border-b-2 border-orange-500">
              <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-500 md:px-4 md:text-sm">
                {{ text.pricing?.tableHeaders?.service || '' }}
              </th>
              <th class="px-3 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-500 md:px-4 md:text-sm">
                {{ text.pricing?.tableHeaders?.quantity || '' }}
              </th>
              <th class="px-3 py-3 text-right text-xs font-bold uppercase tracking-widest text-gray-500 md:px-4 md:text-sm">
                {{ text.pricing?.tableHeaders?.price || '' }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="service in pricingData.services" :key="service.name">
              <tr class="border-b border-gray-300 transition-colors last:border-0 hover:bg-orange-500/5">
                <td class="px-3 py-2.5 text-gray-900 md:px-4 md:py-3">{{ service.name }}</td>
                <td class="px-3 py-2.5 text-gray-500 md:px-4 md:py-3">{{ service.quantity }}</td>
                <td
                  class="px-3 py-2.5 text-right font-semibold md:px-4 md:py-3"
                  :class="service.price === 'Tasuta' ? 'text-green-600' : ''"
                >
                  {{ service.price }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!-- Fine print: attached to the table it explains -->
      <ul class="flex flex-col gap-1.5 pt-3">
        <template v-for="(note, i) in (text.pricing?.notes || []).slice(0, 2)" :key="note">
          <li class="flex items-center gap-2.5">
            <component :is="noteIcons[i % 2]" class="size-4 shrink-0 text-orange-400" aria-hidden="true" />
            <span class="text-xs leading-relaxed text-gray-500 md:text-sm">{{ note }}</span>
          </li>
        </template>
      </ul>

      <!-- Value statement: the section's closing moment -->
      <div class="flex flex-col items-center gap-3 pt-10 text-center md:pt-14">
        <IconHeartSparkles class="size-7 text-orange-500 md:size-8" aria-hidden="true" />
        <p class="mx-auto max-w-2xl text-base font-medium text-gray-900 md:text-xl">
          {{ text.pricing?.notes?.[2] || '' }}
        </p>
      </div>
    </div>
  </Section>

  <!-- Visit: hours + location side by side, map as the anchor -->
  <Section class="relative overflow-hidden" padding="normal">
    <!-- Circuit decorations (whole cascade, as on the home page) -->
    <div class="pointer-events-none absolute left-[43%] top-0 z-20 hidden -translate-x-1/2 md:block max-[1199px]:left-[73%]" aria-hidden="true">
      <Svg
        type="straightH"
        class="w-[2vw] text-orange-500"
      />
    </div>
    <div class="pointer-events-none absolute left-[47%] top-0 z-20 hidden -translate-x-1/2 md:block max-[1199px]:left-[77%]" aria-hidden="true">
      <Svg
        type="connectorHL"
        class="w-[5vw] text-orange-500"
      />
    </div>
    <div class="pointer-events-none absolute left-[48.7%] top-0 z-20 hidden -translate-x-1/2 md:block max-[1199px]:left-[78.7%]" aria-hidden="true">
      <Svg
        type="straightHS"
        class="w-[2vw] text-orange-500"
      />
    </div>
    <div class="pointer-events-none absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 md:block max-[1199px]:left-[80%]" aria-hidden="true">
      <Svg
        type="mirrorHR"
        class="w-[5vw] text-orange-500"
      />
    </div>
    <Grid :columns="2" :tabletColumns="1" :mobileColumns="1" gap="gap-8 md:gap-12" class="relative z-10 items-start md:mt-12">
      <div class="flex flex-col gap-10">
        <!-- Hours -->
        <div id="lahtiolekuajad" class="flex flex-col gap-3 scroll-mt-(--navbar-offset)">
          <div class="flex items-center gap-2.5">
            <IconClock class="size-[22px] text-orange-500" aria-hidden="true" />
            <h2 class="text-2xl font-light md:text-3xl">{{ text.hours?.title || '' }}</h2>
          </div>
          <p class="text-xl font-medium md:text-2xl">
            <template v-for="part in text.hours?.schedule || []" :key="part.emphasis">
              <strong>{{ part.emphasis }}</strong>{{ part.text }}
            </template>
          </p>
          <p class="text-sm text-gray-500 md:text-base">
            {{ text.hours?.note || '' }}
          </p>
        </div>

        <!-- Address + buses -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <IconMapPin class="size-[22px] text-orange-500" aria-hidden="true" />
            <h2 class="text-2xl font-light md:text-3xl">{{ text.location?.title || '' }}</h2>
          </div>
          <p class="text-base font-bold md:text-lg">
            {{ text.location?.address || '' }}
          </p>
          <p class="text-sm text-gray-600 md:text-base">
            <span
              v-for="(part, index) in text.location?.busInfo || []"
              :key="index"
              :class="part.highlight && 'text-orange-500'"
            >{{ part.text }}</span>
          </p>
        </div>
      </div>

      <!-- Map -->
      <div class="w-full h-64 overflow-hidden rounded-lg md:h-80">
        <div ref="mapElement" class="relative w-full h-full"></div>
      </div>
    </Grid>
  </Section>

  <!-- Contact: ways to reach Helpdesk -->
  <Section id="kontakt" class="bg-orange-500" padding="normal">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-3xl font-light pb-8 text-black md:text-4xl">{{ text.contact?.title || '' }}</h2>
      <Grid :columns="3" :mobileColumns="1" gap="gap-8" class="pb-10">
        <template v-for="(item, i) in text.contact?.items || []" :key="item.value">
          <a
            :href="item.href"
            :target="item.href?.startsWith('http') ? '_blank' : undefined"
            :rel="item.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="flex items-center gap-3.5 transition-opacity hover:opacity-70"
          >
            <component :is="contactIcons[i % contactIcons.length]" class="shrink-0 size-[22px] text-black/70" aria-hidden="true" />
            <span>
              <span class="block text-xs font-semibold uppercase tracking-widest text-black/50">{{ item.label }}</span>
              <span class="block text-base font-medium text-black/80 md:text-lg">{{ item.value }}</span>
            </span>
          </a>
        </template>
      </Grid>
      <div class="flex justify-center">
        <Button
          :onClick="openFacebook"
          class="gap-2.5 border-transparent bg-black px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 md:text-base"
        >
          <span class="[&>svg]:size-4" aria-hidden="true"><Svg type="facebook" /></span>
          {{ text.contact?.facebook?.cta || '' }}
        </Button>
      </div>
    </div>
  </Section>
</div>
</template>

<style>
.helpdesk-marker {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  border: 0;
  background: transparent;
  transition: transform 150ms ease;
}
.helpdesk-marker:hover { transform: scale(1.1); }
.helpdesk-marker span {
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
  background: white;
  padding: 0.125rem 0.5rem;
  color: #111827;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}
.helpdesk-marker--location span { background: var(--color-orange-500); color: white; }
.helpdesk-marker svg { color: var(--color-orange-500); width: 1.5rem; height: 1.5rem; }
</style>
