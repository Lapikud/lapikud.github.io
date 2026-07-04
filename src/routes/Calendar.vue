<script setup>
  import { Section, Center } from "../components/index.js";
  import { onMounted, ref } from 'vue';
  import { usePageText } from "../lib/index.js";

  const sectionElement = ref(null);
  const text = usePageText("Calendar");

  onMounted(() => {
    sectionElement.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
</script>

<template>
<div class="safe-area-navbar" ref="sectionElement">
<Section >
  <Center dir="col" class="w-full">
    <div class="w-full max-w-4xl">
      <iframe
        style="border: 0;"
        src="https://www.google.com/calendar/embed?src=lapikud%40gmail.com&ctz=Europe/Tallinn&showTitle=0&showPrint=0&showCalendars=0&showTz=0&wkst=2"
        :title="text.iframeTitle || 'Lapikud Calendar'"
        class="w-full"
        height="600"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
  </Center>
</Section>
</div>
</template>
