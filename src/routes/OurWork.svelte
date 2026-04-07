<script>
  import {
    Section,
    Grid,
    Card,
    Center,
  } from "$components";
  import { onMount, onDestroy } from "svelte";
  import yaml from 'js-yaml';
  import { currentLang, getLangText, createPageTextStore } from "$lib";
  
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
  const text = createPageTextStore("OurWork");
  
  onMount(async () => {
    const response = await fetch('/_data/ourwork.yml');
    const yamlText = await response.text();
    projects = yaml.load(yamlText).filter(p => p.title);
  });

  onDestroy(() => {
    text.destroy();
  });

  $: services = [
    {
      icon: Globe,
      title: $text["services"]?.items?.[0]?.title || "Veebilahendused",
      description: $text["services"]?.items?.[0]?.description || "Kaasaegsed ja responsiivsed veebilehed, mis toimivad igal seadmel"
    },
    {
      icon: Smartphone,
      title: $text["services"]?.items?.[1]?.title || "Mobiilirakendused",
      description: $text["services"]?.items?.[1]?.description || "iOS ja Android rakendused kasutajasõbralike liidestega"
    },
    {
      icon: Code,
      title: $text["services"]?.items?.[2]?.title || "Tarkvara arendus",
      description: $text["services"]?.items?.[2]?.description || "Kohandatud tarkvaralahendused teie ärivajadusteks"
    },
    {
      icon: Briefcase,
      title: $text["services"]?.items?.[3]?.title || "Konsultatsioon",
      description: $text["services"]?.items?.[3]?.description || "IT-nõustamine ja projekti planeerimine"
    }
  ];

  $: whyUs = [
    {
      icon: Users,
      title: $text["whyUs"]?.items?.[0]?.title || "Motiveeritud meeskond",
      description: $text["whyUs"]?.items?.[0]?.description || "Meie tudengid on andekad, õhevil ja tahavad tõestada oma oskuseid"
    },
    {
      icon: Target,
      title: $text["whyUs"]?.items?.[1]?.title || "Kvaliteetne tulemus",
      description: $text["whyUs"]?.items?.[1]?.description || "Võtame iga projekti tõsiselt ja pingutame parima tulemuse nimel"
    },
    {
      icon: Rocket,
      title: $text["whyUs"]?.items?.[2]?.title || "Kaasaegsed tehnoloogiad",
      description: $text["whyUs"]?.items?.[2]?.description || "Kasutame uusimaid tööriistu ja tehnoloogiaid"
    }
  ];
</script>

<div class="safe-area-navbar">
<!-- Hero Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl">
      <h1 class="text-5xl font-bold mb-6">{$text["hero"]?.title || "Ettevõttele"}</h1>
      <p class="text-2xl leading-relaxed">
        {$text["hero"]?.description || "Aitame sinu ideed ellu viia! Meie kogenud tudengid on valmis teie projekte realiseerima."}
      </p>
    </div>
  </Center>
</Section>

<!-- Services Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">{$text["services"]?.title || "Mida me pakume?"}</h2>
    <p class="text-xl text-gray-600">{$text["services"]?.subtitle || "Laia valik IT-teenuseid teie ärivajaduste täitmiseks"}</p>
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
    <h2 class="text-4xl font-bold mb-4">{$text["whyUs"]?.title || "Miks meiega koostööd teha?"}</h2>
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
      <h2 class="text-4xl font-bold mb-6">{$text["process"]?.title || "Kuidas töötame?"}</h2>
      <div class="space-y-6">
        {#each $text["process"]?.steps || [] as step, index}
          <div class="flex items-start gap-4">
            <div class="text-3xl font-bold" style="color: var(--orange)">{index + 1}.</div>
            <div>
              <strong class="text-lg">{step.title}</strong><br/>
              {step.description}
            </div>
          </div>
        {/each}
      </div>
    </Card>

    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-6">{$text["fit"]?.title || "Millal meie sobime?"}</h2>
      <div class="space-y-4 text-lg">
        {#each $text["fit"]?.items || [] as item}
          <p>
            <strong>{item.title}</strong> {item.description}
          </p>
        {/each}
      </div>
    </Card>
  </Grid>
</Section>

<!-- Portfolio Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">{$text["portfolio"]?.title || "Meie tehtud tööd"}</h2>
    <p class="text-xl text-gray-600">{$text["portfolio"]?.subtitle || "Vaata, mida oleme varem loonud"}</p>
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
            {$text["portfolio"]?.projectLink || "Vaata projekti"} <ExternalLink size={16} />
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
      <h2 class="text-4xl font-bold mb-6">{$text["cta"]?.title || "Alustame koostööd?"}</h2>
      <p class="text-xl mb-8">
        {$text["cta"]?.description || "Võta ühendust ja arutame, kuidas saame sinu ideed ellu viia!"}
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a 
          href="mailto:lapikud@lapikud.ee"
          class="inline-flex items-center gap-2 px-8 py-3 bg-white text-orange-500 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
        >
          {$text["cta"]?.emailButton || "Saada e-kiri"} <ArrowRight size={20} />
        </a>
        <a 
          href="/contact"
          class="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-orange-500 font-semibold rounded-lg transition-colors"
        >
          {$text["cta"]?.contactButton || "Kontaktandmed"}
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
