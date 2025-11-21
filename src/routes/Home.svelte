<script>
  import {
    Button,
    ButtonBorderless,
    Container,
    Card,
    Stack,
    Grid,
  } from "@/components/index.js";
</script>

<Container>
  <Stack gap="var(--space-6)">
    <Card>
      <h1>Kes me oleme?</h1>
      <p>
        Organisatsioon loodi 2002. aastal informaatika tudengite poolt, kelle
        erialatunnuseks oli “LAP”. Targad mehed otsustasid, et järelikult on nad
        “Lapikud”.
      </p>
      <Button href="/docs/getting-started">Get Started</Button>
      <ButtonBorderless href="/docs/components"
        >Explore Components</ButtonBorderless
      >
    </Card>

    <Grid min="250px" gap="var(--space-4)">
      <Card>
        <h2>Mis on HELPDESK?</h2>
        <p>
          HELPDESK on MTÜ Lapikute poolt pakutav arvutiabiteenus. Teenus on
          suunatud tudengitele, õppejõududele ning kõikidele huvilistele ka
          väljaspool Tallinna Tehnikaülikooli. Meie meeskond koosneb kogenud ja
          nutikatest Tallinna Tehnikaülikooli IT-tudengitest.
        </p>
      </Card>
      <Card>
        <h2>Mis teenuseid osutame?</h2>
        <p>
          Arvuti riistvara diagnostika ja remont Arvuti riistvara hooldus
          Tarkvara diagnostika ja seadistamine Tarkvara paigaldamine Muu
          elektroonika parandamine
        </p>
      </Card>
    </Grid>
  </Stack>
</Container>
