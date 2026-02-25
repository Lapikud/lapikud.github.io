<script>
  import {
    Section,
    Grid,
    Container,
  } from "$components";
  import { onMount } from "svelte";
  import { text } from "$lib/i18n";
  import yaml from 'js-yaml';
  
  import { MapLibre, Marker } from "svelte-maplibre";
  import MapPin from "lucide-svelte/icons/map-pin";
  import BusFront from "lucide-svelte/icons/bus-front";
  import { navigate } from "$lib/router/router.js";

  // Images
  const helpdeskbg = "/assets/helpdesk/helpdesk_bg.jpg";
  const helpdesk = "/assets/helpdesk/helpdesk-on-black.png";

  // Coordinates for Akadeemia tee 5, 12616 Tallinn [longitude, latitude]
  const center = [24.66887400515207, 59.396427975093935];
  // Coordinates for Keemia bus stop [longitude, latitude]
  const keemiaBusStop = [24.668325396145953, 59.397074517662276];
  // Coordinates for Tehnikaülikool bus stop [longitude, latitude]
  const tehnikaBusStop = [24.67328945396854, 59.39508874042947];
  
  // Google Maps directions URL
  const getDirectionsUrl = (lng, lat) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };
  
  // Navigate to directions using router
  const openDirections = (lng, lat) => {
    navigate(getDirectionsUrl(lng, lat), { external: true });
  };

  // Load pricing data
  let pricingData = { services: [] };
  
  onMount(async () => {
    const response = await fetch('/_data/helpdesk/hinnakiri.yml');
    const yamlText = await response.text();
    pricingData = yaml.load(yamlText);
  });
</script>

<!-- Hero Section -->
<div class="w-full bg-black">
  <div class="flex absolute justify-center items-center flex-row w-full h-[42vh] px-4">
    <img src={helpdesk} alt={$text["hero"]?.title || "Helpdesk logo"} class="z-10" />
  </div>
  <img
    class="h-[42vh] object-cover object-left w-full opacity-50 blur-[1.5px]"
    src={helpdeskbg}
    alt="Helpdesk"
  />
</div>

<!-- Main Content -->
<Container>
  <Section>
    <Grid min="480px" gap="var(--space-5)">
      <!-- What is HELPDESK? -->
      <div class="flex flex-col">
        <h2 class="text-4xl font-light pb-4">{$text["whatIs"]?.title || ""}</h2>
        <p class="text-lg">
          {$text["whatIs"]?.description || ""}
        </p>
      </div>

      <!-- What services do we offer? -->
      <div class="flex flex-col">
        <h2 class="text-4xl font-light pb-4">{$text["services"]?.title || ""}</h2>
        <ul class="text-lg list-disc pl-5">
          {#each $text["services"]?.list || [] as service}
            <li>{service}</li>
          {/each}
        </ul>
      </div>

      <!-- Pricing Table -->
      <div class="flex flex-col">
        <h2 class="text-4xl font-light pb-4">{$text["pricing"]?.title || ""}</h2>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table class="w-full text-lg">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                  {$text["pricing"]?.tableHeaders?.service || ""}
                </th>
                <th class="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                  {$text["pricing"]?.tableHeaders?.quantity || ""}
                </th>
                <th class="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                  {$text["pricing"]?.tableHeaders?.price || ""}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each pricingData.services as service}
                <tr class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4 text-gray-900">{service.name}</td>
                  <td class="px-6 py-4 text-gray-600">{service.quantity}</td>
                  <td class="px-6 py-4 font-medium" class:text-green-600={service.price === "Tasuta"} class:text-gray-900={service.price !== "Tasuta"}>
                    {service.price}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <p class="pt-4 text-lg font-bold">
          {@html $text["pricing"]?.note || ""}
        </p>
      </div>

      <!-- Opening Hours & Location -->
      <div class="flex flex-col">
        <h2 class="text-4xl font-light pb-4">
          {@html $text["hours"]?.title || ""}
          <br /> 
          {@html $text["hours"]?.schedule || ""}
        </h2>
        <p class="text-lg font-light opacity-70 pb-16">
          {$text["hours"]?.note || ""}
        </p>
        
        <h2 class="text-4xl font-light pb-4">{$text["location"]?.title || ""}</h2>
        <div class="w-full h-96 rounded-lg overflow-hidden">
          <MapLibre
            style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            class="relative w-full h-full"
            {center}
            zoom={15}
            interactive={false}
            attributionControl={false}
          >
            <!-- Main location -->
            <Marker lngLat={center}>
              <div
                role="button"
                tabindex="0"
                onclick={() => openDirections(center[0], center[1])}
                onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && openDirections(center[0], center[1])}
                class="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                title="Get directions to Akadeemia tee 5"
              >
                <span class="text-xs font-semibold text-white bg-[#E69635] px-2 py-0.5 rounded shadow-md mb-1 whitespace-nowrap">Akadeemia tee 5</span>
                <MapPin class="w-7 h-7 text-[#E69635] drop-shadow-lg" />
              </div>
            </Marker>
            
            <!-- Keemia bus stop -->
            <Marker lngLat={keemiaBusStop}>
              <div
                role="button"
                tabindex="0"
                onclick={() => openDirections(keemiaBusStop[0], keemiaBusStop[1])}
                onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && openDirections(keemiaBusStop[0], keemiaBusStop[1])}
                class="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                title="Get directions to Keemia bus stop"
              >
                <span class="text-xs font-semibold text-gray-900 bg-white px-2 py-0.5 rounded shadow-md mb-1">Keemia</span>
                <BusFront class="w-7 h-7 text-[#E69635] drop-shadow-lg" />
              </div>
            </Marker>
            
            <!-- Tehnikaülikool bus stop -->
            <Marker lngLat={tehnikaBusStop}>
              <div
                role="button"
                tabindex="0"
                onclick={() => openDirections(tehnikaBusStop[0], tehnikaBusStop[1])}
                onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && openDirections(tehnikaBusStop[0], tehnikaBusStop[1])}
                class="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                title="Get directions to Tehnikaülikool bus stop"
              >
                <span class="text-xs font-semibold text-gray-900 bg-white px-2 py-0.5 rounded shadow-md mb-1">Tehnikaülikool</span>
                <BusFront class="w-7 h-7 text-[#E69635] drop-shadow-lg" />
              </div>
            </Marker>
          </MapLibre>
        </div>
        <p class="pb-4 text-lg">
          {@html $text["location"]?.busInfo || ""}
        </p>
        <p class="text-lg font-bold">
          {$text["location"]?.address || ""}
        </p>
      </div>
    </Grid>
  </Section>
</Container>
