<script>
  import {
    Section,
    Grid,
    Card,
    Center,
    Container,
  } from "$components";
  import { onMount } from "svelte";
  
  // Import Lucide icons
  import Wrench from "lucide-svelte/icons/wrench";
  import Users from "lucide-svelte/icons/users";
  import HeartHandshake from "lucide-svelte/icons/heart-handshake";
  import ArrowRight from "lucide-svelte/icons/arrow-right";

  // Partners data
  let partners = [];
  
  onMount(async () => {
    const response = await fetch('/assets/partners/partners.json');
    partners = await response.json();
  });
</script>

<!-- Header Section -->
<Section background="orange">
  <Grid>
    <Center>
      <img src="/assets/LAP_logo_v3_transp.png" alt="MTÜ Lapikud" class="max-w-md w-full h-auto" style="padding: var(--space-4);"/>
    </Center>
    <p class="text-3xl leading-relaxed" style="padding: var(--space-4);">
      MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, mis ühendab endisi 
      ja praegusi IT huvilisi tudengeid.
    </p>
  </Grid>
</Section>

<Section>
  <Grid gap="var(--space-5)">
    <Card variant="animated-neutral" href="/liitu-meiega">
      <div class="feature-icon" style="color: var(--orange)">
        <Users size={32} strokeWidth={1.5} />
      </div>
      <h3 class="feature-title">Tudengile</h3>
      <p class="feature-description">
        Tule arenda oma oskuseid ja saa ägedaid sõpru! Omanda praktilist kogemust reaalsetest projektidest.
      </p>
      <div style="color: var(--orange)" class="mt-4 font-semibold flex items-center gap-2">
        Liitu meiega <ArrowRight size={16} />
      </div>
    </Card>

    <Card variant="animated-neutral" href="/helpdesk">
      <div class="feature-icon" style="color: var(--orange)">
        <Wrench size={32} strokeWidth={1.5} />
      </div>
      <h3 class="feature-title">Helpdesk</h3>
      <p class="feature-description">
        HELPDESK on MTÜ Lapikute poolt pakutav arvutiabiteenus. Teenus on suunatud tudengitele, õppejõududele ning kõikidele huvilistele.
      </p>
      <div style="color: var(--orange)" class="mt-4 font-semibold flex items-center gap-2">
        Vaata teenuseid <ArrowRight size={16} />
      </div>
    </Card>

    <Card variant="animated-neutral" href="/ourwork">
      <div class="feature-icon" style="color: var(--orange)">
        <HeartHandshake size={32} strokeWidth={1.5} />
      </div>
      <h3 class="feature-title">Ettevõttele</h3>
      <p class="feature-description">
        Aitame sinu ideed ellu viia! Meie kogenud tudengid on valmis teie projekte realiseerima.
      </p>
      <div style="color: var(--orange)" class="mt-4 font-semibold flex items-center gap-2">
        Tehtud tööd <ArrowRight size={16} />
      </div>
    </Card>
  </Grid>
</Section>

<!-- What We Do Section -->
<Section>
  <Grid gap="var(--space-4)">
    <Card variant="glass">
      <h2 class="pb-4 text-4xl font-bold">Mida me loome</h2>
      <p>Meie põhieesmärgiks on Tallinna Tehnikaülikooli IT tudengitele erialase lisandväärtuse loomine. Kaasame tudengeid praktilistesse lahendustesse, kus saab ideid reaalselt ellu viia ja oma oskusi päriselt kasutada. Meie projektidest kasvavad välja huvitavad ja tarvilikud lõputööd, millel on selge praktiline väärtus.</p>
    </Card>
    <Card variant="glass">
      <h2 class="pb-4 text-4xl font-bold">Keda ja kuidas kaasame</h2>
      <p>Pakume nutikatele ja motiveeritud tudengitele võimalust saada meie juures esimene töökogemus ning arendada end meeskonnas töötades. Lapikud ei ole ainult IT-tudengite organisatsioon, kaasame projektidesse ka majandusteaduskonna tudengeid, et tehniliste lahenduste kõrval oleks esindatud ka äriline vaade.</p>
    </Card>
  </Grid>
</Section>

<!-- Partners Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-5xl">
      Koostööpartnerid
    </h2>
  </div>
  
  <Center className="flex-wrap">
    {#each partners as partner}
      {#if partner.url}
        <a href={partner.url} target="_blank" rel="noopener noreferrer" class="partner-item" title={partner.name}>
          {#if partner.image}
            <img src="/assets/partners/{partner.image}" alt={partner.name} />
          {:else}
            <span class="partner-name">{partner.name}</span>
          {/if}
        </a>
      {:else}
        <div class="partner-item">
          {#if partner.image}
            <img src="/assets/partners/{partner.image}" alt={partner.name} />
          {:else}
            <span class="partner-name">{partner.name}</span>
          {/if}
        </div>
      {/if}
    {/each}
  </Center>
</Section>

<style>
  .feature-icon {
    margin-bottom: var(--space-3);
    display: inline-flex;
  }

  .feature-title {
    font-size: var(--fs-xl);
    font-weight: 700;
    margin-bottom: var(--space-2);
    color: var(--black);
  }

  .feature-description {
    color: var(--gray-800);
    line-height: 1.6;
    margin-bottom: var(--space-3);
  }

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
