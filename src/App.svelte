<script>
  import { Router, text } from "$lib";
  import { routes } from "./routes/index.js";
  import Navbar from "./layout/Navbar.svelte";
  import Footer from "./layout/Footer.svelte";
</script>

{#if $text && Object.keys($text).length > 0}
  <Navbar />
  <main>
    <Router {routes} />
    <Footer />
  </main>
{/if}
