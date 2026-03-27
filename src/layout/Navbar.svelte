<script>
  import {
    Button,
    Container,
    Dropdown,
    Stack,
  } from "$components";
  import { navigate, getPath, currentLang, text, switchLanguageRoute } from "$lib";
  import { onDestroy } from "svelte";

  // Icon imports (Lucide)
  import Coffee from "lucide-svelte/icons/coffee";
  import Presentation from "lucide-svelte/icons/presentation";
  import Lectern from "lucide-svelte/icons/lectern";
  import Bot from "lucide-svelte/icons/bot";
  import HandHeart from "lucide-svelte/icons/hand-heart";
  import Trophy from "lucide-svelte/icons/trophy";
  import Menu from "lucide-svelte/icons/menu";
  import X from "lucide-svelte/icons/x";

  let mobileMenuOpen = $state(false);
  let isClosing = $state(false);
  let currentPath = $state(getPath());

  // Update currentPath when navigation occurs
  $effect(() => {
    const handleNavigation = () => {
      currentPath = getPath();
    };

    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  });

  // Reactively control body scroll
  $effect(() => {
    if (typeof document !== 'undefined') {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }
  });

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
    currentPath = getPath();
    closeMobileMenu();
  }

  function handleLanguageSwitch(lang) {
    switchLanguageRoute(lang);
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

<header class="fixed inset-x-0 top-0 z-50 text-white">
  <Container maxWidth={true} center={false} className="py-0">
    {#if $text && Object.keys($text).length > 0}
      <div class="flex items-center w-full relative min-h-10">
      <!-- Logo -->
      {#if currentPath !== "/"}
        <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:relative md:left-auto md:translate-x-0 md:top-auto md:translate-y-0">
          <Button onClick={() => handleNavigation("/")}>
            <img src="assets/LapLogo_black_white.png" alt="Lapikud Logo" class="h-14" />
          </Button>
        </div>
      {/if}
      
      <div class="flex items-center justify-end ml-auto w-full md:w-auto md:border-b-3 md:border-white backdrop-blur-lg bg-black/35">
        <!-- Desktop Navigation -->
        <nav class="z-10 hidden md:flex gap-1 justify-end text-lg">
          <Dropdown
            name={$text.about || 'Meist'}
            buttonClass="rounded-[5px] hover:text-white"
            panelClassName="bg-white text-black"
          >
            <Button class="rounded-[5px] bg-transparent hover:text-orange-500" onClick={() => navigate("/lapikutest")}
              >{$text.aboutPages.info}</Button
            >
            <Button class="rounded-[5px] bg-transparent hover:text-orange-500" onClick={() => navigate("/tudengile")}
              ><Bot />{$text.aboutPages.join}</Button
            >
            <Button class="rounded-[5px] bg-transparent hover:text-orange-500" onClick={() => navigate("/mentorid")}
              ><HandHeart />{$text.aboutPages.mentors}</Button
            >
            <Button class="rounded-[5px] bg-transparent hover:text-orange-500" onClick={() => navigate("/juhatus")}
              ><Lectern />{$text.aboutPages.board}</Button
            >
          </Dropdown>
          <Dropdown
            name={$text.events}
            buttonClass="rounded-[5px] hover:text-white"
            panelClassName="bg-white text-black"
          >
            <Button class="rounded-[5px] bg-transparent hover:text-orange-500" onClick={() => navigate("/koolitused")}
              ><Presentation />{$text.eventsPages.workshops}</Button
            >
            <Button class="rounded-[5px] bg-transparent hover:text-orange-500" onClick={() => navigate("https://asikarikas.ee/", { external: true })}
              ><Trophy />ASI Karikas</Button
            >
            <Button class="rounded-[5px] bg-transparent hover:text-orange-500" onClick={() => navigate("https://remondikohvik.lapikud.ee/", { external: true })}
              ><Coffee />{$text.eventsPages.repair}</Button
            >
          </Dropdown>
          <Button class="rounded-[5px] hover:text-white" onClick={() => navigate("/kontakt")}
            >{$text.contact}
          </Button>
          <Button class="rounded-[5px] hover:text-white" onClick={() => navigate("/helpdesk")}
            >{$text.helpdesk}
          </Button>
          
          <!-- Language Switcher -->
          <Button 
            class="rounded-[5px] px-3 py-1 text-sm ml-4 hover:text-white"
            onClick={() => switchLanguageRoute($currentLang === 'est' ? 'en' : 'est')}
          >
            {$currentLang === 'est' ? 'EN' : 'EST'}
          </Button>
      </nav>

      <!-- Mobile Hamburger Button - Fixed position -->
      <Button
        onClick={toggleMobileMenu}
        class="md:hidden p-2 text-white transition-colors bg-transparent absolute right-0 hover:text-white"
        style="opacity: {mobileMenuOpen ? '0' : '1'}; pointer-events: {mobileMenuOpen ? 'none' : 'auto'};"
        aria-label="Toggle menu"
      >
        <Menu size={32} />
      </Button>
      </div>
      </div>
    {/if}
  </Container>
</header>

<!-- Full Screen Mobile Menu -->
{#if mobileMenuOpen}
  <div 
    class="fixed inset-0 z-100 bg-(--off-black) md:hidden overflow-y-auto"
    class:menu-opening={!isClosing}
    class:menu-closing={isClosing}
  >
    <Stack className="min-h-full">
      <div class="absolute top-8 right-0">
        <Button
          onClick={closeMobileMenu}
          class="ml-auto p-2 transition-colors flex bg-transparent hover:text-orange-500"
          aria-label="Close menu"
        >
          <X size={32} color="white" />
        </Button>
      </div>

      <!-- Menu Content -->
      <Stack gap="gap-5" className="flex-1 px-8 pt-24 pb-12 text-white text-xl">
        <!-- About Section -->
        <Stack gap="gap-3">
          <h3 class="text-2xl font-bold text-orange-500">{$text.about}</h3>
          <Stack gap="gap-2" className="pl-4">
            <Button
              onClick={() => handleNavigation("/lapikutest")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500"
            >
              {$text.aboutPages.info}
            </Button>
            <Button
              onClick={() => handleNavigation("/tudengile")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500"
            >
              <Bot size={20} />
              {$text.aboutPages.join}
            </Button>
            <Button
              onClick={() => handleNavigation("/mentorid")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500"
            >
              <HandHeart size={20} />
              {$text.aboutPages.mentors}
            </Button>
            <Button
              onClick={() => handleNavigation("/juhatus")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500"
            >
              <Lectern size={20} />
              {$text.aboutPages.board}
            </Button>
          </Stack>
        </Stack>

        <!-- Events Section -->
        <Stack gap="gap-3" >
          <h3 class="text-2xl font-bold text-orange-500">{$text.events}</h3>
          <Stack gap="gap-2" className="pl-4">
            <Button
              onClick={() => handleNavigation("/mentorid")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500"
            >
              <Presentation size={20} />
              {$text.eventsPages.workshops}
            </Button>
            <Button
              onClick={() => handleNavigation("https://asikarikas.ee/", { external: true })}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500"
            >
              <Trophy size={20} />
              ASI Karikas
            </Button>
            <Button
              onClick={() => handleNavigation("https://remondikohvik.lapikud.ee/", { external: true })}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500"
            >
              <Coffee size={20} />
              {$text.eventsPages.repair}
            </Button>
          </Stack>
        </Stack>

        <!-- Direct Links -->
        <Stack gap="gap-3">
          <Button
            onClick={() => handleNavigation("/kontakt")}
            class="text-left text-2xl font-semibold transition-colors bg-transparent hover:text-orange-500"
          >
            {$text.contact}
          </Button>
          <Button
            onClick={() => handleNavigation("/helpdesk")}
            class="text-left text-2xl font-semibold transition-colors bg-transparent hover:text-orange-500"
          >
            {$text.helpdesk}
          </Button>
        </Stack>
        <!-- Language Switcher -->
        <Stack gap="gap-3">
          <Button 
            class="w-full rounded-lg py-3 text-lg bg-orange-500 text-black"
            onClick={() => handleLanguageSwitch($currentLang === 'est' ? 'en' : 'est')}
          >
            {$currentLang === 'est' ? 'English' : 'Eesti'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  </div>
{/if}
