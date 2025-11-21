<script>
  import {
    Button,
    Dropdown,
    Grid,
    Center,
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

<Grid>
  <nav class="w-full h-32">
    <Center gapClass="gap-4">
      <Dropdown name={$text.nav.about} variant="borderless">
        <Button onClick={() => navigate("/mis-teeme")}
          >{$text.nav.aboutPages.info}</Button
        >
        <Button onClick={() => navigate("/liitu-meiega")}
          ><Bot />{$text.nav.aboutPages.join}</Button
        >
        <Button onClick={() => navigate("/mentorid")}
          ><HandHeart />{$text.nav.aboutPages.mentors}</Button
        >
        <Button onClick={() => navigate("/juhatus")}
          ><Lectern />{$text.nav.aboutPages.board}</Button
        >
      </Dropdown>
      <Dropdown name={$text.nav.events} variant="borderless">
        <Button onClick={() => navigate("/kalender")}
          ><CalendarClock />{$text.nav.eventsPages.calendar}</Button
        >
        <Button
          onClick={() => navigate("https://asikarikas.ee/", { external: true })}
          ><Trophy />ASI Karikas</Button
        >
        <Button onClick={() => navigate("/mentorid")}
          ><Presentation />{$text.nav.eventsPages.workshops}</Button
        >
        <Button onClick={() => navigate("/rebased")}
          ><Swords />{$text.nav.eventsPages.fresh}</Button
        >
        <Button
          onClick={() =>
            navigate("https://remondikohvik.lapikud.ee/", { external: true })}
          ><Coffee />{$text.nav.eventsPages.repair}</Button
        >
      </Dropdown>
      <Button onClick={() => navigate("/kontakt")}
        >{$text.nav.contact}
      </Button>
      <Button onClick={() => navigate("/helpdesk")}
        >{$text.nav.helpdesk}
      </Button>
    </Center>
  </nav>
</Grid>

