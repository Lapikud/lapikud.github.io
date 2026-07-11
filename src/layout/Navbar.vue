<script setup>
import { Button, Container, Dropdown, Stack } from "../components/index.js";
import {
    navigate,
    getPath,
    currentLang,
    text,
    switchLanguageRoute,
} from "../lib/index.js";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

// Icon imports (Lucide)
import { Presentation } from "@lucide/vue";
import { Lectern } from "@lucide/vue";
import { Bot } from "@lucide/vue";
import { HandHeart } from "@lucide/vue";
import { ExternalLink } from "@lucide/vue";
import { Menu } from "@lucide/vue";
import { X } from "@lucide/vue";

const mobileMenuOpen = ref(false);
const isClosing = ref(false);
const currentPath = ref(getPath());
let closeTimer;
let resizeTimer;

const aboutRoutes = [
    "/lapikutest",
    "/aboutus",
    "/tudengile",
    "/student",
    "/mentorid",
    "/mentors",
    "/juhatus",
    "/management",
];

const eventsRoutes = ["/koolitused", "/workshops"];

function isCurrent(path) {
    return currentPath.value === path;
}

function isInGroup(paths) {
    return paths.includes(currentPath.value);
}

// combines styles for easier modifying
function navButtonClass(active = false) {
    return active
        ? "border-transparent text-orange-500 hover:bg-white/5"
        : "border-transparent text-white/75 hover:bg-white/5";
}

function dropdownButtonClass(active = false) {
    return active
        ? "border-transparent text-orange-500 hover:bg-white/5"
        : "border-transparent text-white/75 hover:bg-white/5";
}

function dropdownItemClass(active = false) {
    return active
        ? "justify-start gap-2 border-transparent text-orange-500 w-full text-left pr-4"
        : "justify-start gap-2 border-transparent text-black hover:text-orange-500 w-full text-left pr-4";
}

function dropdownPanelClass() {
    return "nav-dropdown-panel min-w-max border border-black/10 bg-white p-2 text-black";
}

