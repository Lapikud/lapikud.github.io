<script>
  import {
    Section,
    Grid,
    Card,
    Center,
    Container,
    Stack,
  } from "$components";
  import { onMount } from "svelte";
  import yaml from 'js-yaml';
  import { currentLang, getLangText } from "$lib";
  import Mailbox from "lucide-svelte/icons/mailbox";
  import Phone from "lucide-svelte/icons/phone";

  let currentManagement = [];
  let pastManagement = [];
  let lang = 'est';

  currentLang.subscribe(value => {
    lang = value;
  });

  onMount(async () => {
    try {
      const currentRes = await fetch('/_data/management.yml');
      const currentYaml = await currentRes.text();
      currentManagement = yaml.load(currentYaml) || [];

      const pastRes = await fetch('/_data/past_management.yml');
      const pastYaml = await pastRes.text();
      pastManagement = yaml.load(pastYaml) || [];
    } catch (error) {
      console.error('Error loading management data:', error);
    }
  });
</script>

<!-- Current Management Section -->
<Section padding="large">
    <Center>
      <h1 class="text-4xl font-light pb-8 text-center">Praegune juhtkond</h1>
    </Center>
    <Grid min="500px" gap="3rem">
      {#each currentManagement as member (member.name)}
        <div class="flex flex-col sm:flex-row gap-6 items-start">
          <div class="w-full sm:w-auto sm:max-w-[200px] aspect-square shrink-0">
            <img
              src={`/assets/management-images/${member.photo}`}
              alt={member.name}
              class="w-full h-full object-cover rounded-md"
            />
          </div>
          <div class="flex flex-col gap-2 grow">
            <h3 class="text-2xl font-medium">{member.name}</h3>
            <p class="text-base text-gray-700">
              {getLangText(member, 'role', lang)} - {getLangText(member, 'subrole', lang)}
            </p>
            <a
              href="mailto:{member.email}"
              class="text-base flex items-center gap-2 text-[#f0941d] hover:opacity-80 transition"
            >
              <Mailbox size={18} />{member.email}
            </a>
            <a
              href="tel:{member.phone}"
              class="text-base flex items-center gap-2 text-[#f0941d] hover:opacity-80 transition"
            >
              <Phone size={18} />{member.phone}
            </a>
          </div>
        </div>
      {/each}
    </Grid>
</Section>

<!-- Past Management Section -->
<Section padding="large" background="rgba(240, 148, 29, 0.05)">
  <Container>
    <Center>
      <h1 class="text-4xl font-light pb-8 text-center">
        Organisatsiooni juhtinud inimesed läbi aegade
      </h1>
    </Center>
    <Stack gap="3rem">
      {#each pastManagement as yearData (yearData.year)}
        <div>
          <div class="flex items-center gap-4 pb-6 mb-6 border-b-2 border-[#f0941d]">
            <h2 class="text-3xl font-light text-[#f0941d] whitespace-nowrap">
              {yearData.year}
            </h2>
          </div>
          <Grid min="120px" gap="1rem">
            {#each yearData.members as member (member.name)}
              <div class="flex flex-col items-center">
                <div class="w-full h-auto max-w-[150px] mx-auto aspect-square mb-3">
                  <img
                    src={`/assets/past-management-images/optimised/${member.image}`}
                    alt={member.name}
                    class="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h3 class="text-base font-medium text-center">
                  {member.name}
                </h3>
              </div>
            {/each}
          </Grid>
        </div>
      {/each}
    </Stack>
  </Container>
</Section>