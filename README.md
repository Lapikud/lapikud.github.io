# Lapikud External Website

![Built with Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vuedotjs&logoColor=white)
![Built with Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?logo=github)

Welcome! This is the public-facing website for Lapikud. It's a learning project. If something breaks, that's totally fine. You just get to learn more about git.

Materials and design files are on **Google Drive → Lapikud → Tarkvara → Väliveeb**

---

## 🙋 How to help

You don't need to write code to contribute!

### Option 1 — Report something
Found a bug, typo, or something missing? [Open an issue](https://github.com/Lapikud/lapikud.github.io/issues) and describe what's wrong. That's already super helpful.

### Option 2 — Fix something yourself
1. **Fork** this repo (button in the top right on GitHub — it copies the project to your account)
2. Make your changes
3. Open a **pull request** back to this repo

---

## 🛠️ Setting up your dev environment

### What you need first

- [Node.js](https://nodejs.org/) — v20.19 or higher; use the current **LTS version** when possible

> Node.js comes with `npm` included, so you don't need to install that separately.

---

### Don't have a code editor yet?

If you don't have a preferred code editor, [VSCode](https://code.visualstudio.com/) is a solid choice. Download and install it, and you're good to go.

---

### Windows? Set up WSL first (recommended)

WSL lets you run Linux commands on Windows, which makes everything smoother.

<details>
<summary>📋 WSL setup steps</summary>

**Step 1** — Enable WSL. Run these two commands in PowerShell as Administrator (this enables the necessary Windows features):

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

**Step 2** — Set WSL to version 2 (the better one):

```bash
wsl --set-default-version 2
```

**Step 3** — Install [Ubuntu from the Microsoft Store](https://apps.microsoft.com/store/detail/ubuntu/9NBLGGH4MSV6)

> ⚠️ If WSL doesn't work, check that **Virtualization** is enabled on your machine: open Task Manager → Performance tab → look for "Virtualization: Enabled"

</details>

---

### Installation

**1. Clone the repo** — this downloads the project to your computer:

```bash
git clone https://github.com/Lapikud/lapikud.github.io.git
cd lapikud.github.io
```

**2. Install dependencies** — this installs the exact package versions recorded by the project:

```bash
npm ci
```

**3. Optimise images** — the optimised image variants are not stored in the repo, so you need to generate them locally before running the site:

```bash
npm run optimise
```

> You only need to run this once after cloning, and again whenever you add or change images in any `original/` folder.

**4. Start the dev server** — this runs the site locally so you can see your changes live:

```bash
npm run dev
```

Then open the URL it gives you (usually `http://localhost:5173`) in your browser. 🎉

---

## 🧭 How the project fits together

The site is a Vue 3 single-page application built with Vite. Vue starts in `src/main.js`, which mounts `src/App.vue`. The app keeps its intentionally small custom router and translation system rather than introducing larger framework plugins.

- `src/routes/` contains the page components and the bilingual public route table.
- `src/components/` contains reusable UI building blocks; layout primitives live in `src/components/layout/`.
- `src/layout/` contains the site-wide navigation and footer.
- `src/lib/` contains routing, translations, image-path helpers, and the shared YAML loader.
- `src/lib/locales/{est,en}/` contains escaped JSON translation data for each language.
- `public/_data/` contains editable YAML for members, mentors, workshops, projects, partners, and pricing.
- `public/assets/` contains source assets; generated image variants remain ignored.
- `.storybook/` and `src/stories/` provide isolated Vue component previews.

Page components use Vue's `<script setup>` syntax and Composition API primitives such as `ref` and `computed`. Use `usePageText("PageName")` for page translations, `loadYaml(path, fallback)` for YAML-backed content, and the exported `navigate()` helper for programmatic internal navigation.

Useful commands:

```bash
npm run dev             # start the local site
npm run build           # create a production build
npm run storybook       # preview components in Storybook
npm run build-storybook # verify the static Storybook build
npm run optimise        # regenerate local image variants
```

---

## 🖼️ Adding images

Place your original image files (PNG, JPG, etc.) into the appropriate `public/assets/{category}/original/` folder, then run:

```bash
npm run optimise
```

The script will generate optimised WebP and JPG variants automatically. **Do not commit anything inside `optimised/` folders** — those are generated and ignored by git.

> SVGs don't need optimising — just place them directly where they're needed, no `original/` folder required.

---

## 🚀 Deployment

Nothing to do here — GitHub automatically builds and deploys the site whenever something is pushed to the `v2` branch. The optimised images are generated as part of the build, so you don't need to worry about that either.

It usually takes **2–5 minutes**. You can watch it happen in the [Actions tab](https://github.com/Lapikud/lapikud.github.io/actions).
