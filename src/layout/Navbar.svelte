<script>
  import {
    Button,
    Dropdown,
    Section,
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
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("https://asikarikas.ee/", { external: true })}
            ><Trophy />ASI Karikas</Button
          >
          <Button class="rounded-[5px] bg-transparent" buttonHoverStyle="color:var(--orange)" onClick={() => navigate("/koolitused")}
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

    <!-- Mobile Hamburger Button -->
    <button
      on:click={toggleMobileMenu}
      class="md:hidden ml-auto p-2 text-white hover:text-orange-500 transition-colors"
      style="opacity: {mobileMenuOpen ? '0' : '1'}; pointer-events: {mobileMenuOpen ? 'none' : 'auto'};"
      aria-label="Toggle menu"
    >
      <Menu size={32} />
    </button>
  </div>
</Section>

<!-- Full Screen Mobile Menu -->
{#if mobileMenuOpen}
  <div 
    class="fixed inset-0 z-100 bg-(--off-black) md:hidden flex flex-col overflow-hidden"
    class:menu-opening={!isClosing}
    class:menu-closing={isClosing}
  >
    <div class="absolute top-8 right-0 px-(--site-padding)">
      <button
        on:click={closeMobileMenu}
        class="ml-auto p-2 hover:text-orange-500 transition-colors flex"
        aria-label="Close menu"
      >
        <X size={32} color="white" class="hover:stroke-orange-500" />
      </button>
    </div>

    <!-- Menu Content -->
    <nav class="flex-1 flex flex-col gap-6 px-8 pb-8 text-white text-xl justify-center">
      <!-- About Section -->
      <div class="border-b border-gray-700 pb-4">
        <h3 class="text-2xl font-bold mb-4 text-orange-500">{$text.nav.about}</h3>
        <div class="flex flex-col gap-3 pl-4">
          <button
            on:click={() => handleNavigation("/mis-teeme")}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            {$text.nav.aboutPages.info}
          </button>
          <button
            on:click={() => handleNavigation("/liitu-meiega")}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <Bot size={20} />
            {$text.nav.aboutPages.join}
          </button>
          <button
            on:click={() => handleNavigation("/mentorid")}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <HandHeart size={20} />
            {$text.nav.aboutPages.mentors}
          </button>
          <button
            on:click={() => handleNavigation("/juhatus")}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <Lectern size={20} />
            {$text.nav.aboutPages.board}
          </button>
        </div>
      </div>

      <!-- Events Section -->
      <div class="border-b border-gray-700 pb-4">
        <h3 class="text-2xl font-bold mb-4 text-orange-500">{$text.nav.events}</h3>
        <div class="flex flex-col gap-3 pl-4">
          <button
            on:click={() => handleNavigation("/kalender")}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <CalendarClock size={20} />
            {$text.nav.eventsPages.calendar}
          </button>
          <button
            on:click={() => handleNavigation("https://asikarikas.ee/", { external: true })}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <Trophy size={20} />
            ASI Karikas
          </button>
          <button
            on:click={() => handleNavigation("/mentorid")}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <Presentation size={20} />
            {$text.nav.eventsPages.workshops}
          </button>
          <button
            on:click={() => handleNavigation("/rebased")}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <Swords size={20} />
            {$text.nav.eventsPages.fresh}
          </button>
          <button
            on:click={() => handleNavigation("https://remondikohvik.lapikud.ee/", { external: true })}
            class="text-left hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            <Coffee size={20} />
            {$text.nav.eventsPages.repair}
          </button>
        </div>
      </div>

      <!-- Direct Links -->
      <div class="flex flex-col gap-4">
        <button
          on:click={() => handleNavigation("/kontakt")}
          class="text-left text-2xl font-semibold hover:text-orange-500 transition-colors"
        >
          {$text.nav.contact}
        </button>
        <button
          on:click={() => handleNavigation("/helpdesk")}
          class="text-left text-2xl font-semibold hover:text-orange-500 transition-colors"
        >
          {$text.nav.helpdesk}
        </button>
      </div>
    </nav>
  </div>
{/if}
