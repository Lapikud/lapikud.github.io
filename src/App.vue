<script setup>
  import { onMounted } from 'vue';
  import { Router, text } from "./lib/index.js";
  import { routes } from "./routes/index.js";
  import Navbar from "./layout/Navbar.vue";
  import Footer from "./layout/Footer.vue";

  // Handle redirect from 404 page (replaces inline script in index.html)
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const redirect = sessionStorage.redirect;
      if (redirect && redirect !== window.location.href) {
        window.history.replaceState(null, null, redirect);
      }
      delete sessionStorage.redirect;
    }
  });
</script>

<template>
<template v-if="Object.keys(text).length > 0">
  <Navbar />
  <main class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col">
      <Router :routes="routes" />
    </div>
    <Footer />
  </main>
</template>
</template>
