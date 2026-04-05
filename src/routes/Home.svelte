<script>
  import {Section, Stack, Grid, Center, Image, Svg, Button} from "$components";
  import { navigate } from "$lib/router/router.js";
  import { text, currentLang } from "$lib";
  import { onMount } from "svelte";
  import yaml from 'js-yaml';

  import ArrowRight from "lucide-svelte/icons/arrow-right";

  // Partners data
  let partners = [];

  onMount(async () => {
    const response = await fetch('/_data/partners.yml');
    const yamlText = await response.text();
    partners = yaml.load(yamlText);
  });
</script>

<!-- Hero Section -->
<Section class="relative min-h-screen overflow-hidden" padding="none" bg="bg-gray-900" id="hero">
  <div class="relative min-h-screen flex items-center">
    <div class="absolute inset-0 left-1/2 w-screen -translate-x-1/2" aria-hidden="true">
      <Image
        src="/assets/hero.jpg"
        alt="illustrative hero image"
        objectFit="cover"
        class="w-full h-full"
        pictureClass="block w-full h-full"
      />
    </div>
    <div
      class="pointer-events-none absolute inset-0 left-1/2 hidden w-screen -translate-x-1/2 md:block [clip-path:polygon(42%_0,100%_0,100%_100%,65%_100%)]"
      aria-hidden="true"
    >
      <Svg
        type="mirrorH"
        class="absolute right-0 top-[16%] w-[clamp(8.125rem,14vw,14.375rem)] text-[#E18E38]"
      />
      <Svg
        type="branchH"
        class="absolute right-0 top-[52%] -translate-y-1/2 w-[clamp(3.5rem,6vw,5.875rem)] text-[#E18E38]"
      />
      <Svg
        type="mirrorVH"
        class="absolute right-0 bottom-[12%] w-[clamp(8.125rem,14vw,14.375rem)] text-[#E18E38]"
      />
    </div>
    <div class="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-linear-to-r from-black/65 via-black/35 to-transparent" aria-hidden="true"></div>
    <div class="relative z-20 flex min-h-screen w-full items-stretch py-8 md:py-12">
      <div class="flex w-full max-w-115 flex-col justify-between">
        <img src="/assets/LapLogo_white_orange.png" alt="MTÜ Lapikud" class="w-full max-w-55 md:max-w-65 h-auto"/>
        <div class="flex flex-col items-start gap-5">
          <p class="w-full max-w-110 text-left text-lg leading-[165%] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:max-w-125 md:text-xl">
            MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, mis ühendab endisi
            ja praegusi IT huvilisi tudengeid.
          </p>
          <Button
            class="rounded-lg border-orange-500 bg-orange-500 px-6 py-3 text-gray-900 transition-colors hover:border-orange-300 hover:bg-orange-300"
            onClick={() => navigate("/tudengile")}
          >
            Liitu LAPikutega!
          </Button>
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- Second Section -->
<Section class="relative overflow-hidden" id="services">
  <div class="pointer-events-none absolute inset-x-0 left-1/2 top-15 z-0 w-screen -translate-x-1/2" aria-hidden="true">
    <Svg
      type="connector"
      class="absolute left-0 w-[clamp(8.125rem,14vw,14.375rem)] text-orange-500"
    />
    <Svg
      type="mirrorH"
      class="absolute right-0 w-[clamp(8.125rem,14vw,14.375rem)] text-orange-500"
    />
  </div>

  <Grid columns={2} largeColumns={3} mobileColumns={1} class="relative z-10 items-start mt-12 md:mt-20" gap="gap-12 md:gap-16 lg:gap-24">
    <Center dir="col" class="w-full max-w-sm justify-start mx-auto">
      <div class="w-[min(72vw,240px)] md:w-[min(26vw,280px)] lg:w-[min(23vw,300px)] aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/student-images/image_1.jpg"
          webpSrc=""
          alt="Tudengile Pilt"
          objectFit="cover"
          class="w-full h-full rounded-full object-[center_35%]"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-10 text-center text-2xl font-semibold flex items-center justify-center">Tudengile</h3>
      <p class="w-full max-w-[26ch] text-center text-base">Tule arenda oma oskuseid ja saa ägedaid sõpru! Omanda praktilist kogemust reaalsetest projektidest.</p>
    </Center>

    <Center dir="col" class="w-full max-w-sm justify-start mx-auto">
      <div class="w-[min(72vw,240px)] md:w-[min(26vw,280px)] lg:w-[min(23vw,300px)] aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/helpdesk/helpdesk_bg.jpg"
          webpSrc=""
          alt="Helpdesk Pilt"
          objectFit="cover"
          class="w-full h-full rounded-full object-[center_38%]"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-10 text-center text-2xl font-semibold flex items-center justify-center">Helpdesk</h3>
      <p class="w-full max-w-[26ch] text-center text-base">HELPDESK on MTÜ Lapikute poolt pakutav arvutiabiteenus. Teenus on suunatud tudengitele, õppejõududele ning kõikidele huvilistele.</p>
    </Center>

    <Center dir="col" class="w-full max-w-sm justify-start mx-auto md:col-span-2 lg:col-span-1">
      <div class="w-[min(72vw,240px)] md:w-[min(26vw,280px)] lg:w-[min(23vw,300px)] aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/asi-karikas-2023-images/miina_harma.jpeg"
          webpSrc=""
          alt="Ettevõttele Pilt"
          objectFit="cover"
          class="w-full h-full rounded-full object-[center_25%]"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-10 text-center text-2xl font-semibold flex items-center justify-center">Ettevõttele</h3>
      <p class="w-full max-w-[26ch] text-center text-base">Aitame sinu ideed ellu viia! Meie kogenud tudengid on valmis teie projekte realiseerima.</p>
    </Center>
  </Grid>
