<script>
  import {
    Button,
    ButtonBorderless,
    Dropdown,
    Grid,
  } from "@/components/index.js";
  import Center from "./Center.svelte";
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

<Grid>
  <nav class="w-full h-16">
    <Center gapClass="gap-4">
      <Button onClick={() => navigate("/")}>Home</Button>
      <ButtonBorderless onClick={() => navigate("/about")}
        >About</ButtonBorderless
      >
      <Dropdown name={$text.nav.about} variant="borderless">
        <ButtonBorderless onClick={() => navigate("/mis-teeme")}
          >{$text.nav.aboutPages.info}</ButtonBorderless
        >
        <ButtonBorderless onClick={() => navigate("/liitu-meiega")}
          ><Bot />{$text.nav.aboutPages.join}</ButtonBorderless
        >
        <ButtonBorderless onClick={() => navigate("/mentorid")}
          ><HandHeart />{$text.nav.aboutPages.mentors}</ButtonBorderless
        >
        <ButtonBorderless onClick={() => navigate("/juhatus")}
          ><Lectern />{$text.nav.aboutPages.board}</ButtonBorderless
        >
      </Dropdown>
      <Dropdown name={$text.nav.events} variant="borderless">
        <ButtonBorderless onClick={() => navigate("/kalender")}
          ><CalendarClock />{$text.nav.eventsPages.calendar}</ButtonBorderless
        >
        <ButtonBorderless
          onClick={() => navigate("https://asikarikas.ee/", { external: true })}
          ><Trophy />ASI Karikas</ButtonBorderless
        >
        <ButtonBorderless onClick={() => navigate("/mentorid")}
          ><Presentation />{$text.nav.eventsPages.workshops}</ButtonBorderless
        >
        <ButtonBorderless onClick={() => navigate("/rebased")}
          ><Swords />{$text.nav.eventsPages.fresh}</ButtonBorderless
        >
        <ButtonBorderless
          onClick={() =>
            navigate("https://remondikohvik.lapikud.ee/", { external: true })}
          ><Coffee />{$text.nav.eventsPages.repair}</ButtonBorderless
        >
      </Dropdown>
    </Center>
  </nav>
</Grid>
