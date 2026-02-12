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
  
  import Mail from "lucide-svelte/icons/mail";
  import Phone from "lucide-svelte/icons/phone";
  import MessageCircle from "lucide-svelte/icons/message-circle";
  import User from "lucide-svelte/icons/user";

  let mentors = [];
  
  onMount(async () => {
    const response = await fetch('/_data/mentors.yml');
    const yamlText = await response.text();
    mentors = yaml.load(yamlText);
  });

  function getContactIcon(contactType) {
    const type = contactType.toLowerCase();
    if (type.includes('email') || type.includes('e-post')) return Mail;
    if (type.includes('phone') || type.includes('telefon')) return Phone;
    if (type.includes('messenger') || type.includes('discord') || type.includes('facebook')) return MessageCircle;
    return User;
  }

  function getContactLink(method) {
    const type = method.name.toLowerCase();
    const value = method.value;
    
    if (type.includes('email')) return `mailto:${value}`;
    if (type.includes('phone') || type.includes('telefon')) return `tel:${value}`;
    if (type.includes('messenger') || type.includes('facebook')) {
      return value.startsWith('http') ? value : `https://m.me/${value}`;
    }
    if (type.includes('discord')) return '#';
    
    return value.startsWith('http') ? value : '#';
  }
</script>

<!-- Hero Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl">
      <h1 class="text-5xl font-bold mb-6">Meie Mentorid</h1>
      <p class="text-2xl leading-relaxed">
        Kogenud tudengid, kes aitavad sind areneda ja jagavad oma teadmisi
      </p>
    </div>
  </Center>
</Section>

<!-- Mentors Grid -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Tutvuge meie mentorite meeskonnaga</h2>
    <p class="text-xl text-gray-600">Igaüks neist on spetsialist omas valdkonnas ja valmis sind aitama</p>
  </div>
  
  <Grid columns={2} gap="var(--space-6)">
    {#each mentors as mentor}
      <Card variant="glass" class="overflow-hidden">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Mentor Photo -->
          {#if mentor.photo}
            <div class="shrink-0">
              <img 
                src={`/assets/mentors-images/optimised/${mentor.photo}`} 
                alt={mentor.name}
                class="w-full md:w-48 h-48 object-cover rounded-lg"
                on:error={(e) => {
                  e.target.src = '/assets/mentors-images/original/' + mentor.photo;
                }}
              />
            </div>
          {/if}
          
          <!-- Mentor Info -->
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-2">{mentor.name}</h3>
            
            {#if mentor.age}
              <p class="text-gray-600 mb-2">Vanus: {mentor.age}</p>
            {/if}
            
            {#if mentor.speciality}
              <p class="text-lg font-semibold mb-2" style="color: var(--orange)">
                {getLangText(mentor, 'speciality', $currentLang)}
              </p>
            {/if}
            
            {#if mentor.teams && mentor.teams.length > 0}
              <div class="mb-3">
                <span class="font-semibold">Meeskonnad: </span>
                <span class="text-gray-700">{mentor.teams.join(', ')}</span>
              </div>
            {/if}
            
            {#if mentor.term}
              <p class="text-gray-600 mb-3">Ametiperiood: {mentor.term} {mentor.term === 1 ? 'aasta' : 'aastat'}</p>
            {/if}
            
            {#if mentor.description}
              <p class="text-sm font-semibold mb-2" style="color: var(--orange)">
                Otsin: {getLangText(mentor, 'description', $currentLang)}
              </p>
            {/if}
            
            {#if mentor.activities}
              <p class="text-gray-700 text-sm mb-4 line-clamp-3">
                {getLangText(mentor, 'activities', $currentLang)}
              </p>
            {/if}
            
            <!-- Contact Methods -->
            {#if mentor.contactMethods && mentor.contactMethods.length > 0}
              <div class="flex flex-wrap gap-2 mt-4">
                {#each mentor.contactMethods as method}
                  {@const IconComponent = getContactIcon(method.name)}
                  <a 
                    href={getContactLink(method)}
                    class="inline-flex items-center gap-2 px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors text-sm"
                    title={method.name}
                    target={method.value.startsWith('http') ? '_blank' : '_self'}
                    rel={method.value.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    <svelte:component this={IconComponent} size={16} />
                    <span class="capitalize">{method.name}</span>
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </Card>
    {/each}
  </Grid>
</Section>

<!-- Become a Mentor Section -->
<Section background="neutral">
  <Center>
    <Card variant="glass" class="max-w-3xl">
      <h2 class="text-4xl font-bold mb-6 text-center">Taha saada mentoriks?</h2>
      <p class="text-lg text-center mb-6">
        Kui oled kogenud tudeng ja soovid jagada oma teadmisi ning aidata uusi liikmeid, 
        siis võta meiega ühendust!
      </p>
      <div class="text-center">
        <a 
          href="mailto:lapikud@lapikud.ee" 
          class="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
        >
          Võta ühendust
        </a>
      </div>
    </Card>
  </Center>
</Section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