</Section>

<!-- About Us Section -->
<Section
  bg="bg-gray-900"
  class="relative overflow-hidden text-white"
  padding="none"
  fullWidth={true}
  contentClass="!px-0 !py-0"
>
  <Grid
    columns={2}
    largeColumns={2}
    mobileColumns={1}
    gap="gap-y-0 md:gap-x-[clamp(5.75rem,9vw,9.75rem)] lg:gap-x-[clamp(6rem,9vw,10.5rem)]"
    class=""
  >
    <div
      class="relative flex items-center py-12 md:py-16 lg:py-20 pr-(--page-padding-inline)"
      style="padding-left: max(var(--page-padding-inline), calc((100vw - var(--page-max-width)) / 2 + var(--page-padding-inline)));"
    >
      <div class="flex max-w-[54ch] flex-col justify-center gap-8">
        <div class="space-y-5">
          <h2 class="text-4xl font-semibold text-orange-500">
            {$text["homeAbout"]?.title || "Meist"}
          </h2>
          <p class="text-base">
            {$text["homeAbout"]?.description || "Viga teksti laadimisel. Palun proovi lehte uuesti laadida."}
          </p>
        </div>

        <div class="flex flex-col items-start gap-6">
          <Button
            class="rounded-md border-3 border-orange-500 bg-transparent px-10 py-2 transition-colors hover:bg-orange-500/10"
            onClick={() => navigate($currentLang === "en" ? "/aboutus" : "/lapikutest")}
          >
            {$text["homeAbout"]?.moreInfo || "Rohkem infot"}
          </Button>

          <div class="flex items-center gap-4">
            <Button
              class="rounded-md border-orange-500 bg-orange-500 px-20 py-2 transition-colors hover:border-orange-300 hover:bg-orange-300"
              onClick={() => navigate($currentLang === "en" ? "/contact" : "/kontakt")}
            >
              {$text["homeAbout"]?.contact || "Kontakt"}
            </Button>
            <ArrowRight class="h-12 w-12 text-orange-500 md:h-14 md:w-14" strokeWidth={2.4} />
          </div>
        </div>
      </div>
    </div>

    <div class="relative overflow-hidden min-h-80 md:min-h-0 md:h-full md:self-stretch">
      <div class="absolute inset-0">
        <Image
          src="/assets/image.png"
          alt={$text["homeAbout"]?.imageAlt || "Lapikud team"}
          objectFit="cover"
          class="h-full w-full max-w-none!"
          pictureClass="block h-full w-full"
        />
      </div>

      <div class="pointer-events-none absolute inset-0 bg-black/50"></div>

      <div class="pointer-events-none absolute bottom-3 inset-x-0 z-10 hidden w-full lg:block" aria-hidden="true">
        <div class="ml-auto h-5 w-[84%] bg-orange-500 mb-3"></div>
        <div class="ml-auto h-3 w-[96%] bg-orange-500"></div>
      </div>
    </div>
  </Grid>

  <div class="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 md:flex" aria-hidden="true">
    <div class="h-[82%] w-3 bg-orange-500/50"></div>
    <div class="h-[88%] w-8 bg-orange-500/50"></div>
  </div>
</Section>

<!-- Spacer-->
<Section bg="bg-orange-500" class="h-3"/>

<!-- What we do -->
<Section>

</Section>

<!-- Partners Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-3xl text-orange-500">
      Koostööpartnerid
    </h2>
  </div>
  
  <Center class="flex-wrap">
    {#each partners as partner}
      {#if partner.url}
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-[170px] items-center justify-center p-3 no-underline transition-all duration-300 hover:scale-105"
          title={partner.name}
        >
          {#if partner.image}
            <Image
              src={`/assets/partners/${partner.image}`}
              alt={partner.name}
              objectFit="contain"
              class="w-auto max-h-[150px] transition-all duration-300"
            />
          {:else}
            <span class="font-semibold text-center">{partner.name}</span>
          {/if}
        </a>
      {:else}
        <div class="flex h-[170px] items-center justify-center p-3 transition-all duration-300">
          {#if partner.image}
            <Image
              src={`/assets/partners/${partner.image}`}
              alt={partner.name}
              objectFit="contain"
              class="w-auto max-h-[150px] transition-all duration-300"
            />
          {:else}
            <span class="font-semibold text-center">{partner.name}</span>
          {/if}
        </div>
      {/if}
    {/each}
  </Center>
  <Center class="m-10">
    <Button
      class="rounded-md border-orange-500 bg-transparent px-20 py-3 transition-colors hover:bg-orange-500/10"
      onClick={() => navigate("/partners")}
    >
      Rohkem infot partnerluste kohta
    </Button>
  </Center>
</Section>

<!-- Spacer-->
<Section bg="bg-orange-500" class="h-3"/>
