<script setup>
  import {
    Section,
  } from "../components/index.js";

  import { usePageText } from "../lib/index.js";

  const text = usePageText("AboutUs");

</script>

<template>
<div class="safe-area-navbar">
<Section>
  <p>In development...</p>
  <p>Põhikiri siia?</p>
</Section>
</div>
</template>
