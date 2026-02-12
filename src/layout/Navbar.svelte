<script>
  import {
    Button,
    Dropdown,
    Section,
    Stack,
  } from "$components";
  import { navigate, getPath, currentLang, text, switchLang } from "$lib";
  import { onDestroy } from "svelte";

  // Icon imports (Lucide)
  import Coffee from "lucide-svelte/icons/coffee";
  import CalendarClock from "lucide-svelte/icons/calendar-clock";
  import Presentation from "lucide-svelte/icons/presentation";
  import Swords from "lucide-svelte/icons/swords";
  import Lectern from "lucide-svelte/icons/lectern";
  import Bot from "lucide-svelte/icons/bot";
  import HandHeart from "lucide-svelte/icons/hand-heart";
  import Trophy from "lucide-svelte/icons/trophy";
  import Menu from "lucide-svelte/icons/menu";
  import X from "lucide-svelte/icons/x";

  let mobileMenuOpen = false;
  let isClosing = false;

  // Reactively control body scroll
  $: if (typeof document !== 'undefined') {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    isClosing = false;
  }

  function closeMobileMenu() {
    isClosing = true;
    setTimeout(() => {
      mobileMenuOpen = false;
      isClosing = false;
    }, 300);
  }

  function handleNavigation(path, options = {}) {
    navigate(path, options);
    closeMobileMenu();
  }
</script>

<style>
  @keyframes expandFromButton {
    from {
      clip-path: circle(0px at calc(100% - 2rem) 2rem);
    }
    to {
      clip-path: circle(150% at calc(100% - 2rem) 2rem);
    }
  }

  @keyframes collapseToButton {
    from {
      clip-path: circle(150% at calc(100% - 2rem) 2rem);
    }
    to {
      clip-path: circle(0px at calc(100% - 2rem) 2rem);
    }
  }

  .menu-opening {
    animation: expandFromButton 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .menu-closing {
    animation: collapseToButton 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
</style>

<Section className="text-white" background="off-black" padding="small">
  <div class="flex items-center justify-end">
    <!-- Desktop Navigation -->
    <nav class="z-10 hidden md:flex gap-4 justify-end text-xl">
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
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/koolitused")}
            ><Presentation />{$text.nav.eventsPages.workshops}</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/rebased")}
            ><Swords />{$text.nav.eventsPages.fresh}</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("https://asikarikas.ee/", { external: true })}
            ><Trophy />ASI Karikas</Button
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

    <!-- Mobile Hamburger Button -->
    <Button
      onClick={toggleMobileMenu}
      class="md:hidden ml-auto p-2 text-white hover:text-orange-500 transition-colors bg-transparent"
      style="opacity: {mobileMenuOpen ? '0' : '1'}; pointer-events: {mobileMenuOpen ? 'none' : 'auto'};"
      aria-label="Toggle menu"
    >
      <Menu size={32} />
    </Button>
  </div>
</Section>

<!-- Full Screen Mobile Menu -->
{#if mobileMenuOpen}
  <div 
    class="fixed inset-0 z-100 bg-(--off-black) md:hidden overflow-hidden"
    class:menu-opening={!isClosing}
    class:menu-closing={isClosing}
  >
    <Stack className="h-full">
      <div class="absolute top-8 right-0 px-(--site-padding)">
        <Button
          onClick={closeMobileMenu}
          class="ml-auto p-2 hover:text-orange-500 transition-colors flex bg-transparent"
          aria-label="Close menu"
        >
          <X size={32} color="white" class="hover:stroke-orange-500" />
        </Button>
      </div>

      <!-- Menu Content -->
      <Stack gap="var(--space-5)" className="flex-1 px-8 pb-8 text-white text-xl justify-center">
        <!-- About Section -->
        <Stack gap="var(--space-3)" className="border-b border-gray-700 pb-4">
          <h3 class="text-2xl font-bold text-orange-500">{$text.nav.about}</h3>
          <Stack gap="var(--space-2)" className="pl-4">
            <Button
              onClick={() => handleNavigation("/mis-teeme")}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              {$text.nav.aboutPages.info}
            </Button>
            <Button
              onClick={() => handleNavigation("/liitu-meiega")}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              <Bot size={20} />
              {$text.nav.aboutPages.join}
            </Button>
            <Button
              onClick={() => handleNavigation("/mentorid")}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              <HandHeart size={20} />
              {$text.nav.aboutPages.mentors}
            </Button>
            <Button
              onClick={() => handleNavigation("/juhatus")}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              <Lectern size={20} />
              {$text.nav.aboutPages.board}
            </Button>
          </Stack>
        </Stack>

        <!-- Events Section -->
        <Stack gap="var(--space-3)" className="border-b border-gray-700 pb-4">
          <h3 class="text-2xl font-bold text-orange-500">{$text.nav.events}</h3>
          <Stack gap="var(--space-2)" className="pl-4">
            <Button
              onClick={() => handleNavigation("/kalender")}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              <CalendarClock size={20} />
              {$text.nav.eventsPages.calendar}
            </Button>
            <Button
              onClick={() => handleNavigation("/mentorid")}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              <Presentation size={20} />
              {$text.nav.eventsPages.workshops}
            </Button>
            <Button
              onClick={() => handleNavigation("/rebased")}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              <Swords size={20} />
              {$text.nav.eventsPages.fresh}
            </Button>
            <Button
              onClick={() => handleNavigation("https://asikarikas.ee/", { external: true })}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              <Trophy size={20} />
              ASI Karikas
            </Button>
            <Button
              onClick={() => handleNavigation("https://remondikohvik.lapikud.ee/", { external: true })}
              class="text-left hover:text-orange-500 transition-colors flex items-center gap-2 bg-transparent"
            >
              <Coffee size={20} />
              {$text.nav.eventsPages.repair}
            </Button>
          </Stack>
        </Stack>

        <!-- Direct Links -->
        <Stack gap="var(--space-3)">
          <Button
            onClick={() => handleNavigation("/kontakt")}
            class="text-left text-2xl font-semibold hover:text-orange-500 transition-colors bg-transparent"
          >
            {$text.nav.contact}
          </Button>
          <Button
            onClick={() => handleNavigation("/helpdesk")}
            class="text-left text-2xl font-semibold hover:text-orange-500 transition-colors bg-transparent"
          >
            {$text.nav.helpdesk}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  </div>
{/if}
