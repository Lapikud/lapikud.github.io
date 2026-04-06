<script>
  import {
    Section,
    Grid,
    Card,
    Center,
  } from "$components";
  import { onMount } from "svelte";
  import yaml from 'js-yaml';
  import { currentLang, getLangText } from "$lib";
  
  import Rocket from "lucide-svelte/icons/rocket";
  import Users from "lucide-svelte/icons/users";
  import Target from "lucide-svelte/icons/target";
  import Briefcase from "lucide-svelte/icons/briefcase";
  import Code from "lucide-svelte/icons/code";
  import Smartphone from "lucide-svelte/icons/smartphone";
  import Globe from "lucide-svelte/icons/globe";
  import ArrowRight from "lucide-svelte/icons/arrow-right";
  import ExternalLink from "lucide-svelte/icons/external-link";

  let projects = [];
  
  onMount(async () => {
    const response = await fetch('/_data/ourwork.yml');
    const yamlText = await response.text();
    projects = yaml.load(yamlText).filter(p => p.title);
  });

  const services = [
    {
      icon: Globe,
      title: "Veebilahendused",
      description: "Kaasaegsed ja responsiivsed veebilehed, mis toimivad igal seadmel"
    },
    {
      icon: Smartphone,
      title: "Mobiilirakendused",
      description: "iOS ja Android rakendused kasutajasõbralike liidestega"
    },
    {
      icon: Code,
      title: "Tarkvara arendus",
      description: "Kohandatud tarkvaralahendused teie ärivajadusteks"
    },
    {
      icon: Briefcase,
      title: "Konsultatsioon",
      description: "IT-nõustamine ja projekti planeerimine"
    }
  ];

  const whyUs = [
    {
      icon: Users,
      title: "Motiveeritud meeskond",
      description: "Meie tudengid on andekad, õhevil ja tahavad tõestada oma oskuseid"
    },
    {
      icon: Target,
      title: "Kvaliteetne tulemus",
      description: "Võtame iga projekti tõsiselt ja pingutame parima tulemuse nimel"
    },
    {
      icon: Rocket,
      title: "Kaasaegsed tehnoloogiad",
      description: "Kasutame uusimaid tööriistu ja tehnoloogiaid"
    }
  ];
</script>

<div class="safe-area-navbar">
<!-- Hero Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl">
      <h1 class="text-5xl font-bold mb-6">Ettevõttele</h1>
      <p class="text-2xl leading-relaxed">
        Aitame sinu ideed ellu viia! Meie kogenud tudengid on valmis teie projekte realiseerima.
      </p>
    </div>
  </Center>
</Section>

