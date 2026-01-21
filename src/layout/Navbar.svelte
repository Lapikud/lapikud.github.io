<script>
  import {
    Button,
    Dropdown,
    Grid,
    Section,
  } from "$components";
  import { navigate, getPath, currentLang, text, switchLang } from "$lib";

  // Icon imports (Lucide)
  import Coffee from "lucide-svelte/icons/coffee";
  import CalendarClock from "lucide-svelte/icons/calendar-clock";
  import Presentation from "lucide-svelte/icons/presentation";
  import Swords from "lucide-svelte/icons/swords";
  import Lectern from "lucide-svelte/icons/lectern";
  import Bot from "lucide-svelte/icons/bot";
  import HandHeart from "lucide-svelte/icons/hand-heart";
  import Trophy from "lucide-svelte/icons/trophy";
</script>

<Section padding="small">
  <Grid>
    <nav class="z-10 flex gap-4 justify-end text-xl">
        <Dropdown borderRadius="4px" name={$text.nav.about} variant="borderless">
          <Button borderRadius="4px" onClick={() => navigate("/mis-teeme")}
            >{$text.nav.aboutPages.info}</Button
          >
          <Button borderRadius="4px" onClick={() => navigate("/liitu-meiega")}
            ><Bot />{$text.nav.aboutPages.join}</Button
          >
          <Button borderRadius="4px" onClick={() => navigate("/mentorid")}
            ><HandHeart />{$text.nav.aboutPages.mentors}</Button
          >
          <Button borderRadius="4px" onClick={() => navigate("/juhatus")}
            ><Lectern />{$text.nav.aboutPages.board}</Button
          >
        </Dropdown>
        <Dropdown borderRadius="4px" name={$text.nav.events} variant="borderless">
          <Button borderRadius="4px" onClick={() => navigate("/kalender")}
            ><CalendarClock />{$text.nav.eventsPages.calendar}</Button
          >
          <Button borderRadius="4px"
            onClick={() => navigate("https://asikarikas.ee/", { external: true })}
            ><Trophy />ASI Karikas</Button
          >
          <Button borderRadius="4px" onClick={() => navigate("/mentorid")}
            ><Presentation />{$text.nav.eventsPages.workshops}</Button
          >
          <Button borderRadius="4px" onClick={() => navigate("/rebased")}
            ><Swords />{$text.nav.eventsPages.fresh}</Button
          >
          <Button borderRadius="4px"
            onClick={() =>
              navigate("https://remondikohvik.lapikud.ee/", { external: true })}
            ><Coffee />{$text.nav.eventsPages.repair}</Button
          >
        </Dropdown>
        <Button borderRadius="4px" onClick={() => navigate("/kontakt")}
          >{$text.nav.contact}
        </Button>
        <Button borderRadius="4px" onClick={() => navigate("/helpdesk")}
          >{$text.nav.helpdesk}
        </Button>
    </nav>
  </Grid>
</Section>
