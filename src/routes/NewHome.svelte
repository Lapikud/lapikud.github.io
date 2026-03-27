<script>
import {Section, Grid, Center, Image, Svg} from "$components";
</script>

<!-- Hero Section -->
<Section className="relative min-h-screen overflow-hidden" padding="none" fullWidth={true}>
  <div class="relative min-h-screen flex items-center">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src="/assets/carousel-images/1.jpg"
        alt=""
        objectFit="cover"
        className="w-full h-full"
        pictureClass="block w-full h-full"
      />
    </div>
    <div
      class="pointer-events-none absolute inset-0 bg-gray-900 [clip-path:polygon(75%_0,100%_0,100%_100%,25%_100%)]"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute inset-0 bg-orange-500/75 [clip-path:polygon(0_0,75%_0,25%_100%,0_100%)]"
      aria-hidden="true"
    ></div>

    <div
      class="pointer-events-none absolute inset-0 [clip-path:polygon(0_0,75%_0,25%_100%,0_100%)]"
      aria-hidden="true"
    >
      <Svg
        type="connector"
        className="absolute left-0 top-[16%] w-[clamp(130px,14vw,230px)] text-white/95"
      />
      <Svg
        type="branch"
        className="absolute left-0 top-[52%] -translate-y-1/2 w-[clamp(56px,6vw,94px)] text-white/95"
      />
      <Svg
        type="mirrorV"
        className="absolute left-0 bottom-[12%] w-[clamp(130px,14vw,230px)] text-white/95"
      />
    </div>

    <div
      class="pointer-events-none absolute inset-x-0 bottom-[6%] z-10 hidden md:flex w-full flex-col items-end gap-3"
      aria-hidden="true"
    >
      <div class="h-6 w-[50%] bg-orange-500/90"></div>
      <div class="h-4 w-[60%] bg-orange-500/90"></div>
    </div>

    <Grid columns={2} className="relative z-20 items-center">
      <Center className="self-center md:-translate-y-8">
        <img src="/assets/LapLogo_black_white.png" alt="MTÜ Lapikud" class="max-w-lg w-full h-auto p-4"/>
      </Center>
      <p class="self-center md:translate-y-16 text-center text-2xl leading-[200%] p-8 text-white">
        MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, mis ühendab endisi
        ja praegusi IT huvilisi tudengeid.
      </p>
    </Grid>
  </div>
</Section>