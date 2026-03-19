# Lapikud External Website

![Built with Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
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

- [Node.js](https://nodejs.org/) — v18 or higher, but grab the **LTS version** (currently v24) to be safe

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

**2. Install dependencies** — this installs all the packages the project needs:

```bash
npm install
```

**3. Start the dev server** — this runs the site locally so you can see your changes live:

```bash
npm run dev
```

Then open the URL it gives you (usually `http://localhost:5173`) in your browser. 🎉

---

## 🖼️ Images — please optimize before committing!

Nobody wants to load a 5MB photo that's displayed at 100×100px. Always resize images before adding them to the project.

Install FFmpeg first:

<details>
<summary>Linux / WSL / Ubuntu</summary>

```bash
sudo apt install ffmpeg
```

</details>

<details>
<summary>Windows (without WSL)</summary>

**Option A — via winget:**
```bash
winget install ffmpeg
```

**Option B — manually:**
1. Download from [ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Extract the archive
3. Add the `bin` folder to your PATH

</details>

<details>
<summary>macOS</summary>

```bash
brew install ffmpeg
```

</details>

### Resize commands

Once FFmpeg is installed, use the right size for the job:

```bash
# Small thumbnails (shown at 100–300px)
ffmpeg -i input -vf scale=400:-1 output.jpg

# Medium images (shown at 300–800px)
ffmpeg -i input -vf scale=1200:-1 output.jpg

# Hero / full-width images
ffmpeg -i input -vf scale=1920:-1 output.jpg
```

---

## 🚀 Deployment

Nothing to do here — GitHub automatically builds and deploys the site whenever something is pushed to the `main` branch.

It usually takes **2–5 minutes**. You can watch it happen in the [Actions tab](https://github.com/Lapikud/lapikud.github.io/actions).