<script>
  import {
    Button,
    Section,
    Grid,
    Card,
    Center,
    FeatureCard,
  } from "$components";
  import { navigate } from "$lib";
  
  // Import Lucide icons
  import Wrench from "lucide-svelte/icons/wrench";
  import Users from "lucide-svelte/icons/users";
  import HeartHandshake from "lucide-svelte/icons/heart-handshake";
  import ArrowRight from "lucide-svelte/icons/arrow-right";

  // Partners data
  const partners = [
    { name: "Tehnopol", image: "tehnopollogo.png", url: "https://www.tehnopol.ee/" },
    { name: "Tallinna Tehnikaülikool", image: "taltech_logo.jpg", url: "https://www.ttu.ee/" },
    { name: "Eesti Üliõpilaskondade Liit", image: "eyl_logo.png", url: "https://eyl.ee/" },
    { name: "Tallinna Tehnikaülikooli Robotiklubi", image: "robotiklubi_logo.png", url: "https://www.robotiklubi.ee/" },
    { name: "TalTech IT teaduskond", image: "taltech_IT_teaduskond_logo.png", url: "https://taltech.ee/et/infotehnoloogia-teaduskond" },
    { name: "HexTech Solutions", image: "hextech_logo.svg", url: "https://hextech.ee/" },
    { name: "EAS & MKM", image: "eas.svg", url: "https://eis.ee/" },
  ];
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
    <FeatureCard
      variant="bordered"
      href="/liitu-meiega"
      icon={Users}
      iconColor="var(--orange)"
      title="Tudengile"
      description="Tule arenda oma oskuseid ja saa ägedaid sõpru! Omanda praktilist kogemust reaalsetest projektidest."
    >
      <div style="color: var(--orange)" class="mt-4 font-semibold flex items-center gap-2">
        Liitu meiega <ArrowRight size={16} />
      </div>
    </FeatureCard>

    <FeatureCard
      variant="bordered"
      href="/helpdesk"
      icon={Wrench}
      iconColor="var(--orange)"
      title="Helpdesk"
      description="HELPDESK on MTÜ Lapikute poolt pakutav arvutiabiteenus. Teenus on suunatud tudengitele, õppejõududele ning kõikidele huvilistele."
    >
      <div style="color: var(--orange)" class="mt-4 font-semibold flex items-center gap-2">
        Vaata teenuseid <ArrowRight size={16} />
      </div>
    </FeatureCard>

    <FeatureCard
      variant="bordered"
      href="/ourwork"
      icon={HeartHandshake}
      iconColor="var(--orange)"
      title="Ettevõttele"
      description="Aitame sinu ideed ellu viia! Meie kogenud tudengid on valmis teie projekte realiseerima."
    >
      <div style="color: var(--orange)" class="mt-4 font-semibold flex items-center gap-2">
        Tehtud tööd <ArrowRight size={16} />
      </div>
    </FeatureCard>
  </Grid>
</Section>

<!-- What We Do Section -->
<Section>
  <Grid gap="var(--space-4)">
    <Card>
      <h2 class="pb-4 text-4xl font-bold">Mida me loome</h2>
      <p>Meie põhieesmärgiks on Tallinna Tehnikaülikooli IT tudengitele erialase lisandväärtuse loomine. Kaasame tudengeid praktilistesse lahendustesse, kus saab ideid reaalselt ellu viia ja oma oskusi päriselt kasutada. Meie projektidest kasvavad välja huvitavad ja tarvilikud lõputööd, millel on selge praktiline väärtus.</p>
    </Card>
    <Card>
      <h2 class="pb-4 text-4xl font-bold">Keda ja kuidas kaasame</h2>
      <p>Pakume nutikatele ja motiveeritud tudengitele võimalust saada meie juures esimene töökogemus ning arendada end meeskonnas töötades. Lapikud ei ole ainult IT-tudengite organisatsioon, kaasame projektidesse ka majandusteaduskonna tudengeid, et tehniliste lahenduste kõrval oleks esindatud ka äriline vaade.</p>
    </Card>
  </Grid>
</Section>

<!-- Partners Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-3xl">
      Koostööpartnerid
    </h2>
  </div>
  
  <Grid gap="var(--space-4)">
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
  </Grid>
</Section>

<style>
  .partner-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background: var(--white);
    border: 1px solid var(--gray-200);
    transition: all 0.3s ease;
    text-decoration: none;
    width: 100%;
    height: 100px;
  }

  a.partner-item:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-2);
    border-color: var(--orange);
  }

  .partner-item img {
    max-width: 100%;
    max-height: 60px;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  a.partner-item:hover img {
    filter: grayscale(0%);
    opacity: 1;
  }

  .partner-name {
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--gray-800);
    text-align: center;
  }
</style>

<!-- EIS Project Highlight -->
<Section background="dark" padding="large">
  <div class="text-center text-white">
    <h2 class="mb-8 text-white">
      EIS Projekt
    </h2>
    <p class="text-lg max-w-4xl mx-auto mb-8 leading-relaxed text-white/90">
      MTÜ Lapikud projekti "Mobiilne Droonituvastussüsteem" rahastatakse riigieelarvest 
      teadus- ja arendustegevuse rahastamise vahenditest 100 000 € ulatuses, eesmärgiga 
      luua füüsilised droonituvastusseadmed, mis tagavad kasutajale droonialase olukorra teadlikkuse.
    </p>
    <p class="max-w-3xl mx-auto leading-relaxed text-white/80">
      Projekti lõpptulemusena valmib kaks teineteisest eraldiseisvat seadet – 
      spektrianalüüsi ning Direct Remote Identification tööpõhimõttel toimivad seadmed.
    </p>
  </div>
</Section>

<!-- CTA Section -->
<Section background="gray" padding="large">
  <div class="text-center">
    <h2 class="mb-8">
      Valmis liituma?
    </h2>
    <div class="flex gap-4 justify-center flex-wrap">
      <Button onClick={() => navigate("/kontakt")} border>
        Võta ühendust
      </Button>
      <Button onClick={() => navigate("/mis-teeme")} border>
        Loe rohkem
      </Button>
    </div>
  </div>
</Section>
