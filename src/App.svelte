<script>
  import Router from "./lib/Router.svelte";
  import { routes } from "./routes/index.js";
  import { theme, toggle } from "./lib/theme.js";
  import Navbar from "./layout/Navbar.svelte";
  import Footer from "./layout/Footer.svelte";
</script>

<Navbar />
<Router {routes} />
<Footer />

<!-- use $theme to show current state -->
<button
  onclick={toggle}
  style="position:fixed;right:1rem;bottom:1rem"
  aria-label="Toggle theme"
>
  {#if $theme === "dark"}☀️{:else}🌙{/if}
</button>
