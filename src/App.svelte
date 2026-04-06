<script>
  import { Router, text } from "$lib";
  import { routes } from "./routes/index.js";
  import Navbar from "./layout/Navbar.svelte";
  import Footer from "./layout/Footer.svelte";
</script>

{#if $text && Object.keys($text).length > 0}
  <Navbar />
  <main class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col">
      <Router {routes} />
    </div>
    <Footer />
  </main>
{/if}
