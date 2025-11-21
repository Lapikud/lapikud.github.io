<script>
  import { Router, text } from "$lib";
  import { routes } from "./routes/index.js";
  import Navbar from "./layout/Navbar.svelte";
  import Footer from "./layout/Footer.svelte";
</script>

{#if $text.nav}
  <!--<Navbar /> Ära vaata seda faili!! -->
  <Router {routes} />
  <Footer />
{/if}
