<script setup>
import { Container, Dropdown, Stack } from "../components/index.js";
import {
    navigate,
    getPath,
    text,
} from "../lib/index.js";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

// Icon imports (Keyline via unplugin-icons)
import IconHistory from "~icons/keyline-icons/history-duotone";
import IconPodium from "~icons/keyline-icons/podium-duotone";
import IconBot from "~icons/keyline-icons/bot-duotone";
import IconUsers from "~icons/keyline-icons/users-duotone";
import IconExternalLink from "~icons/keyline-icons/square-arrow-out-up-right-duotone";
import IconMenu from "~icons/keyline-icons/menu-duotone";
import IconX from "~icons/keyline-icons/x-duotone";
import IconTrophy from "~icons/keyline-icons/trophy-duotone";
import IconCoffee from "~icons/keyline-icons/coffee-duotone";
import IconGamepad from "~icons/keyline-icons/gamepad-duotone";
import IconBug from "~icons/keyline-icons/bug-duotone";
import IconFileText from "~icons/keyline-icons/file-text-duotone";

const mobileMenuOpen = ref(false);
const isClosing = ref(false);
const scrolled = ref(false);
const currentPath = ref(getPath());
const menuPanelElement = ref(null);
let closeTimer;
let resizeTimer;

// Shrink the header once the page is scrolled
const handleScroll = () => {
    scrolled.value = window.scrollY > 24;
};

const aboutRoutes = [
    "/tudengile",
    "/ajalugu",
    "/liikmed",
    "/juhatus",
    "/pohikiri",
];

const eventsRoutes = [];

function isCurrent(path) {
    return currentPath.value === path;
}

function isInGroup(paths) {
    return paths.includes(currentPath.value);
}

// Dropdown contents (labels, icons, target routes)
const aboutItems = computed(() => [
    {
        label: text.value.aboutPages?.students,
        href: "/tudengile",
        icon: IconBot,
        active: isCurrent("/tudengile"),
    },
    {
        label: text.value.aboutPages?.ajalugu,
        href: "/ajalugu",
        icon: IconHistory,
        active: isCurrent("/ajalugu"),
    },
    {
        label: text.value.aboutPages?.members,
        href: "/liikmed",
        icon: IconUsers,
        active: isCurrent("/liikmed"),
    },
    {
        label: text.value.aboutPages?.board,
        href: "/juhatus",
        icon: IconPodium,
        active: isCurrent("/juhatus"),
    },
    {
        label: text.value.aboutPages?.pohikiri,
        href: "/pohikiri",
        icon: IconFileText,
        active: isCurrent("/pohikiri"),
    },
]);

const eventsItems = computed(() => [
    {
        label: "ASI Karikas",
        href: "https://asikarikas.ee/",
        icon: IconTrophy,
        external: true,
    },
    {
        label: text.value.eventsPages?.repair,
        href: "https://remondikohvik.lapikud.ee/",
        icon: IconCoffee,
        external: true,
    },
    {
        label: text.value.eventsPages?.tipilan,
        href: "https://tipilan.ee/",
        icon: IconGamepad,
        external: true,
    },
    {
        label: '~#DEV:"102";',
        href: "https://dev102.lapikud.ee/",
        icon: IconBug,
        external: true,
    },
]);

function handleNavSelect(item) {
    handleNavigation(item.href, { external: item.external });
}

// Update currentPath when navigation occurs
const syncPath = () => {
    currentPath.value = getPath();
};
onMounted(() => {
    window.addEventListener("popstate", syncPath);
    window.addEventListener("resize", handleResize);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
});

// Reactively control body scroll
watch(
    mobileMenuOpen,
    (open) => {
        if (typeof document !== "undefined") {
            if (open) {
                document.body.style.overflow = "hidden";
                document.documentElement.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
                document.documentElement.style.overflow = "";
            }
        }
    },
    { immediate: true },
);

// Close the mobile menu when clicking outside of it
const handleDocumentClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (menuPanelElement.value?.contains(target)) return;
    if (target.closest(".mobile-menu-toggle")) return;
    closeMobileMenu();
};

watch(
    mobileMenuOpen,
    (open) => {
        document[open ? "addEventListener" : "removeEventListener"]("click", handleDocumentClick);
    },
);

onBeforeUnmount(() => {
    window.removeEventListener("popstate", syncPath);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("click", handleDocumentClick);
    clearTimeout(closeTimer);
    clearTimeout(resizeTimer);
    if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    }
});

function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    isClosing.value = false;
}

function closeMobileMenu() {
    isClosing.value = true;
    closeTimer = setTimeout(() => {
        mobileMenuOpen.value = false;
        isClosing.value = false;
    }, 300);
}

function handleNavigation(path, options = {}) {
    navigate(path, options);
    currentPath.value = getPath();
    closeMobileMenu();
}

function handleResize() {
    if (typeof window !== "undefined") {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 768 && mobileMenuOpen.value) {
                closeMobileMenu();
            }
        }, 100);
    }
}
</script>

