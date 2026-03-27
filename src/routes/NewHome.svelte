<script>
import {Section, Stack, Grid, Center, Image, Svg} from "$components";
</script>

<!-- TODO: grid gap dynamic -->

<!-- Hero Section -->
<Section className="relative min-h-screen overflow-hidden" padding="none" bg="bg-gray-900" id="hero">
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
      class="pointer-events-none absolute inset-0 bg-gray-900 [clip-path:polygon(58%_0,100%_0,100%_100%,35%_100%)]"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute inset-0 bg-orange-500/75 [clip-path:polygon(0_0,58%_0,35%_100%,0_100%)]"
      aria-hidden="true"
    ></div>

    <div
      class="pointer-events-none absolute inset-0 [clip-path:polygon(0_0,58%_0,35%_100%,0_100%)]"
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
      <div class="h-6 w-[45%] bg-orange-500/90"></div>
      <div class="h-4 w-[55%] bg-orange-500/90"></div>
    </div>

    <Grid columns={2} className="relative z-20 items-center">
      <Center className="self-center md:-translate-y-8">
        <img src="/assets/LapLogo_black_white.png" alt="MTÜ Lapikud" class="max-w-lg w-full h-auto p-4"/>
      </Center>
      <p class="self-center md:translate-y-14 text-center text-2xl leading-[200%] p-8 text-white">
        MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, mis ühendab endisi
        ja praegusi IT huvilisi tudengeid.
      </p>
    </Grid>
  </div>
</Section>

<Section className="relative overflow-hidden">
  <div class="pointer-events-none absolute inset-x-0 top-15 z-0" aria-hidden="true">
    <Svg
      type="connector"
      className="absolute left-0 w-[clamp(130px,14vw,230px)] text-orange-500"
    />
    <Svg
      type="mirrorH"
      className="absolute right-0 w-[clamp(130px,14vw,230px)] text-orange-500"
    />
  </div>

  <Grid columns={3} className="relative z-10 px-3 items-start max-w-6xl mx-auto mt-20" gap="gap-40">
    <Center dir="col" className="w-full max-w-sm justify-start">
      <div class="w-full aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/student-images/image_1.jpg"
          webpSrc=""
          alt="Tudengile Pilt"
          objectFit="cover"
          className="w-full h-full rounded-full"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-[2.5rem] text-center text-2xl font-semibold flex items-center justify-center">Tudengile</h3>
      <p class="w-full text-center text-xs leading-[160%]">Tule arenda oma oskuseid ja saa ägedaid sõpru! Omanda praktilist kogemust reaalsetest projektidest.</p>
    </Center>

    <Center dir="col" className="w-full max-w-sm justify-start">
      <div class="w-full aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/helpdesk/helpdesk_bg.jpg"
          webpSrc=""
          alt="Helpdesk Pilt"
          objectFit="cover"
          className="w-full h-full rounded-full"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-[2.5rem] text-center text-2xl font-semibold flex items-center justify-center">Helpdesk</h3>
      <p class="w-full text-center text-xs leading-[160%]">HELPDESK on MTÜ Lapikute poolt pakutav arvutiabiteenus. Teenus on suunatud tudengitele, õppejõududele ning kõikidele huvilistele.</p>
    </Center>

    <Center dir="col" className="w-full max-w-sm justify-start">
      <div class="w-full aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/helpdesk/469521237_1574639476758835_7853856396417097536_n.jpg"
          webpSrc=""
          alt="Ettevõttele Pilt"
          objectFit="cover"
          className="w-full h-full rounded-full"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-[2.5rem] text-center text-2xl font-semibold flex items-center justify-center">Ettevõttele</h3>
      <p class="w-full text-center text-xs leading-[160%]">Aitame sinu ideed ellu viia! Meie kogenud tudengid on valmis tejie projekte realiseerima.</p>
    </Center>
  </Grid>
</Section>