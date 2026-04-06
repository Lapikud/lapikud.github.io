<script>
  import { Section, Grid, Container, Image } from "$components";
  import { text } from "$lib";
  import { onMount } from "svelte";
  import yaml from "js-yaml";
  import Mail from "lucide-svelte/icons/mail";
  import Phone from "lucide-svelte/icons/phone";

  let currentManagement = [];
  let pastManagement = [];
  let loading = true;
  let loadError = false;

  const fallbackText = {
    est: {
      hero: {
        eyebrow: "MTÜ Lapikud",
        title: "Juhtkond",
        intro: "Inimesed, kes viivad organisatsiooni edasi.",
      },
      current: {
        label: "Praegune juhtkond",
        hint: "Kontaktid ja vastutusvaldkonnad",
      },
      history: {
        label: "Organisatsiooni juhtinud inimesed läbi aegade",
        hint: "Tänu kõigile, kes on Lapikuid juhtinud",
      },
      loading: "Laadin andmeid…",
      error: "Juhtkonna andmete laadimine ebaõnnestus.",
    },
    en: {
      hero: {
        eyebrow: "MTÜ Lapikud",
        title: "Management",
        intro: "People who keep the organisation moving forward.",
      },
      current: {
        label: "Current board",
        hint: "Contacts and responsibilities",
      },
      history: {
        label: "People who have led the organisation over time",
        hint: "Thanks to everyone who has helped guide Lapikud",
      },
      loading: "Loading data…",
      error: "Failed to load the management data.",
    },
  };

  function getText() {
    return $text.management ?? fallbackText.est;
  }

  function parseYearLabel(label) {
    const text = String(label ?? "");
    const match = text.match(/^(\d{4})(?:\s*\((.+)\))?$/);

    if (!match) {
      return { year: text, tag: "" };
    }

    return {
      year: match[1],
      tag: match[2] ?? "",
    };
  }

  function getBoardLabel(member) {
    if (!member) return "";
    if (member.role && member.role !== "Juhatuse liige") {
      return member.role;
    }
    return member.subrole || member.role || "";
  }

  function getPhoneHref(phone) {
    if (!phone) return "";
    return `tel:${String(phone).replace(/[\s()-]/g, "")}`;
  }

  function getInitials(name) {
    return String(name ?? "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?";
  }

  onMount(async () => {
    try {
      const [currentRes, pastRes] = await Promise.all([
        fetch("/_data/management.yml"),
        fetch("/_data/past_management.yml"),
      ]);

      const [currentYaml, pastYaml] = await Promise.all([
        currentRes.text(),
        pastRes.text(),
      ]);

      currentManagement = yaml.load(currentYaml) || [];
      pastManagement = yaml.load(pastYaml) || [];
    } catch (error) {
      console.error("Error loading management data:", error);
      loadError = true;
    } finally {
      loading = false;
    }
  });
</script>

<div class="safe-area-navbar">
<Section
  padding="none"
  fullWidth={true}
  contentClass="!px-0 !py-0"
  class="management-page overflow-hidden text-white"
  background="#0d0d0d"
>
  <div class="hero-shell">
    <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
    <div class="hero-orb hero-orb-2" aria-hidden="true"></div>

    <Container class="relative z-10 py-[clamp(3rem,8vw,6rem)]">
      <div class="max-w-4xl">
        <p class="eyebrow">{getText().hero.eyebrow}</p>
        <h1 class="hero-title">{getText().hero.title}</h1>
        <p class="hero-intro">{getText().hero.intro}</p>
      </div>
    </Container>
  </div>
</Section>

<Section padding="large" class="current-section bg-white text-gray-900">
  <Container>
    <div class="section-label">
      <span>{getText().current.label}</span>
      <span class="section-label-line"></span>
    </div>

    <div class="section-heading-row">
      <div>
        <h2 class="section-title">{getText().current.label}</h2>
        <p class="section-subtitle">{getText().current.hint}</p>
      </div>
    </div>

    {#if loading}
      <p class="section-message">{getText().loading}</p>
    {:else if loadError}
      <p class="section-message section-message-error">{getText().error}</p>
    {:else}
      <Grid min="280px" gap="gap-6" class="board-grid">
        {#each currentManagement as member (member.name)}
          <article class="board-card">
            <div class="board-card-media">
              {#if member.photo}
                <Image
                  src={`/assets/management-images/${member.photo}`}
                  alt={member.name}
                  objectFit="cover"
                  class="board-card-image"
                  pictureClass="board-card-picture"
                />
              {:else}
                <div class="board-card-placeholder">{getInitials(member.name)}</div>
              {/if}
            </div>

            <div class="board-card-body">
              <div class="board-card-domain">{getBoardLabel(member)}</div>
              <div class="board-card-name">{member.name}</div>

              <div class="board-card-contacts">
                {#if member.email}
                  <a href={`mailto:${member.email}`}>
                    <Mail size={14} strokeWidth={2} />
                    <span>{member.email}</span>
                  </a>
                {/if}

                {#if member.phone}
                  <a href={getPhoneHref(member.phone)}>
                    <Phone size={14} strokeWidth={2} />
                    <span>{member.phone}</span>
                  </a>
                {/if}
              </div>
            </div>
          </article>
        {/each}
      </Grid>
    {/if}
  </Container>
</Section>

<div class="divider"></div>

<Section padding="large" class="history-section" background="#fffdfa">
  <Container>
    <div class="section-label">
      <span>{getText().history.label}</span>
      <span class="section-label-line"></span>
    </div>

    <div class="section-heading-row">
      <div>
        <h2 class="section-title">{getText().history.label}</h2>
        <p class="section-subtitle">{getText().history.hint}</p>
      </div>
    </div>

    {#if loading}
      <p class="section-message">{getText().loading}</p>
    {:else if loadError}
      <p class="section-message section-message-error">{getText().error}</p>
    {:else}
      <div class="history-list">
        {#each pastManagement as yearData (yearData.year)}
          <section class="year-block">
            <div class="year-header">
              <div class="year-heading-group">
                <span class="year-number">{parseYearLabel(yearData.year).year}</span>
                {#if parseYearLabel(yearData.year).tag}
                  <span class="year-tag">{parseYearLabel(yearData.year).tag}</span>
                {/if}
              </div>
              <span class="year-line"></span>
            </div>

            <Grid min="150px" gap="gap-5" class="year-people">
              {#each yearData.members as member (member.name)}
                <div class="person-item">
                  <div class="person-photo">
                    {#if member.image}
                      <Image
                        src={`/assets/past-management-images/optimised/${member.image}`}
                        alt={member.name}
                        objectFit="cover"
                        class="person-image"
                        pictureClass="person-picture"
                      />
                    {:else}
                      <div class="person-placeholder">{getInitials(member.name)}</div>
                    {/if}
                  </div>
                  <span class="person-name">{member.name}</span>
                </div>
              {/each}
            </Grid>
          </section>
        {/each}
      </div>
    {/if}
  </Container>
</Section>
</div>

<style>
  .hero-shell {
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, #0d0d0d 0%, #111111 100%);
  }

  .hero-shell::after {
    content: "";
    position: absolute;
    inset: auto 0 0 0;
    height: 1px;
    background: rgba(240, 148, 29, 0.16);
  }

  .hero-orb {
    position: absolute;
    border: 1px solid rgba(240, 148, 29, 0.12);
    border-radius: 999px;
    pointer-events: none;
  }

  .hero-orb-1 {
    top: -4rem;
    right: -4rem;
    width: 20rem;
    height: 20rem;
  }

  .hero-orb-2 {
    bottom: -5rem;
    right: 4rem;
    width: 13rem;
    height: 13rem;
    border-color: rgba(240, 148, 29, 0.08);
  }

  .eyebrow {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #f0941d;
    margin: 0 0 1rem;
  }

  .hero-title {
    margin: 0;
    font-size: clamp(2.4rem, 6vw, 4.2rem);
    line-height: 1.05;
    font-weight: 700;
    letter-spacing: -0.04em;
  }

  .hero-intro {
    margin: 1rem 0 0;
    max-width: 52ch;
    font-size: clamp(1.05rem, 1.5vw, 1.25rem);
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.76);
  }

  .section-label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 2rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #f0941d;
  }

  .section-label-line {
    flex: 1;
    height: 1px;
    background: rgba(13, 13, 13, 0.12);
  }

  .section-heading-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1.75rem;
  }

  .section-title {
    margin: 0;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    line-height: 1.12;
    letter-spacing: -0.03em;
  }

  .section-subtitle {
    margin: 0.45rem 0 0;
    color: rgba(13, 13, 13, 0.62);
    font-size: 0.98rem;
  }

  .section-message {
    margin: 0;
    padding: 1rem 0;
    color: rgba(13, 13, 13, 0.65);
  }

  .section-message-error {
    color: #b42318;
  }

  :global(.board-grid) {
    align-items: stretch;
  }

  .board-card {
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid rgba(13, 13, 13, 0.08);
    background: #ffffff;
    transition: transform 0.2s ease, border-color 0.2s ease,
      box-shadow 0.2s ease;
    box-shadow: 0 1px 0 rgba(13, 13, 13, 0.02);
  }

  .board-card:hover {
    transform: translateY(-4px);
    border-color: rgba(240, 148, 29, 0.35);
    box-shadow: 0 12px 30px rgba(13, 13, 13, 0.08);
  }

  .board-card-media {
    aspect-ratio: 4 / 3;
    background: linear-gradient(135deg, #f7f1e6, #efe5d3);
    overflow: hidden;
  }

  :global(.board-card-picture),
  :global(.board-card-image) {
    width: 100%;
    height: 100%;
  }

  :global(.board-card-image) {
    display: block;
  }

  .board-card-placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #d67d0a;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
  }

  .board-card-body {
    padding: 1.2rem 1.2rem 1.25rem;
    border-top: 1px solid rgba(13, 13, 13, 0.06);
  }

  .board-card-domain {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0.7rem;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    background: rgba(240, 148, 29, 0.1);
    color: #d67d0a;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .board-card-name {
    margin: 0 0 0.8rem;
    font-size: 1.1rem;
    font-weight: 650;
    line-height: 1.25;
  }

  .board-card-contacts {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .board-card-contacts a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: rgba(13, 13, 13, 0.54);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.77rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .board-card-contacts a:hover {
    color: #f0941d;
    text-decoration: none;
  }

  .divider {
    height: 1px;
    background: rgba(13, 13, 13, 0.08);
  }

  :global(.history-section) {
    background: #fffdfa;
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .year-block {
    margin: 0;
  }

  .year-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1.1rem;
  }

  .year-heading-group {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    white-space: nowrap;
  }

  .year-number {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .year-tag {
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    background: rgba(240, 148, 29, 0.12);
    color: #d67d0a;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.64rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .year-line {
    flex: 1;
    height: 1px;
    background: rgba(13, 13, 13, 0.1);
  }

  :global(.year-people) {
    align-items: start;
  }

  .person-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.55rem;
    text-align: center;
  }

  .person-photo {
    width: 112px;
    height: 112px;
    overflow: hidden;
    border-radius: 10px;
    background: linear-gradient(135deg, #efe6d7, #e7dbc7);
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition: outline-color 0.2s ease, transform 0.2s ease;
  }

  .person-item:hover .person-photo {
    outline-color: #f0941d;
    transform: translateY(-1px);
  }

  :global(.person-picture),
  :global(.person-image) {
    width: 100%;
    height: 100%;
  }

  :global(.person-image) {
    display: block;
  }

  .person-placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: #d67d0a;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .person-name {
    max-width: 14ch;
    font-size: 0.86rem;
    line-height: 1.35;
    font-weight: 600;
    color: #0d0d0d;
  }

  @media (max-width: 768px) {
    .section-heading-row {
      align-items: flex-start;
      flex-direction: column;
    }

    .year-header {
      align-items: flex-start;
      flex-direction: column;
    }

    .year-line {
      width: 100%;
    }

    .person-photo {
      width: 96px;
      height: 96px;
    }
  }
</style>