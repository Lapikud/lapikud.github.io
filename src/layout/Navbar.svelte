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

  .mobile-menu-overlay {
    height: 100vh;
    max-height: 100vh;
  }

  @supports (height: 100svh) {
    .mobile-menu-overlay {
      height: 100svh;
      max-height: 100svh;
    }
  }

  @supports (height: 100dvh) {
    .mobile-menu-overlay {
      height: 100dvh;
      max-height: 100dvh;
    }
  }
</style>

<header class="fixed inset-x-0 top-0 z-50 text-white">
  <Container maxWidth={true} center={false} class="py-0">
    {#if $text && Object.keys($text).length > 0}
      <div class="flex items-center w-full relative min-h-10">
        <!-- Logo -->
        {#if currentPath !== "/"}
          <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:relative md:left-auto md:translate-x-0 md:top-auto md:translate-y-0">
            <Button onClick={() => handleNavigation("/")} class="border-transparent">
              <img src="assets/LapLogo_black_white.png" alt="Lapikud Logo" class="h-14" />
            </Button>
          </div>
        {/if}
      
        <div class="flex items-center justify-end ml-auto w-full md:w-auto md:border-b-3 md:border-white backdrop-blur-lg bg-black/35">
          <!-- Desktop Navigation -->
          <nav class="z-10 hidden md:flex gap-1 justify-end text-lg">
            <Dropdown
              name={$text.about}
              buttonClass="hover:text-orange-500 border-transparent"
              panelClass="bg-white text-black"
            >
              <Button class="bg-transparent hover:text-orange-500 border-transparent" onClick={() => navigate("/lapikutest")}
                >{$text.aboutPages.info}</Button
              >
              <Button class="bg-transparent hover:text-orange-500 border-transparent" onClick={() => navigate("/tudengile")}
                ><Bot />{$text.aboutPages.join}</Button
              >
              <Button class="bg-transparent hover:text-orange-500 border-transparent" onClick={() => navigate("/mentorid")}
                ><HandHeart />{$text.aboutPages.mentors}</Button
              >
              <Button class="bg-transparent hover:text-orange-500 border-transparent" onClick={() => navigate("/juhatus")}
                ><Lectern />{$text.aboutPages.board}</Button
              >
            </Dropdown>
            <Dropdown
              name={$text.events}
              buttonClass="hover:text-orange-500 border-transparent"
              panelClass="bg-white text-black"
            >
              <Button class="bg-transparent hover:text-orange-500 border-transparent" onClick={() => navigate("/koolitused")}
                ><Presentation />{$text.eventsPages.workshops}</Button
              >
              <Button class="bg-transparent hover:text-orange-500 border-transparent" onClick={() => navigate("https://asikarikas.ee/", { external: true })}
                ><Trophy />ASI Karikas</Button
              >
              <Button class="bg-transparent hover:text-orange-500 border-transparent" onClick={() => navigate("https://remondikohvik.lapikud.ee/", { external: true })}
                ><Coffee />{$text.eventsPages.repair}</Button
              >
            </Dropdown>
            <Button class="hover:text-orange-500 border-transparent" onClick={() => navigate("/helpdesk")}
              >{$text.helpdesk}
            </Button>
            <Button class="hover:text-orange-500 border-transparent" onClick={() => navigate("/kontakt")}
              >{$text.contact}
            </Button>
            
            <!-- Language Switcher -->
            <Button 
              class="px-3 py-1 text-sm ml-4 hover:text-orange-500 border-transparent"
              onClick={() => switchLanguageRoute($currentLang === 'est' ? 'en' : 'est')}
            >
              {$currentLang === 'est' ? 'EN' : 'EST'}
            </Button>
          </nav>

          <!-- Mobile Hamburger Button - Fixed position -->
          {#if !mobileMenuOpen}
            <Button
              onClick={toggleMobileMenu}
              class="mobile-only p-2 text-white transition-colors bg-transparent absolute right-0 hover:text-white border-transparent"
              aria-label="Toggle navigation menu"
            >
              <Menu size={32} />
            </Button>
          {/if}
        </div>
      </div>
    {/if}
  </Container>
</header>

<!-- Full Screen Mobile Menu -->
{#if mobileMenuOpen}
  <div 
    class="mobile-menu-overlay fixed inset-0 z-100 bg-black/95 mobile-only overflow-y-auto"
    data-animation
    class:menu-opening={!isClosing}
    class:menu-closing={isClosing}
  >
    <Stack class="min-h-full">
      <div class="absolute top-6 right-4">
        <Button
          onClick={closeMobileMenu}
          class="ml-auto p-2 transition-colors flex bg-transparent hover:text-orange-500 border-transparent"
          aria-label="Close menu"
        >
          <X size={32} color="white" />
        </Button>
      </div>

      <!-- Menu Content -->
      <Stack gap="gap-5" class="flex-1 px-8 pt-24 pb-12 text-white text-xl">
        <!-- About Section -->
        <Stack gap="gap-3">
          <h3 class="text-2xl font-bold text-orange-500">{$text.about}</h3>
          <Stack gap="gap-2" class="pl-4">
            <Button
              onClick={() => handleNavigation("/lapikutest")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500 border-transparent"
            >
              {$text.aboutPages.info}
            </Button>
            <Button
              onClick={() => handleNavigation("/tudengile")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500 border-transparent"
            >
              <Bot size={20} />
              {$text.aboutPages.join}
            </Button>
            <Button
              onClick={() => handleNavigation("/mentorid")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500 border-transparent"
            >
              <HandHeart size={20} />
              {$text.aboutPages.mentors}
            </Button>
            <Button
              onClick={() => handleNavigation("/juhatus")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500 border-transparent"
            >
              <Lectern size={20} />
              {$text.aboutPages.board}
            </Button>
          </Stack>
        </Stack>

        <!-- Events Section -->
        <Stack gap="gap-3" >
          <h3 class="text-2xl font-bold text-orange-500">{$text.events}</h3>
          <Stack gap="gap-2" class="pl-4">
            <Button
              onClick={() => handleNavigation("/koolitused")}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500 border-transparent"
            >
              <Presentation size={20} />
              {$text.eventsPages.workshops}
            </Button>
            <Button
              onClick={() => handleNavigation("https://asikarikas.ee/", { external: true })}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500 border-transparent"
            >
              <Trophy size={20} />
              ASI Karikas
            </Button>
            <Button
              onClick={() => handleNavigation("https://remondikohvik.lapikud.ee/", { external: true })}
              class="text-left transition-colors flex items-center gap-2 bg-transparent hover:text-orange-500 border-transparent"
            >
              <Coffee size={20} />
              {$text.eventsPages.repair}
            </Button>
          </Stack>
        </Stack>

        <!-- Direct Links -->
        <Stack gap="gap-3">
          <Button
            onClick={() => handleNavigation("/helpdesk")}
            class="text-left text-2xl font-semibold transition-colors bg-transparent hover:text-orange-500 border-transparent"
          >
            {$text.helpdesk}
          </Button>
          <Button
            onClick={() => handleNavigation("/kontakt")}
            class="text-left text-2xl font-semibold transition-colors bg-transparent hover:text-orange-500 border-transparent"
          >
            {$text.contact}
          </Button>
        </Stack>
        <!-- Language Switcher -->
        <Stack gap="gap-3">
          <Button 
            class="w-full rounded-lg py-3 text-lg bg-orange-500 text-black border-transparent"
            onClick={() => handleLanguageSwitch($currentLang === 'est' ? 'en' : 'est')}
          >
            {$currentLang === 'est' ? 'English' : 'Eesti'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  </div>
{/if}