<template>
    <header class="fixed inset-x-0 top-0 z-50 text-white">
        <div class="border-b-2 border-orange-500 bg-gray-900">
            <Container class="py-0">
                <template v-if="text && Object.keys(text).length > 0">
                    <div
                        class="flex items-center gap-4 transition-[height] duration-300"
                        :class="scrolled ? 'h-16' : 'h-(--navbar-offset)'"
                    >
                        <button
                            type="button"
                            class="nav-logo"
                            @click="handleNavigation('/')"
                            aria-label="Avaleht"
                        >
                            <img
                                src="/assets/logo.svg"
                                alt="Lapikud logo"
                                class="w-auto transition-[height] duration-300"
                                :class="scrolled ? 'h-10' : 'h-14'"
                            />
                        </button>

                        <div class="ml-auto flex w-full items-center justify-end md:w-auto">
                            <nav class="z-10 hidden items-center gap-1 justify-end text-lg md:flex">
                                <Dropdown
                                    :name="text.about"
                                    :items="aboutItems"
                                    :active="isInGroup(aboutRoutes)"
                                    :onSelect="handleNavSelect"
                                />

                                <Dropdown
                                    :name="text.events"
                                    :items="eventsItems"
                                    :active="isInGroup(eventsRoutes)"
                                    :onSelect="handleNavSelect"
                                />

                                <button
                                    type="button"
                                    class="nav-link"
                                    :class="{ 'nav-link-active': isCurrent('/meietood') }"
                                    @click="handleNavigation('/meietood')"
                                >
                                    {{ text.ourwork }}
                                </button>

                                <button
                                    type="button"
                                    class="nav-link"
                                    :class="{ 'nav-link-active': isCurrent('/helpdesk') }"
                                    @click="handleNavigation('/helpdesk')"
                                >
                                    {{ text.helpdesk }}
                                </button>

                                <button
                                    type="button"
                                    class="nav-link"
                                    :class="{ 'nav-link-active': isCurrent('/kontakt') || isCurrent('/contact') }"
                                    @click="handleNavigation('#kontakt')"
                                >
                                    {{ text.contact }}
                                </button>
                            </nav>

                            <button
                                type="button"
                                class="mobile-only mobile-menu-toggle"
                                @click="toggleMobileMenu"
                                :aria-label="mobileMenuOpen ? 'Close navigation menu' : 'Toggle navigation menu'"
                            >
                                <IconX v-if="mobileMenuOpen" class="size-8" />
                                <IconMenu v-else class="size-8" />
                            </button>
                        </div>
                    </div>
                </template>
            </Container>

            <!-- Mobile nav menu — drops down from the header, styled like the navbar itself -->
            <div
                v-if="mobileMenuOpen"
                ref="menuPanelElement"
                class="mobile-menu-panel mobile-only absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-b-2 border-orange-500 bg-gray-900 px-2 pb-4 shadow-xl"
                :class="isClosing ? 'menu-panel-closing' : 'menu-panel-opening'"
            >
                <Stack gap="gap-1" class="px-1 pt-2">
                    <!-- About Section -->
                    <h3
                        class="menu-item menu-category px-3 pb-1 pt-2 text-sm font-bold tracking-widest uppercase text-orange-500"
                        style="animation-delay: 0ms"
                    >{{ text.about }}</h3>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        :class="{ 'menu-row-active': isCurrent('/tudengile') }"
                        style="animation-delay: 50ms"
                        @click="handleNavigation('/tudengile')"
                    >
                        <IconBot class="size-5" />
                        {{ text.aboutPages.students }}
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        :class="{ 'menu-row-active': isCurrent('/ajalugu') }"
                        style="animation-delay: 100ms"
                        @click="handleNavigation('/ajalugu')"
                    >
                        <IconHistory class="size-5" />
                        {{ text.aboutPages.ajalugu }}
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        :class="{ 'menu-row-active': isCurrent('/liikmed') }"
                        style="animation-delay: 150ms"
                        @click="handleNavigation('/liikmed')"
                    >
                        <IconUsers class="size-5" />
                        {{ text.aboutPages.members }}
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        :class="{ 'menu-row-active': isCurrent('/juhatus') }"
                        style="animation-delay: 200ms"
                        @click="handleNavigation('/juhatus')"
                    >
                        <IconPodium class="size-5" />
                        {{ text.aboutPages.board }}
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        :class="{ 'menu-row-active': isCurrent('/pohikiri') }"
                        style="animation-delay: 250ms"
                        @click="handleNavigation('/pohikiri')"
                    >
                        <IconFileText class="size-5" />
                        {{ text.aboutPages.pohikiri }}
                    </button>

                    <!-- Events Section -->
                    <h3
                        class="menu-item menu-category px-3 pb-1 pt-3 text-sm font-bold tracking-widest uppercase text-orange-500"
                        style="animation-delay: 250ms"
                    >{{ text.events }}</h3>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        style="animation-delay: 300ms"
                        @click="handleNavigation('https://asikarikas.ee/', { external: true })"
                    >
                        <IconTrophy class="size-5" aria-hidden="true" />
                        <span class="menu-row-label">ASI Karikas</span>
                        <IconExternalLink class="size-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        style="animation-delay: 350ms"
                        @click="handleNavigation('https://remondikohvik.lapikud.ee/', { external: true })"
                    >
                        <IconCoffee class="size-5" aria-hidden="true" />
                        <span class="menu-row-label">{{ text.eventsPages.repair }}</span>
                        <IconExternalLink class="size-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        style="animation-delay: 400ms"
                        @click="handleNavigation('https://tipilan.ee/', { external: true })"
                    >
                        <IconGamepad class="size-5" aria-hidden="true" />
                        <span class="menu-row-label">{{ text.eventsPages.tipilan }}</span>
                        <IconExternalLink class="size-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        style="animation-delay: 450ms"
                        @click="handleNavigation('https://dev102.lapikud.ee/', { external: true })"
                    >
                        <IconBug class="size-5" aria-hidden="true" />
                        <span class="menu-row-label">~#DEV:"102";</span>
                        <IconExternalLink class="size-4" aria-hidden="true" />
                    </button>

                    <!-- Direct Links (separate from the categories above) -->
                    <div
                        class="menu-item mx-3 my-2 border-t border-white/10"
                        style="animation-delay: 500ms"
                    ></div>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        :class="{ 'menu-row-active': isCurrent('/meietood') }"
                        style="animation-delay: 525ms"
                        @click="handleNavigation('/meietood')"
                    >
                        {{ text.ourwork }}
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        :class="{ 'menu-row-active': isCurrent('/helpdesk') }"
                        style="animation-delay: 550ms"
                        @click="handleNavigation('/helpdesk')"
                    >
                        {{ text.helpdesk }}
                    </button>
                    <button
                        type="button"
                        class="menu-item menu-row"
                        :class="{ 'menu-row-active': isCurrent('/kontakt') || isCurrent('/contact') }"
                        style="animation-delay: 600ms"
                        @click="handleNavigation('#kontakt')"
                    >
                        {{ text.contact }}
                    </button>
                </Stack>
            </div>
        </div>
    </header>
