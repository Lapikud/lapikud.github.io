<script>
  import { Section, Center } from "$components";
  import { onMount } from "svelte";

  let sectionElement;

  onMount(() => {
    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
</script>

<div bind:this={sectionElement}>
<Section >
  <Center dir="col" className="w-full">
    <div class="w-full max-w-4xl">
      <iframe 
        style="border: 0;" 
        src="https://www.google.com/calendar/embed?src=lapikud%40gmail.com&ctz=Europe/Tallinn&showTitle=0&showPrint=0&showCalendars=0&showTz=0&wkst=2" 
        title="Lapikud Calendar"
        class="w-full"
        height="600" 
        frameborder="0" 
        scrolling="no"
      ></iframe>
    </div>
  </Center>
</Section>
</div>
