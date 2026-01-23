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

<Section className="text-white" background="off-black" padding="small">
  <Grid>
    <nav class="z-10 flex gap-4 justify-end text-xl">
        <Dropdown
          name={$text.nav.about}
          buttonClass="rounded-[5px]"
          buttonHoverStyle="background-color:var(--orange); color:var(--black)"
          panelClassName="bg-[var(--off-black)]"
        >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/mis-teeme")}
            >{$text.nav.aboutPages.info}</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/liitu-meiega")}
            ><Bot />{$text.nav.aboutPages.join}</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/mentorid")}
            ><HandHeart />{$text.nav.aboutPages.mentors}</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/juhatus")}
            ><Lectern />{$text.nav.aboutPages.board}</Button
          >
        </Dropdown>
        <Dropdown
          name={$text.nav.events}
          buttonClass="rounded-[5px]"
          buttonHoverStyle="background-color:var(--orange); color:var(--black)"
          panelClassName="bg-[var(--off-black)]"
        >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/kalender")}
            ><CalendarClock />{$text.nav.eventsPages.calendar}</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("https://asikarikas.ee/", { external: true })}
            ><Trophy />ASI Karikas</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/mentorid")}
            ><Presentation />{$text.nav.eventsPages.workshops}</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/rebased")}
            ><Swords />{$text.nav.eventsPages.fresh}</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("https://remondikohvik.lapikud.ee/", { external: true })}
            ><Coffee />{$text.nav.eventsPages.repair}</Button
          >
        </Dropdown>
        <Button buttonHoverStyle="background-color:var(--orange); color:var(--black)" class="rounded-[5px]" onClick={() => navigate("/kontakt")}
          >{$text.nav.contact}
        </Button>
        <Button buttonHoverStyle="background-color:var(--orange); color:var(--black)" class="rounded-[5px]" onClick={() => navigate("/helpdesk")}
          >{$text.nav.helpdesk}
        </Button>
    </nav>
  </Grid>
</Section>
