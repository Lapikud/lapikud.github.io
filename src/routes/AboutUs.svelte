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
  
  import Users from "lucide-svelte/icons/users";
  import History from "lucide-svelte/icons/history";
  import Target from "lucide-svelte/icons/target";
  import Heart from "lucide-svelte/icons/heart";
  import Award from "lucide-svelte/icons/award";
  import Sparkles from "lucide-svelte/icons/sparkles";
  import Mail from "lucide-svelte/icons/mail";
  import Phone from "lucide-svelte/icons/phone";

  let management = [];
  let pastManagement = [];
  
  onMount(async () => {
    const [mgmtResponse, pastResponse] = await Promise.all([
      fetch('/_data/management.yml'),
      fetch('/_data/past_management.yml')
    ]);
    
    const [mgmtText, pastText] = await Promise.all([
      mgmtResponse.text(),
      pastResponse.text()
    ]);
    
    management = yaml.load(mgmtText);
    pastManagement = yaml.load(pastText);
  });
</script>

<div class="safe-area-navbar">
<!-- Hero Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl">
      <h1 class="text-5xl font-bold mb-6">Kes me oleme?</h1>
      <p class="text-2xl leading-relaxed">
        MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, 
        mis ühendab endisi ja praegusi IT huvilisi tudengeid
      </p>
    </div>
  </Center>
</Section>

<!-- History Section -->
<Section>
  <Grid gap="var(--space-5)">
    <Card variant="glass">
      <div class="flex items-center gap-4 mb-6">
        <div class="feature-icon" style="color: var(--orange)">
          <History size={32} strokeWidth={1.5} />
        </div>
        <h2 class="text-4xl font-bold">Meie lugu</h2>
      </div>
      <div class="space-y-4 text-lg">
        <p>
          Organisatsioon loodi <strong>2002. aastal</strong> informaatika tudengite poolt, 
          kelle erialatunnuseks oli "LAP". Targad mehed otsustasid, et järelikult on nad "Lapikud".
        </p>
        <p>
          Üle 20 aasta oleme kasvanud väikesest tudengite grupist suureks kogukonnaks, 
          mis on aidanud sadadel tudengitel saada väärtuslikku kogemust IT-valdkonnas.
        </p>
        <p>
          Täna oleme uhked oma traditsiooni üle ja jätkame sellega, 
          et pakkuda tudengitele võimalusi areneda ja kasvada.
        </p>
      </div>
    </Card>

    <Card variant="glass">
      <div class="flex items-center gap-4 mb-6">
        <div class="feature-icon" style="color: var(--orange)">
          <Target size={32} strokeWidth={1.5} />
        </div>
        <h2 class="text-4xl font-bold">Meie eesmärk</h2>
      </div>
      <div class="space-y-4 text-lg">
        <p>
          Meie põhieesmärgiks on Tallinna Tehnikaülikooli IT tudengitele 
          <strong>erialase lisandväärtuse loomine</strong>.
        </p>
        <p>
          Kaasame tudengeid huvitavatesse IT projektidesse ning anname tudengitele võimaluse 
          midagi reaalset oma käega ära teha. Aktiivsetel tudengitel on võimalus saada meie juures esimene töökogemus.
        </p>
        <p>
          Meie projektidest kooruvad välja huvitavad ja tarvilikud lõputööd ning 
          meie liikmeskonnast on tulnud ka lõputöö juhendajaid.
        </p>
      </div>
    </Card>
  </Grid>
</Section>

<!-- Values Section -->
<Section background="neutral">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Meie väärtused</h2>
    <p class="text-xl text-gray-600">Mis meile oluline on</p>
  </div>
  
  <Grid columns={3} gap="var(--space-5)">
    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Users size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Kogukond</h3>
      <p class="text-gray-600">
        Oleme tugev kogukond, kus iga liige on oluline. Toetame ja aitame üksteist.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Award size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Kvaliteet</h3>
      <p class="text-gray-600">
        Teeme tööd südamega ja püüdleme alati parima tulemuse poole.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Sparkles size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Innovatsioon</h3>
      <p class="text-gray-600">
        Kasutame uusimaid tehnoloogiaid ja otsime alati paremaid lahendusi.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Heart size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Kirg</h3>
      <p class="text-gray-600">
        Teeme seda, mida armastame. Meie kirglikud liikmed on meie tugevus.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Users size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Kaasamine</h3>
      <p class="text-gray-600">
        Kaasame kõiki teaduskondi - IT, majandus, inseneeria ja muud.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Target size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Praktiline</h3>
      <p class="text-gray-600">
        Teeme reaalset tööd, mis annab tudengitele praktilist kogemust.
      </p>
    </Card>
  </Grid>
</Section>

<!-- Current Management -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Meie juhatus</h2>
    <p class="text-xl text-gray-600">Inimesed, kes viivad organisatsiooni edasi</p>
  </div>
  
  <Grid columns={2} gap="var(--space-6)">
    {#each management as person}
      <Card variant="glass">
        <div class="flex flex-col md:flex-row gap-6">
          {#if person.photo}
            <div class="shrink-0">
              <img 
                src={`/assets/management-images/${person.photo}`}
                alt={person.name}
                class="w-full md:w-48 h-48 object-cover rounded-lg"
              />
            </div>
          {/if}
          
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-2">{person.name}</h3>
            <p class="text-lg font-semibold mb-2" style="color: var(--orange)">
              {getLangText(person, 'role', $currentLang)}
            </p>
            {#if person.subrole}
              <p class="text-gray-600 mb-4">{getLangText(person, 'subrole', $currentLang)}</p>
            {/if}
            
            <div class="space-y-2">
              {#if person.email}
                <div class="flex items-center gap-2">
                  <Mail size={18} style="color: var(--orange)" />
                  <a href={`mailto:${person.email}`} class="hover:underline">
                    {person.email}
                  </a>
                </div>
              {/if}
              {#if person.phone}
                <div class="flex items-center gap-2">
                  <Phone size={18} style="color: var(--orange)" />
                  <a href={`tel:${person.phone}`} class="hover:underline">
                    {person.phone}
                  </a>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </Card>
    {/each}
  </Grid>
</Section>

<!-- Past Management -->
{#if pastManagement && pastManagement.length > 0}
  <Section background="neutral">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4">Endised juhatused</h2>
      <p class="text-xl text-gray-600">Täname kõiki, kes on organisatsiooni juhtinud</p>
    </div>
    
    <div class="space-y-12">
      {#each pastManagement as yearGroup}
        <div>
          <h3 class="text-3xl font-bold mb-6 text-center">{yearGroup.year}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {#each yearGroup.members as member}
              <Card variant="glass" class="text-center">
                {#if member.image}
                  <img 
                    src={`/assets/past-management-images/optimised/${member.image}`}
                    alt={member.name}
                    class="w-full h-32 object-cover rounded-lg mb-3"
                    on:error={(e) => {
                      e.target.src = '/assets/past-management-images/original/' + member.image;
                    }}
                  />
                {/if}
                <p class="font-semibold">{member.name}</p>
              </Card>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </Section>
{/if}
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
  }
</style>
