<script>
  import {
    Section,
    Grid,
    Card,
    Center,
  } from "$components";
  import { onMount, onDestroy } from "svelte";
  import yaml from 'js-yaml';
  import { createPageTextStore } from "$lib";
  
  import Users from "lucide-svelte/icons/users";
  import GraduationCap from "lucide-svelte/icons/graduation-cap";
  import Code from "lucide-svelte/icons/code";
  import Calendar from "lucide-svelte/icons/calendar";
  import Lightbulb from "lucide-svelte/icons/lightbulb";
  import Trophy from "lucide-svelte/icons/trophy";

  let members = { junior: [], senior: [] };
  const text = createPageTextStore("Student");
  
  onMount(async () => {
    const response = await fetch('/_data/members.yml');
    const yamlText = await response.text();
    members = yaml.load(yamlText);
  });

  onDestroy(() => {
    text.destroy();
  });

  $: benefits = [
    { icon: Code, ...($text["benefits"]?.items?.[0] || { title: "Praktilised projektid", description: "Osale reaalsetel tarkvaraarenduse projektidel. Omanda kogemust, mida ei õpeta ühelgi kursusel." }) },
    { icon: Users, ...($text["benefits"]?.items?.[1] || { title: "Tugev kogukond", description: "Liitu sõbralike ja ambitsioonikate tudengitega. Leia oma meeskond ja loo püsivaid sõprussuhteid." }) },
    { icon: GraduationCap, ...($text["benefits"]?.items?.[2] || { title: "Mentorlus", description: "Saa juhendamist kogenud tudengitelt ja arendajatelt. Õpi parimate käest ja arene kiiremini." }) },
    { icon: Calendar, ...($text["benefits"]?.items?.[3] || { title: "Üritused", description: "Osale huvitavatel üritustel, hackathonidel ja koolitustel. Laienda oma silmaringi ja võrgustikku." }) },
    { icon: Lightbulb, ...($text["benefits"]?.items?.[4] || { title: "Lõputööd", description: "Meie projektidest kasvavad välja huvitavad lõputööd. Leia oma teema ja juhendaja meie seast." }) },
    { icon: Trophy, ...($text["benefits"]?.items?.[5] || { title: "Töökogemus", description: "Aktiivsed liikmed saavad võimaluse teenida oma esimest töökogemust ja palka meie projektides." }) },
  ];
</script>

<div class="safe-area-navbar">
<!-- Hero Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl">
      <h1 class="text-5xl font-bold mb-6">{$text["hero"]?.title || "Liitu Meiega!"}</h1>
      <p class="text-2xl leading-relaxed">
        {$text["hero"]?.description || "Tule arenda oma oskuseid ja saa ägedaid sõpru! Omanda praktilist kogemust reaalsetest projektidest."}
      </p>
    </div>
  </Center>
</Section>

<!-- Benefits Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">{$text["benefits"]?.title || "Miks Lapikutega liituda?"}</h2>
    <p class="text-xl text-gray-600">{$text["benefits"]?.subtitle || "Siin on mõned põhjused, miks meie kogukond on suurepärane koht arenguks"}</p>
  </div>
  
  <Grid columns={3} gap="gap-5">
    {#each benefits as benefit}
      <Card variant="glass">
        <div class="feature-icon mb-4" style="color: var(--orange)">
          <svelte:component this={benefit.icon} size={48} strokeWidth={1.5} />
        </div>
        <h3 class="text-2xl font-bold mb-3">{benefit.title}</h3>
        <p class="text-gray-600">{benefit.description}</p>
      </Card>
    {/each}
  </Grid>
</Section>

<!-- What You'll Do Section -->
<Section background="neutral">
  <Grid gap="gap-5">
    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-4">{$text["activities"]?.title || "Mida saad teha?"}</h2>
      <div class="space-y-4 text-lg">
        {#each $text["activities"]?.items || [] as item}
          <p>
            <strong>{item.title}</strong> {item.description}
          </p>
        {/each}
      </div>
    </Card>

    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-4">{$text["join"]?.title || "Kuidas liituda?"}</h2>
      <div class="space-y-4 text-lg">
        {#each $text["join"]?.steps || [] as step, index}
          <div class="flex items-start gap-4">
            <div class="text-3xl font-bold" style="color: var(--orange)">{index + 1}.</div>
            <div>
              <strong>{step.title}</strong><br/>
              {#if index === 0}
                {step.description || "Kirjuta meile e-posti aadressil"} <a href="mailto:lapikud@lapikud.ee" class="text-orange-500 hover:underline">lapikud@lapikud.ee</a> {step.descriptionEnd || "või tule meie kontorisse Akadeemia tee 5."}
              {:else}
                {step.description}
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </Grid>
</Section>

<!-- Members Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">{$text["members"]?.title || "Meie liikmed"}</h2>
    <p class="text-xl text-gray-600">{$text["members"]?.subtitle || "Suurepärased inimesed, kes moodustavad meie kogukonna"}</p>
  </div>
  
  {#if members.senior && members.senior.length > 0}
    <div class="mb-12">
      <h3 class="text-3xl font-bold mb-6 text-center">{$text["members"]?.senior || "Vanemliikmed"}</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {#each members.senior as member}
          <div class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <p class="text-center font-medium">{member}</p>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if members.junior && members.junior.length > 0}
    <div>
      <h3 class="text-3xl font-bold mb-6 text-center">{$text["members"]?.junior || "Noorliikmed"}</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {#each members.junior as member}
          <div class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <p class="text-center font-medium">{member}</p>
          </div>
        {/each}
      </div>
    </div>
  {/if}
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