<!-- Services Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Mida me pakume?</h2>
    <p class="text-xl text-gray-600">Laia valik IT-teenuseid teie ärivajaduste täitmiseks</p>
  </div>
  
  <Grid columns={2} gap="var(--space-5)">
    {#each services as service}
      <Card variant="glass">
        <div class="feature-icon mb-4" style="color: var(--orange)">
          <svelte:component this={service.icon} size={48} strokeWidth={1.5} />
        </div>
        <h3 class="text-2xl font-bold mb-3">{service.title}</h3>
        <p class="text-gray-600">{service.description}</p>
      </Card>
    {/each}
  </Grid>
</Section>

<!-- Why Choose Us -->
<Section background="neutral">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Miks meiega koostööd teha?</h2>
  </div>
  
  <Grid columns={3} gap="var(--space-5)">
    {#each whyUs as item}
      <Card variant="glass">
        <div class="feature-icon mb-4" style="color: var(--orange)">
          <svelte:component this={item.icon} size={48} strokeWidth={1.5} />
        </div>
        <h3 class="text-2xl font-bold mb-3">{item.title}</h3>
        <p class="text-gray-600">{item.description}</p>
      </Card>
    {/each}
  </Grid>
</Section>

<!-- Process Section -->
<Section>
  <Grid gap="var(--space-5)">
    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-6">Kuidas töötame?</h2>
      <div class="space-y-6">
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">1.</div>
          <div>
            <strong class="text-lg">Esimene kohtumine</strong><br/>
            Arutame teie ideed, vajadusi ja eesmärke. Mõistame, mida soovite saavutada.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">2.</div>
          <div>
            <strong class="text-lg">Planeerimine</strong><br/>
            Koostame projekti plaani, hinnapakkumise ja ajakava. Lepime kokku detailides.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">3.</div>
          <div>
            <strong class="text-lg">Arendus</strong><br/>
            Meie meeskond töötab teie projekti kallal. Hoiame teid regulaarselt kursis.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">4.</div>
          <div>
            <strong class="text-lg">Üleandmine</strong><br/>
            Anname valmis toote üle koos dokumentatsiooni ja juhendamisega.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">5.</div>
          <div>
            <strong class="text-lg">Tugi</strong><br/>
            Pakume vajadusel jätkuvat tuge ja hooldust.
          </div>
        </div>
      </div>
    </Card>

    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-6">Millal meie sobime?</h2>
      <div class="space-y-4 text-lg">
        <p>
          <strong>Startup ja väikeettevõtted:</strong> Meie teenused on hinnaefektiivsed ja paindlikud, 
          sobides hästi piiratud eelarvega projektidele.
        </p>
        <p>
          <strong>Prototüüpide arendus:</strong> Vajate kiiresti töökorras prototüüpi? 
          Meie agile meeskond suudab kiiresti teie idee ellu viia.
        </p>
        <p>
          <strong>Lõputööd ja projektid:</strong> Teie projekt võib saada meie tudengite 
          lõputöö teemaks, mis tagab motiveeritud ja pühendunud meeskonna.
        </p>
        <p>
          <strong>Pikaajalised projektid:</strong> Pakume ka pikemaajalisi koostöövõimalusi 
          keerulisemate süsteemide arendamiseks.
        </p>
      </div>
    </Card>
  </Grid>
</Section>

<!-- Portfolio Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Meie tehtud tööd</h2>
    <p class="text-xl text-gray-600">Vaata, mida oleme varem loonud</p>
  </div>
  
  <Grid columns={3} gap="var(--space-5)">
    {#each projects as project}
      <Card variant="animated-neutral">
        {#if project.photo}
          <div class="mb-4 overflow-hidden rounded-lg">
            <img 
              src={`/assets/ourwork-images/optimised/${project.photo}`}
              alt={getLangText(project, 'title', $currentLang)}
              class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              on:error={(e) => {
                e.target.src = '/assets/ourwork-images/original/' + project.photo;
              }}
            />
          </div>
        {/if}
        
        <h3 class="text-xl font-bold mb-2">{getLangText(project, 'title', $currentLang)}</h3>
        
        {#if project.description}
          <p class="text-gray-600 text-sm mb-4">{getLangText(project, 'description', $currentLang)}</p>
        {/if}
        
        {#if project.url}
          <a 
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold"
          >
            Vaata projekti <ExternalLink size={16} />
          </a>
        {/if}
      </Card>
    {/each}
  </Grid>
</Section>

<!-- CTA Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl text-white">
      <h2 class="text-4xl font-bold mb-6">Alustame koostööd?</h2>
      <p class="text-xl mb-8">
        Võta ühendust ja arutame, kuidas saame sinu ideed ellu viia!
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a 
          href="mailto:lapikud@lapikud.ee"
          class="inline-flex items-center gap-2 px-8 py-3 bg-white text-orange-500 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
        >
          Saada e-kiri <ArrowRight size={20} />
        </a>
        <a 
          href="/contact"
          class="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-orange-500 font-semibold rounded-lg transition-colors"
        >
          Kontaktandmed
        </a>
      </div>
    </div>
  </Center>
</Section>
</div>

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
