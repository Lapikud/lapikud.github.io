<script>
  import {
    Section,
    Grid,
    Card,
    Center,
  } from "$components";
  import { onMount } from "svelte";
  import yaml from 'js-yaml';
  
  // Import Lucide icons
  import Wrench from "lucide-svelte/icons/wrench";
  import Users from "lucide-svelte/icons/users";
  import HeartHandshake from "lucide-svelte/icons/heart-handshake";
  import ArrowRight from "lucide-svelte/icons/arrow-right";

  // Partners data
  let partners = [];
  
  onMount(async () => {
    const response = await fetch('/_data/partners.yml');
    const yamlText = await response.text();
    partners = yaml.load(yamlText);
  });
</script>

<!-- Header Section -->
<Section bg="bg-orange-500">
  <Grid>
    <Center>
      <img src="/assets/LapLogo_black_white.png" alt="MTÜ Lapikud" class="max-w-md w-full h-auto p-4"/>
    </Center>
    <p class="text-3xl leading-relaxe p-4">
      MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, mis ühendab endisi 
      ja praegusi IT huvilisi tudengeid.
    </p>
  </Grid>
</Section>

<Section>
  <Grid gap="gap-5">
    <Card variant="blur" href="/tudengile">
      <div class="feature-icon text-orange-500">
        <Users size={32} strokeWidth={1.5} />
      </div>
      <h3 class="feature-title">Tudengile</h3>
      <p class="feature-description">
        Tule arenda oma oskuseid ja saa ägedaid sõpru! Omanda praktilist kogemust reaalsetest projektidest.
      </p>
      <div class="mt-4 font-semibold flex items-center gap-2 text-orange-500">
        Liitu meiega <ArrowRight size={16} />
      </div>
    </Card>

    <Card variant="blur" href="/helpdesk">
      <div class="feature-icon text-orange-500">
        <Wrench size={32} strokeWidth={1.5} />
      </div>
      <h3 class="feature-title">Helpdesk</h3>
      <p class="feature-description">
        HELPDESK on MTÜ Lapikute poolt pakutav arvutiabiteenus. Teenus on suunatud tudengitele, õppejõududele ning kõikidele huvilistele.
      </p>
      <div class="mt-4 font-semibold flex items-center gap-2 text-orange-500">
        Vaata teenuseid <ArrowRight size={16} />
      </div>
    </Card>

    <Card variant="blur" href="/ourwork">
      <div class="feature-icon text-orange-500">
        <HeartHandshake size={32} strokeWidth={1.5} />
      </div>
      <h3 class="feature-title">Ettevõttele</h3>
      <p class="feature-description">
        Aitame sinu ideed ellu viia! Meie kogenud tudengid on valmis teie projekte realiseerima.
      </p>
      <div class="mt-4 font-semibold flex items-center gap-2 text-orange-500">
        Tehtud tööd <ArrowRight size={16} />
      </div>
    </Card>
  </Grid>
</Section>

<!-- What We Do Section -->
<Section>
  <Grid gap="gap-4">
    <Card variant="blur">
      <h2 class="pb-4 text-4xl font-bold">Mida me loome</h2>
      <p>Meie põhieesmärgiks on Tallinna Tehnikaülikooli IT tudengitele erialase lisandväärtuse loomine. Kaasame tudengeid praktilistesse lahendustesse, kus saab ideid reaalselt ellu viia ja oma oskusi päriselt kasutada. Meie projektidest kasvavad välja huvitavad ja tarvilikud lõputööd, millel on selge praktiline väärtus.</p>
    </Card>
    <Card variant="blur">
      <h2 class="pb-4 text-4xl font-bold">Keda ja kuidas kaasame</h2>
      <p>Pakume nutikatele ja motiveeritud tudengitele võimalust saada meie juures esimene töökogemus ning arendada end meeskonnas töötades. Lapikud ei ole ainult IT-tudengite organisatsioon, kaasame projektidesse ka majandusteaduskonna tudengeid, et tehniliste lahenduste kõrval oleks esindatud ka äriline vaade.</p>
    </Card>
  </Grid>
</Section>

<!-- Partners Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-5xl text-orange-500">
      Koostööpartnerid
    </h2>
  </div>
  
  <Center className="flex-wrap">
    {#each partners as partner}
      {#if partner.url}
        <a href={partner.url} target="_blank" rel="noopener noreferrer" class="partner-item" title={partner.name}>
          {#if partner.image}
            <img src={`/assets/partners/${partner.image}`} alt={partner.name} />
          {:else}
            <span class="partner-name">{partner.name}</span>
          {/if}
        </a>
      {:else}
        <div class="partner-item">
          {#if partner.image}
            <img src={`/assets/partners/${partner.image}`} alt={partner.name} />
          {:else}
            <span class="partner-name">{partner.name}</span>
          {/if}
        </div>
      {/if}
    {/each}
  </Center>
</Section>

<style>
  /* PARTNERS SECTION */
  .partner-item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: var(--space-3);
    transition: all 0.3s ease;
    height: 170px;
  }

  a.partner-item:hover {
    transform: scale(1.05);
  }

  .partner-item img {
    width: auto;
    object-fit: contain;
    max-height: 150px;
    transition: all 0.3s ease;
  }

  .partner-name {
    font-size: var(--fs-sm);
    font-weight: 600;
    text-align: center;
  }
</style>
