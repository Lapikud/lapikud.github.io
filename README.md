# Lapikud External Website

Built with [Svelte 5](https://svelte.dev/) and [Vite](https://vite.dev/).

## Development plan

Materials are on `Google Drive > Lapikud > Tarkvara > Väliveeb`

## Contribution guide

### 1. Create Issues

Easiest way to help would be to create issues about things that are missing and wrong

### 2. Fork this repo and create a pull request

Fork this repo to your own account and create a pull request for changes you have done in there

## How to setup development environment

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher. v20 is recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/Lapikud/lapikud.github.io.git
   cd lapikud.github.io
```

2. **Install dependencies**

```bash
   npm install
```

3. **Start development server**

```bash
   npm run dev
```

### Optional (secretly required): Image optimization

> [!WARNING]
> No one wants to download 5MB images that are then shown in a 100x100px box.

**Always optimize images before committing them!**

<details>
<summary>Linux/Windows (WSL/Ubuntu)</summary>

```bash
sudo apt install ffmpeg
```

```bash
# For thumbnails/small images (100-300px display)
ffmpeg -i input -vf scale=400:-1 output.jpg

# For medium images (300-800px display)
ffmpeg -i input -vf scale=1200:-1 output.jpg

# For full-width hero images
ffmpeg -i input -vf scale=1920:-1 output.jpg
```

</details>

<details>
<summary>Windows</summary>

**Option 1: Using winget (Windows 11 or Windows 10 with App Installer)**

```bash
winget install ffmpeg
```

**Option 2: Manual installation**

1. Download FFmpeg from [ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Extract the archive
3. Add the `bin` folder to your PATH environment variable

**Usage:**

```bash
# For thumbnails/small images (100-300px display)
ffmpeg -i input -vf scale=400:-1 output.jpg

# For medium images (300-800px display)
ffmpeg -i input -vf scale=1200:-1 output.jpg

# For full-width hero images
ffmpeg -i input -vf scale=1920:-1 output.jpg
```

</details>

<details>
<summary>MacOS</summary>

```bash
brew install ffmpeg
```

```bash
# For thumbnails/small images (100-300px display)
ffmpeg -i input -vf scale=400:-1 output.jpg

# For medium images (300-800px display)
ffmpeg -i input -vf scale=1200:-1 output.jpg

# For full-width hero images
ffmpeg -i input -vf scale=1920:-1 output.jpg
```

</details>

## Build for production

```bash
npm run build
```

Built files will be in the `dist/` folder.

## Deploy

Push to the `main` branch and GitHub Actions will automatically build and deploy to GitHub Pages.

Deployment typically takes 2-5 minutes. You can check the progress in the [Actions tab](https://github.com/Lapikud/lapikud.github.io/actions).
