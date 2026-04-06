<script>
  import {
    Section,
    Grid,
    Card,
    Center,
    Container,
  } from "$components";
  import { onMount } from "svelte";
  import yaml from 'js-yaml';
  
  import Users from "lucide-svelte/icons/users";
  import GraduationCap from "lucide-svelte/icons/graduation-cap";
  import Code from "lucide-svelte/icons/code";
  import Calendar from "lucide-svelte/icons/calendar";
  import Lightbulb from "lucide-svelte/icons/lightbulb";
  import Trophy from "lucide-svelte/icons/trophy";

  let members = { junior: [], senior: [] };
  
  onMount(async () => {
    const response = await fetch('/_data/members.yml');
    const yamlText = await response.text();
    members = yaml.load(yamlText);
  });
</script>

<div class="safe-area-navbar">
<!-- Hero Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl">
      <h1 class="text-5xl font-bold mb-6">Liitu Meiega!</h1>
      <p class="text-2xl leading-relaxed">
        Tule arenda oma oskuseid ja saa ägedaid sõpru! Omanda praktilist kogemust reaalsetest projektidest.
      </p>
    </div>
  </Center>
</Section>

<!-- Benefits Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Miks Lapikutega liituda?</h2>
    <p class="text-xl text-gray-600">Siin on mõned põhjused, miks meie kogukond on suurepärane koht arenguks</p>
  </div>
  
  <Grid columns={3} gap="var(--space-5)">
    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Code size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Praktilised projektid</h3>
      <p class="text-gray-600">
        Osale reaalsetel tarkvaraarenduse projektidel. Omanda kogemust, mida ei õpeta ühelgi kursusel.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Users size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Tugev kogukond</h3>
      <p class="text-gray-600">
        Liitu sõbralike ja ambitsioonikate tudengitega. Leia oma meeskond ja loo püsivaid sõprussuhteid.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <GraduationCap size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Mentorlus</h3>
      <p class="text-gray-600">
        Saa juhendamist kogenud tudengitelt ja arendajatelt. Õpi parimate käest ja arene kiiremini.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Calendar size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Üritused</h3>
      <p class="text-gray-600">
        Osale huvitavatel üritustel, hackathonidel ja koolitustel. Laienda oma silmaringi ja võrgustikku.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Lightbulb size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Lõputööd</h3>
      <p class="text-gray-600">
        Meie projektidest kasvavad välja huvitavad lõputööd. Leia oma teema ja juhendaja meie seast.
      </p>
    </Card>

    <Card variant="glass">
      <div class="feature-icon mb-4" style="color: var(--orange)">
        <Trophy size={48} strokeWidth={1.5} />
      </div>
      <h3 class="text-2xl font-bold mb-3">Töökogemus</h3>
      <p class="text-gray-600">
        Aktiivsed liikmed saavad võimaluse teenida oma esimest töökogemust ja palka meie projektides.
      </p>
    </Card>
  </Grid>
</Section>

<!-- What You'll Do Section -->
<Section background="neutral">
  <Grid gap="var(--space-5)">
    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-4">Mida saad teha?</h2>
      <div class="space-y-4 text-lg">
        <p>
          <strong>Tarkvara arendus:</strong> Töötad reaalsetel projektidel kasutades kaasaegseid tehnoloogiaid. 
          Õpid koodi kirjutamist meeskonnas, versioonihaldustööriistade kasutamist ja tarkvara kvaliteedi tagamist.
        </p>
        <p>
          <strong>Helpdesk:</strong> Aita tudengeid ja õppejõude IT-probleemide lahendamisel. 
          Arenda oma tehnilisi oskuseid ja õpi suhtlemist klientidega.
        </p>
        <p>
          <strong>Projektijuhtimine:</strong> Võta vastutus projekti koordineerimise eest. 
          Õpi planeerimist, meeskonna juhtimist ja suhtlemist klientidega.
        </p>
        <p>
          <strong>Turundus ja disain:</strong> Aita meie projektide ja ürituste turundamisel. 
          Loo sisu sotsiaalmeedias, disaini materjale ja jälgi tulemusi.
        </p>
      </div>
    </Card>

    <Card variant="glass">
      <h2 class="text-4xl font-bold mb-4">Kuidas liituda?</h2>
      <div class="space-y-4 text-lg">
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">1.</div>
          <div>
            <strong>Võta ühendust</strong><br/>
            Kirjuta meile e-posti aadressil <a href="mailto:lapikud@lapikud.ee" class="text-orange-500 hover:underline">lapikud@lapikud.ee</a> 
            või tule meie kontorisse Akadeemia tee 5.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">2.</div>
          <div>
            <strong>Tutvumine</strong><br/>
            Kohtu meie meeskonnaga, tutvusta ennast ja räägi oma huvidest. Näitame sulle meie projekte ja võimalusi.
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="text-3xl font-bold" style="color: var(--orange)">3.</div>
          <div>
            <strong>Alusta tööd</strong><br/>
            Leia endale sobiv projekt või meeskond ja hakka tegutsema! Meie mentorid aitavad sind iga sammu juures.
          </div>
        </div>
      </div>
    </Card>
  </Grid>
</Section>

<!-- Members Section -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Meie liikmed</h2>
    <p class="text-xl text-gray-600">Suurepärased inimesed, kes moodustavad meie kogukonna</p>
  </div>
  
  {#if members.senior && members.senior.length > 0}
    <div class="mb-12">
      <h3 class="text-3xl font-bold mb-6 text-center">Vanemliikmed</h3>
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
      <h3 class="text-3xl font-bold mb-6 text-center">Noorliikmed</h3>
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
