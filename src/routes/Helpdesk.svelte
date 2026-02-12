<script>
  import {
    Section,
    Grid,
    Card,
    Center,
  } from "$components";
  
  import Laptop from "lucide-svelte/icons/laptop";
  import Smartphone from "lucide-svelte/icons/smartphone";
  import HardDrive from "lucide-svelte/icons/hard-drive";
  import Wifi from "lucide-svelte/icons/wifi";
  import Settings from "lucide-svelte/icons/settings";
  import Wrench from "lucide-svelte/icons/wrench";
  import Clock from "lucide-svelte/icons/clock";
  import MapPin from "lucide-svelte/icons/map-pin";
  import Mail from "lucide-svelte/icons/mail";
  import Phone from "lucide-svelte/icons/phone";
  import CheckCircle from "lucide-svelte/icons/check-circle";

  const services = [
    {
      icon: Laptop,
      title: "Arvuti diagnostika",
      description: "Tuvastame riistvara- ja tarkvaraprobleemid ning pakume lahendusi",
      price: "Alates 10€"
    },
    {
      icon: Settings,
      title: "Operatsioonisüsteemi paigaldus",
      description: "Windows, Linux või macOS paigaldamine ja seadistamine",
      price: "20€"
    },
    {
      icon: HardDrive,
      title: "Riistvara vahetus",
      description: "RAM, SSD, HDD või muu komponendi vahetus ja paigaldus",
      price: "Vastavalt tööle"
    },
    {
      icon: Wrench,
      title: "Arvuti puhastus",
      description: "Füüsiline puhastus tolmust ja termopasta vahetus",
      price: "15€"
    },
    {
      icon: Wifi,
      title: "Võrgu seadistamine",
      description: "Koduvõrgu või WiFi seadistamine ja probleemide lahendamine",
      price: "15€"
    },
    {
      icon: Smartphone,
      title: "Nutiseadmete abi",
      description: "Nutitelefonide ja tahvelarvutite seadistamine ja nõustamine",
      price: "10€"
    }
  ];

  const whyChooseUs = [
    "Tudengisõbralikud hinnad",
    "Kiire teenindus",
    "Kogenud meeskond",
    "Paindlikud lahtiolekuajad",
    "Garantii töödele",
    "Sõbralik teenindus"
  ];
</script>

<!-- Hero Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl">
      <h1 class="text-5xl font-bold mb-6">Helpdesk</h1>
      <p class="text-2xl leading-relaxed">
        Tudengisõbralik arvutiabiteenus. Aitame lahendada kõik sinu IT-mured!
      </p>
    </div>
  </Center>
</Section>

<!-- Services Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Meie teenused</h2>
    <p class="text-xl text-gray-600">Pakume laia valikut IT-teenuseid soodsa hinnaga</p>
  </div>
  
  <Grid columns={3} gap="var(--space-5)">
    {#each services as service}
      <Card variant="glass">
        <div class="feature-icon mb-4" style="color: var(--orange)">
          <svelte:component this={service.icon} size={48} strokeWidth={1.5} />
        </div>
        <h3 class="text-2xl font-bold mb-3">{service.title}</h3>
        <p class="text-gray-600 mb-4">{service.description}</p>
        <p class="text-lg font-bold" style="color: var(--orange)">{service.price}</p>
      </Card>
    {/each}
  </Grid>
</Section>

<!-- Why Choose Us -->
<Section background="neutral">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Miks valida meid?</h2>
  </div>
  
  <Center>
    <Card variant="glass" class="max-w-4xl">
      <Grid columns={2} gap="var(--space-4)">
        {#each whyChooseUs as reason}
          <div class="flex items-center gap-3">
            <CheckCircle size={24} style="color: var(--orange)" />
            <span class="text-lg">{reason}</span>
          </div>
        {/each}
      </Grid>
    </Card>
  </Center>
</Section>

<!-- Pricing Info -->
<Section>
  <Grid gap="var(--space-5)">
    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-6">Hinnakirjast</h2>
      <div class="space-y-4 text-lg">
        <p>
          Meie hinnad on tudengisõbralikud ja läbipaistvad. Enne töö alustamist teeme alati hinnapakkumise, 
          et sa teaksid täpselt, mida oodata.
        </p>
        <p>
          <strong>Diagnostika:</strong> Esimene diagnostika on tasuta! Maksad ainult siis, kui otsustad lasta meil 
          probleem lahendada.
        </p>
        <p>
          <strong>Töötunnid:</strong> Tavaline tunnitasu on 15€. Keerulisemad tööd võivad olla kallimad, 
          kuid lepime alati kokku enne töö alustamist.
        </p>
        <p>
          <strong>Varuosad:</strong> Varuosade hind lisandub töötasule. Aitame leida parimad hinnad ja kvaliteedi.
        </p>
      </div>
    </Card>

    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-6">Kuidas toimub teenindus?</h2>
      <div class="space-y-6">
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">1.</div>
          <div>
            <strong class="text-lg">Võta ühendust</strong><br/>
            Kirjuta meile või tule otse meie kontorisse. Kirjelda oma probleemi.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">2.</div>
          <div>
            <strong class="text-lg">Diagnostika</strong><br/>
            Vaatame probleemi üle ja selgitame välja põhjuse. Teeme hinnapakkumise.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">3.</div>
          <div>
            <strong class="text-lg">Remont</strong><br/>
            Kui oled nõus, alustame tööd. Hoiame sind kursis protsessiga.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">4.</div>
          <div>
            <strong class="text-lg">Üleandmine</strong><br/>
            Anname arvuti üle, selgitame tehtud tööd ja anname nõu tulevikuks.
          </div>
        </div>
      </div>
    </Card>
  </Grid>
</Section>

<!-- Contact Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl text-white">
      <h2 class="text-4xl font-bold mb-8">Võta ühendust</h2>
      
      <Grid columns={2} gap="var(--space-6)">
        <Card variant="glass">
          <div class="mb-4">
            <MapPin size={32} class="mx-auto" />
          </div>
          <h3 class="text-xl font-bold mb-2">Asukoht</h3>
          <p>Akadeemia tee 5</p>
          <p>12616 Tallinn</p>
          <p class="mt-2">ICT-teaduskond, Raja 15 ruum 111</p>
        </Card>

        <Card variant="glass">
          <div class="mb-4">
            <Clock size={32} class="mx-auto" />
          </div>
          <h3 class="text-xl font-bold mb-2">Lahtiolekuajad</h3>
          <p>Esmaspäev - Reede</p>
          <p>10:00 - 16:00</p>
          <p class="mt-2 text-sm">Võta ette ühendust, et vältida ootamist</p>
        </Card>

        <Card variant="glass">
          <div class="mb-4">
            <Mail size={32} class="mx-auto" />
          </div>
          <h3 class="text-xl font-bold mb-2">E-post</h3>
          <a href="mailto:erki@lapikud.ee" class="hover:underline">
            erki@lapikud.ee
          </a>
        </Card>

        <Card variant="glass">
          <div class="mb-4">
            <Phone size={32} class="mx-auto" />
          </div>
          <h3 class="text-xl font-bold mb-2">Telefon</h3>
          <a href="tel:+37259079190" class="hover:underline">
            +372 5907 9190
          </a>
        </Card>
      </Grid>
    </div>
  </Center>
</Section>

<style>
  .feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: rgba(255, 127, 0, 0.1);
    border-radius: 50%;
    margin: 0 auto;
  }
</style>
