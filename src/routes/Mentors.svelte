<script>
    import { Section, Container } from "$components";
    import { onMount, onDestroy } from "svelte";
    import yaml from "js-yaml";
    import { currentLang, getLangText, createPageTextStore } from "$lib";

    import Mail from "lucide-svelte/icons/mail";
    import Phone from "lucide-svelte/icons/phone";
    import MessageCircle from "lucide-svelte/icons/message-circle";
    import User from "lucide-svelte/icons/user";

    let mentors = [];
    const text = createPageTextStore("Mentors");
    

    onMount(async () => {
        const response = await fetch("/_data/mentors.yml");
        const yamlText = await response.text();
        mentors = yaml.load(yamlText);
    });

    onDestroy(() => {
        text.destroy();
    });

    function getContactIcon(contactType) {
        const type = contactType.toLowerCase();
        if (type.includes("email") || type.includes("e-post")) return Mail;
        if (type.includes("phone") || type.includes("telefon")) return Phone;
        if (
            type.includes("messenger") ||
            type.includes("discord") ||
            type.includes("facebook")
        )
            return MessageCircle;
        return User;
    }

    function getContactLink(method) {
        const type = method.name.toLowerCase();
        const value = method.value;

        if (type.includes("email")) return `mailto:${value}`;
        if (type.includes("phone") || type.includes("telefon"))
            return `tel:${value}`;
        if (type.includes("messenger") || type.includes("facebook")) {
            return value.startsWith("http") ? value : `https://m.me/${value}`;
        }
        if (type.includes("discord")) return "#";

        return value.startsWith("http") ? value : "#";
    }
</script>

<div class="safe-area-navbar">
<!-- Hero Section -->
<Section
  padding="none"
  fullWidth={true}
  contentClass="!px-0 !py-0"
  class="overflow-hidden text-white"
>
  <div class="relative overflow-hidden bg-linear-to-b bg-gray-900 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[rgba(240,148,29,0.16)] after:content-['']">
    <div class="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full border border-[rgba(240,148,29,0.12)]" aria-hidden="true"></div>
    <div class="pointer-events-none absolute -bottom-20 right-16 h-52 w-52 rounded-full border border-[rgba(240,148,29,0.08)]" aria-hidden="true"></div>

    <Container class="relative z-10 py-[clamp(3rem,8vw,6rem)]">
      <div class="max-w-4xl">
                <h1 class="m-0 text-[clamp(2.4rem,6vw,4.2rem)] font-bold">{$text.hero?.title || "Our Mentors"}</h1>
                <p class="mt-4 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.25rem)] text-white/75">{$text.hero?.intro || "Lapikud who are always ready to support you in your studies and personal development."}</p>
      </div>
    </Container>
  </div>
</Section>

<!-- Mentors Grid -->
<Section>
    <div class="flex flex-col gap-8">
        {#each mentors as mentor}
            <div>
                <div class="flex flex-col md:flex-row gap-6 m-3">
                    <!-- Mentor Photo -->
                    {#if mentor.photo}
                        <div class="shrink-0">
                            <img
                                src={`/assets/mentors-images/optimised/${mentor.photo}`}
                                alt={mentor.name}
                                class="w-full md:w-48 h-48 object-cover"
                                on:error={(e) => {
                                    e.target.src =
                                        "/assets/mentors-images/original/" +
                                        mentor.photo;
                                }}
                            />
                        </div>
                    {/if}

                    <!-- Mentor Info -->
                    <div class="flex-1">
                        <h3 class="text-2xl font-bold mb-2">{mentor.name}</h3>

                        {#if mentor.age}
                            <p class="text-gray-600 mb-2">
                                Vanus: {mentor.age}
                            </p>
                        {/if}

                        {#if mentor.speciality}
                            <p
                                class="text-lg font-semibold mb-2"
                                style="color: var(--orange)"
                            >
                                {getLangText(
                                    mentor,
                                    "speciality",
                                    $currentLang,
                                )}
                            </p>
                        {/if}

                        {#if mentor.teams && mentor.teams.length > 0}
                            <div class="mb-3">
                                <span class="font-semibold">Meeskonnad: </span>
                                <span class="text-gray-700"
                                    >{mentor.teams.join(", ")}</span
                                >
                            </div>
                        {/if}

                        {#if mentor.term}
                            <p class="text-gray-600 mb-3">
                                Ametiperiood: {mentor.term}
                                {mentor.term === 1 ? "aasta" : "aastat"}
                            </p>
                        {/if}

                        {#if mentor.description}
                            <p
                                class="text-sm font-semibold mb-2"
                                style="color: var(--orange)"
                            >
                                Otsin: {getLangText(
                                    mentor,
                                    "description",
                                    $currentLang,
                                )}
                            </p>
                        {/if}

                        {#if mentor.activities}
                            <p class="text-gray-700 text-sm mb-4">
                                {getLangText(
                                    mentor,
                                    "activities",
                                    $currentLang,
                                )}
                            </p>
                        {/if}

                        <!-- Contact Methods -->
                        {#if mentor.contactMethods && mentor.contactMethods.length > 0}
                            <div class="flex flex-wrap gap-2 mt-4">
                                {#each mentor.contactMethods as method}
                                    {@const IconComponent = getContactIcon(
                                        method.name,
                                    )}
                                    <a
                                        href={getContactLink(method)}
                                        class="inline-flex items-center gap-2 px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors text-sm"
                                        title={method.name}
                                        target={method.value.startsWith("http")
                                            ? "_blank"
                                            : "_self"}
                                        rel={method.value.startsWith("http")
                                            ? "noopener noreferrer"
                                            : ""}
                                    >
                                        <svelte:component
                                            this={IconComponent}
                                            size={16}
                                        />
                                        <span class="capitalize"
                                            >{method.name}</span
                                        >
                                    </a>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</Section>
</div>

