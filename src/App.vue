<script setup>
  import { Router, text } from "./lib/index.js";
  import { routes } from "./routes/index.js";
  import Navbar from "./layout/Navbar.vue";
  import Footer from "./layout/Footer.vue";
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