</template>

<style scoped>
  /* Logo button */
  .nav-logo {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0;
    background: none;
    border: 0;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .nav-logo {
      padding: 0.75rem 0;
    }
  }

  /* Desktop nav links */
  .nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    color: rgb(255 255 255 / 0.75);
    font: inherit;
    cursor: pointer;
    background: none;
    border: 0;
    transition: color 200ms ease, background-color 200ms ease;
  }

  .nav-link:hover {
    color: #fff;
    background: rgb(255 255 255 / 0.05);
  }

  .nav-link:focus-visible {
    outline: 2px solid var(--color-orange-500);
    outline-offset: 2px;
  }

  .nav-link-active {
    color: var(--color-orange-500);
  }

  /* Orange pill underline on hover & for the active page */
  .nav-link::after {
    content: "";
    position: absolute;
    left: 0.75rem;
    right: 0.75rem;
    bottom: 2px;
    height: 3px;
    border-radius: 9999px;
    background: var(--color-orange-500);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 200ms ease;
  }

  .nav-link:hover::after,
  .nav-link-active::after {
    transform: scaleX(1);
  }

  /* Mobile menu toggle — visibility handled by the .mobile-only helper */
  .mobile-menu-toggle {
    margin-left: auto;
    padding: 0.5rem;
    color: #fff;
    background: none;
    border: 0;
    cursor: pointer;
    transition: color 200ms ease;
  }

  .mobile-menu-toggle:hover {
    color: var(--color-orange-500);
  }

  /* Mobile nav menu drops down from under the header */
  @keyframes menuPanelIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes menuPanelOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  .menu-panel-opening {
    animation: menuPanelIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .menu-panel-closing {
    animation: menuPanelOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  /* Mobile menu category labels */
  .menu-category {
    font-family: "Syncopate", "Lato", ui-sans-serif, system-ui, sans-serif;
  }

  /* Mobile menu options drop in one by one */
  @keyframes menuItemIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .menu-item {
    opacity: 0;
    animation: menuItemIn 0.25s ease forwards;
  }

  /* Mobile menu rows */
  .menu-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.625rem 0.75rem;
    border-radius: var(--radius-lg);
    color: rgb(255 255 255 / 0.75);
    font: inherit;
    font-size: 1.125rem;
    text-align: left;
    cursor: pointer;
    background: none;
    border: 0;
    transition: background-color 150ms ease, color 150ms ease;
  }

  .menu-row:hover {
    background: rgb(255 255 255 / 0.05);
    color: var(--color-orange-500);
  }

  .menu-row:focus-visible {
    outline: 2px solid var(--color-orange-500);
    outline-offset: -2px;
  }

  .menu-row-active {
    background: rgb(255 255 255 / 0.05);
    color: var(--color-orange-500);
  }

  .menu-row-label {
    flex: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .menu-item,
    .menu-panel-opening,
    .menu-panel-closing {
      opacity: 1;
      animation: none;
    }
  }
</style>