// Update currentPath when navigation occurs
const syncPath = () => {
    currentPath.value = getPath();
};
onMounted(() => {
    window.addEventListener("popstate", syncPath);
    window.addEventListener("resize", handleResize);
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

onBeforeUnmount(() => {
    window.removeEventListener("popstate", syncPath);
    window.removeEventListener("resize", handleResize);
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

function handleLanguageSwitch(lang) {
    switchLanguageRoute(lang);
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
                    <div class="flex h-(--navbar-offset) items-center gap-4">
                        <Button
                            :onClick="() => handleNavigation('/')"
                            class="nav-logo-button border-transparent px-0 py-1 md:py-3"
                            :style="{ pointerEvents: mobileMenuOpen ? 'none' : 'auto' }"
                        >
                            <img
                                src="/assets/logo.svg"
                                alt="Lapikud logo"
                                class="h-14 w-auto transition-all duration-500 ease-out"
                                :style="{
                                    opacity: mobileMenuOpen ? 0 : 1,
                                    transform: mobileMenuOpen ? 'scale(0.5)' : 'scale(1)',
                                    transformOrigin: 'left center'
                                }"
                            />
                        </Button>

                        <div
                            class="ml-auto flex w-full items-center justify-end md:w-auto"
                        >
                            <nav
                                class="z-10 hidden items-center gap-1 justify-end text-lg md:flex"
                            >
                                <Dropdown
                                    :name="text.about"
                                    :buttonClass="`${dropdownButtonClass(isInGroup(aboutRoutes))} ${isInGroup(aboutRoutes) ? 'nav-active-parent' : ''}`"
                                    :panelClass="dropdownPanelClass()"
                                >
                                    <Button
                                        :class="
                                            dropdownItemClass(
                                                isCurrent('/lapikutest') ||
                                                    isCurrent('/aboutus'),
                                            )
                                        "
                                        :onClick="
                                            () =>
                                                handleNavigation('/lapikutest')
                                        "
                                    >
                                        {{ text.aboutPages.info }}
                                    </Button>
                                    <Button
                                        :class="
                                            dropdownItemClass(
                                                isCurrent('/tudengile') ||
                                                    isCurrent('/student'),
                                            )
                                        "
                                        :onClick="
                                            () => handleNavigation('/tudengile')
                                        "
                                    >
                                        <Bot :size="30" />{{
                                            text.aboutPages.join
                                        }}
                                    </Button>
                                    <Button
                                        :class="
                                            dropdownItemClass(
                                                isCurrent('/mentorid') ||
                                                    isCurrent('/mentors'),
                                            )
                                        "
                                        :onClick="
                                            () => handleNavigation('/mentorid')
                                        "
                                    >
                                        <HandHeart :size="30" />{{
                                            text.aboutPages.mentors
                                        }}
                                    </Button>
                                    <Button
                                        :class="
                                            dropdownItemClass(
                                                isCurrent('/juhatus') ||
                                                    isCurrent('/management'),
                                            )
                                        "
                                        :onClick="
                                            () => handleNavigation('/juhatus')
                                        "
                                    >
                                        <Lectern :size="30" />{{
                                            text.aboutPages.board
                                        }}
                                    </Button>
                                </Dropdown>

                                <Dropdown
                                    :name="text.events"
                                    :buttonClass="`${dropdownButtonClass(isInGroup(eventsRoutes))} ${isInGroup(eventsRoutes) ? 'nav-active-parent' : ''}`"
                                    :panelClass="dropdownPanelClass()"
                                >
                                    <Button
                                        class="justify-between items-center gap-2 border-transparent text-black hover:text-orange-500 w-full text-left pr-4"
                                        :onClick="
                                            () =>
                                                handleNavigation(
                                                    'https://asikarikas.ee/',
                                                    { external: true },
                                                )
                                        "
                                    >
                                        <div class="flex items-center gap-2">
                                            <img
                                                src="/assets/asikarikas_logo_white.svg"
                                                alt=""
                                                class="h-5 w-5 invert grayscale transform translate-y-0.5"
                                            />
                                            <span>ASI Karikas</span>
                                        </div>
                                        <ExternalLink
                                            :size="20"
                                            aria-hidden="true"
                                            class="ml-2"
                                        />
                                    </Button>
                                    <Button
                                        class="justify-between items-center gap-2 border-transparent text-black hover:text-orange-500 w-full text-left pr-4"
                                        :onClick="
                                            () =>
                                                handleNavigation(
                                                    'https://remondikohvik.lapikud.ee/',
                                                    { external: true },
                                                )
                                        "
                                    >
                                        <div class="flex items-center gap-2">
                                            <img
                                                src="https://remondikohvik.lapikud.ee/assets/remondikohvik-logo.png"
                                                alt=""
                                                class="h-5 w-5 grayscale invert"
                                            />
                                            <span>{{
                                                text.eventsPages.repair
                                            }}</span>
                                        </div>
                                        <ExternalLink
                                            :size="20"
                                            aria-hidden="true"
                                            class="ml-2"
                                        />
                                    </Button>
                                    <Button
                                        class="justify-between items-center gap-2 border-transparent text-black hover:text-orange-500 w-full text-left pr-4"
                                        :onClick="
                                            () =>
                                                handleNavigation(
                                                    'https://tipilan.ee/',
                                                    { external: true },
                                                )
                                        "
                                    >
                                        <div
                                            class="flex items-center gap-2 group"
                                        >
                                            <img
                                                src="/assets/tipilan-icon-black.svg"
                                                alt=""
                                                class="h-5 w-5"
                                            />
                                            <span>{{
                                                text.eventsPages.tipilan
                                            }}</span>
                                        </div>
                                        <ExternalLink
                                            :size="20"
                                            aria-hidden="true"
                                            class="ml-2"
                                        />
                                    </Button>
                                    <Button
                                        :class="
                                            dropdownItemClass(
                                                isCurrent('/koolitused') ||
                                                    isCurrent('/workshops'),
                                            )
                                        "
                                        :onClick="
                                            () =>
                                                handleNavigation('/koolitused')
                                        "
                                    >
                                        <Presentation :size="30" />{{
                                            text.eventsPages.workshops
                                        }}
                                    </Button>
                                </Dropdown>

                                <Button
                                    :class="
                                        navButtonClass(isCurrent('/helpdesk'))
                                    "
                                    :onClick="
                                        () => handleNavigation('/helpdesk')
                                    "
                                >
                                    {{ text.helpdesk }}
                                </Button>

                                <Button
                                    :class="
                                        navButtonClass(
                                            isCurrent('/kontakt') ||
                                                isCurrent('/contact'),
                                        )
                                    "
                                    :onClick="
                                        () => handleNavigation('/kontakt')
                                    "
                                >
                                    {{ text.contact }}
                                </Button>

                                <Button
                                    class="ml-3 border-transparent bg-transparent px-3 py-1 text-sm text-white/75 hover:bg-white/5"
                                    :onClick="
                                        () =>
                                            switchLanguageRoute(
                                                currentLang === 'est'
                                                    ? 'en'
                                                    : 'est',
                                            )
                                    "
                                >
                                    {{ currentLang === "est" ? "EN" : "EST" }}
                                </Button>
                            </nav>

                            <template v-if="!mobileMenuOpen">
                                <Button
                                    :onClick="toggleMobileMenu"
                                    class="mobile-only ml-auto border-transparent bg-transparent p-2 text-white transition-colors hover:text-orange-500"
                                    aria-label="Toggle navigation menu"
                                >
                                    <Menu :size="32" />
                                </Button>
                            </template>
                        </div>
                    </div>
                </template>
            </Container>
        </div>
    </header>

    <!-- Full Screen Mobile Menu -->
    <div
        v-show="mobileMenuOpen"
        class="mobile-menu-overlay fixed inset-0 z-100 bg-gray-900 mobile-only overflow-y-auto"
        data-animation
        :class="{ 'menu-opening': !isClosing && mobileMenuOpen, 'menu-closing': isClosing }"
    >
            <Stack class="min-h-full">
                <div class="absolute top-0 right-0 h-(--navbar-offset) flex items-center pr-(--page-padding-inline)">
                    <Button
                        :onClick="closeMobileMenu"
                        class="p-2 transition-colors flex bg-transparent border-transparent"
                        aria-label="Close menu"
                    >
                        <X :size="32" color="white" />
                    </Button>
                </div>

                <!-- Menu Content -->
                <Stack
                    gap="gap-5"
                    class="flex-1 px-8 pt-(--navbar-offset) pb-12 text-white text-xl"
                >
                    <Button
                        v-show="text && Object.keys(text).length > 0"
                        :onClick="() => handleNavigation('/')"
                        class="border-transparent px-0 py-1 mb-3"
                    >
                        <img
                            src="/assets/logo.svg"
                            alt="Lapikud logo"
                            class="h-20 w-auto opacity-0"
                            :class="{
                                'mobile-menu-logo-appear': mobileMenuOpen && !isClosing,
                                'mobile-menu-logo-disappear': isClosing
                            }"
                            :style="isClosing ? 'transform-origin: left center;' : ''"
                        />
                    </Button>

                    <!-- About Section -->
                    <Stack gap="gap-3">
                        <h3 class="text-2xl font-bold text-orange-500">
                            {{ text.about }}
                        </h3>
                        <Stack gap="gap-2" class="pl-4">
                            <Button
                                :onClick="() => handleNavigation('/lapikutest')"
                                :class="`text-left transition-colors flex items-center gap-2 bg-transparent border-transparent ${isCurrent('/lapikutest') || isCurrent('/aboutus') ? 'text-orange-500' : ''}`"
                            >
                                {{ text.aboutPages.info }}
                            </Button>
                            <Button
                                :onClick="() => handleNavigation('/tudengile')"
                                :class="`text-left transition-colors flex items-center gap-2 bg-transparent border-transparent ${isCurrent('/tudengile') || isCurrent('/student') ? 'text-orange-500' : ''}`"
                            >
                                <Bot :size="30" />
                                {{ text.aboutPages.join }}
                            </Button>
                            <Button
                                :onClick="() => handleNavigation('/mentorid')"
                                :class="`text-left transition-colors flex items-center gap-2 bg-transparent border-transparent ${isCurrent('/mentorid') || isCurrent('/mentors') ? 'text-orange-500' : ''}`"
                            >
                                <HandHeart :size="30" />
                                {{ text.aboutPages.mentors }}
                            </Button>
                            <Button
                                :onClick="() => handleNavigation('/juhatus')"
                                :class="`text-left transition-colors flex items-center gap-2 bg-transparent border-transparent ${isCurrent('/juhatus') || isCurrent('/management') ? 'text-orange-500' : ''}`"
                            >
                                <Lectern :size="30" />
                                {{ text.aboutPages.board }}
                            </Button>
                        </Stack>
                    </Stack>

                    <!-- Events Section -->
                    <Stack gap="gap-3">
                        <h3 class="text-2xl font-bold text-orange-500">
                            {{ text.events }}
                        </h3>
                        <Stack gap="gap-2" class="pl-4">
                            <Button
                                :onClick="
                                    () =>
                                        handleNavigation(
                                            'https://asikarikas.ee/',
                                            { external: true },
                                        )
                                "
                                class="w-full justify-between items-center gap-2 bg-transparent border-transparent"
                            >
                                <div class="flex items-center gap-2">
                                    <img
                                        src="/assets/asikarikas_logo_white.svg"
                                        alt=""
                                        class="h-5 w-5 grayscale transform translate-y-0.5"
                                    />
                                    <span>ASI Karikas</span>
                                </div>
                                <ExternalLink
                                    :size="20"
                                    aria-hidden="true"
                                    class="ml-2"
                                />
                            </Button>
                            <Button
                                :onClick="
                                    () =>
                                        handleNavigation(
                                            'https://remondikohvik.lapikud.ee/',
                                            { external: true },
                                        )
                                "
                                class="w-full justify-between items-center gap-2 bg-transparent border-transparent"
                            >
                                <div class="flex items-center gap-2">
                                    <img
                                        src="https://remondikohvik.lapikud.ee/assets/remondikohvik-logo.png"
                                        alt=""
                                        class="h-5 w-5 grayscale invert"
                                    />
                                    <span>{{ text.eventsPages.repair }}</span>
                                </div>
                                <ExternalLink
                                    :size="20"
                                    aria-hidden="true"
                                    class="ml-2"
                                />
                            </Button>
                            <Button
                                :onClick="
                                    () =>
                                        handleNavigation(
                                            'https://tipilan.ee/',
                                            { external: true },
                                        )
                                "
                                class="w-full justify-between items-center gap-2 bg-transparent border-transparent"
                            >
                                <div class="flex items-center gap-2">
                                    <img
                                        src="/assets/tipilan-icon-white.svg"
                                        alt=""
                                        class="h-5 w-5"
                                    />
                                    <span>{{ text.eventsPages.tipilan }}</span>
                                </div>
                                <ExternalLink
                                    :size="20"
                                    aria-hidden="true"
                                    class="ml-2"
                                />
                            </Button>
                            <Button
                                :onClick="() => handleNavigation('/koolitused')"
                                :class="`text-left transition-colors flex items-center gap-2 bg-transparent border-transparent ${isCurrent('/koolitused') || isCurrent('/workshops') ? 'text-orange-500' : ''}`"
                            >
                                <Presentation :size="30" />
                                {{ text.eventsPages.workshops }}
                            </Button>
                        </Stack>
                    </Stack>

                    <!-- Direct Links -->
                    <Stack gap="gap-3">
                        <Button
                            :onClick="() => handleNavigation('/helpdesk')"
                            :class="`text-left text-2xl font-semibold transition-colors bg-transparent border-transparent ${isCurrent('/helpdesk') ? 'text-orange-500' : ''}`"
                        >
                            {{ text.helpdesk }}
                        </Button>
                        <Button
                            :onClick="() => handleNavigation('/kontakt')"
                            :class="`text-left text-2xl font-semibold transition-colors bg-transparent border-transparent ${isCurrent('/kontakt') || isCurrent('/contact') ? 'text-orange-500' : ''}`"
                        >
                            {{ text.contact }}
                        </Button>
                    </Stack>
                    <!-- Language Switcher -->
                    <Stack gap="gap-3">
                        <Button
                            class="w-full rounded-lg py-3 text-lg bg-orange-500 text-black border-transparent"
                            :onClick="
                                () =>
                                    handleLanguageSwitch(
                                        currentLang === 'est' ? 'en' : 'est',
                                    )
                            "
                        >
                            {{ currentLang === "est" ? "English" : "Eesti" }}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </div>
</template>

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

@keyframes slideInFromHeader {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes slideOutToHeader {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateY(-20px) scale(0.8);
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

.mobile-menu-logo-appear {
    animation: slideInFromHeader 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.mobile-menu-logo-disappear {
    animation: slideOutToHeader 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
