<script setup>
  import {
    Section,
    Grid,
  } from "../components/index.js";
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { usePageText } from "../lib/index.js";
  import { getHeroImageFallback, getHeroImageSrcSet, getRootAssetPath } from "../lib/imageHelpers.js";
  import yaml from 'js-yaml';

  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { navigate } from "../lib/router/router.js";

  // Images
  const helpdeskbg = getHeroImageFallback("helpdesk-page-images", "helpdesk_bg");
  const helpdeskbgWebpSet = getHeroImageSrcSet("helpdesk-page-images", "helpdesk_bg");
  const helpdesk = getRootAssetPath("helpdesk-page-images", "helpdesk-on-black.png");

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

  // Navigate to directions using router
  const openDirections = (lng, lat, loc) => {
    navigate(getDirectionsUrl(lng, lat, loc), { external: true });
  };

  // Load pricing data
  const pricingData = ref({ services: [] });
  const mapElement = ref(null);
  let map;
  const text = usePageText("Helpdesk");

  onMounted(async () => {
    const response = await fetch('/_data/hinnakiri.yml');
    const yamlText = await response.text();
    pricingData.value = yaml.load(yamlText) || { services: [] };

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
      marker.innerHTML = `<span>${label}</span><b aria-hidden="true">${type === 'bus' ? '●' : '◆'}</b>`;
      marker.addEventListener('click', () => openDirections(coordinates[0], coordinates[1], type));
      new maplibregl.Marker({ element: marker }).setLngLat(coordinates).addTo(map);
    });
  });

  onBeforeUnmount(() => map?.remove());
</script>

<template>
<div class="safe-area-navbar">
<!-- Hero Section -->
<Section class="relative bg-gray-900 min-h-[42vh] overflow-hidden" padding="none" :fullWidth="true">
  <div class="absolute inset-0 left-1/2 w-screen -translate-x-1/2 h-[42vh]" aria-hidden="true">
    <picture>
      <source :srcset="helpdeskbgWebpSet" type="image/webp" />
      <img
        class="h-full w-full object-cover object-left opacity-50 blur-[1.5px]"
        :src="helpdeskbg"
        alt="Helpdesk"
      />
    </picture>
  </div>
  <div class="relative flex justify-center items-center flex-row w-full h-[42vh] z-10">
    <img :src="helpdesk" :alt="text['hero']?.title || 'Helpdesk logo'" />
  </div>
</Section>

<!-- Main Content -->
<Section>
  <Grid :columns="2" :tabletColumns="1" :mobileColumns="1" gap="gap-6">
      <div class="flex flex-col">
        <h2 class="text-4xl font-light pb-4">{{ text.whatIs?.title || '' }}</h2>
        <p class="text-lg">
          {{ text.whatIs?.description || '' }}
        </p>
      </div>

      <div class="flex flex-col">
        <h2 class="text-4xl font-light pb-4">{{ text.services?.title || '' }}</h2>
        <ul class="text-lg list-disc pl-5">
          <template v-for="service in text.services?.list || []">
            <li>{{ service }}</li>
          </template>
        </ul>
      </div>

      <!-- Pricing Table -->
      <div class="flex flex-col">
        <h2 class="text-4xl font-light pb-4">{{ text.pricing?.title || '' }}</h2>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table class="w-full text-lg">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                  {{ text.pricing?.tableHeaders?.service || '' }}
                </th>
                <th class="px-3 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                  {{ text.pricing?.tableHeaders?.quantity || '' }}
                </th>
                <th class="px-3 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                  {{ text.pricing?.tableHeaders?.price || '' }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-for="service in pricingData.services">
                <tr class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-3 py-4 text-gray-900">{{ service.name }}</td>
                  <td class="px-3 py-4 text-gray-600">{{ service.quantity }}</td>
                  <td class="px-3 py-4 font-medium" :class="service.price === 'Tasuta' ? 'text-green-600' : 'text-gray-900'">
                    {{ service.price }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <p class="pt-4 text-lg font-bold">
          <span v-html="text.pricing?.note || ''"></span>
        </p>
      </div>

      <div class="flex flex-col">
        <h2 class="text-4xl font-light pb-4">
          <span v-html="text.hours?.title || ''"></span>
          <br />
          <span v-html="text.hours?.schedule || ''"></span>
        </h2>
        <p class="text-lg font-light opacity-70 pb-16">
          {{ text.hours?.note || '' }}
        </p>

        <h2 class="text-4xl font-light pb-4">{{ text.location?.title || '' }}</h2>
        <div ref="mapElement" class="relative w-full h-96 rounded-lg overflow-hidden"></div>
        <p class="pb-4 text-lg">
          <span v-html="text.location?.busInfo || ''"></span>
        </p>
        <p class="text-lg font-bold">
          {{ text.location?.address || '' }}
        </p>
      </div>
    </Grid>
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
.helpdesk-marker--location span { background: var(--orange); color: white; }
.helpdesk-marker b { color: var(--orange); font-size: 1.5rem; line-height: 1; }
</style>
