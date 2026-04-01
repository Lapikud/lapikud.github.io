<script>
import {Section, Stack, Grid, Center, Image, Svg, Button} from "$components";
import { navigate } from "$lib/router/router.js";
</script>

<!-- TODO: grid gap dynamic -->

<!-- Hero Section -->
<Section className="relative min-h-screen overflow-hidden" padding="none" bg="bg-gray-900" id="hero">
  <div class="relative min-h-screen flex items-center">
    <div class="absolute inset-0" aria-hidden="true">
      <Image
        src="/assets/BSidesTLN25-KerstinTälli-128.jpg"
        alt=""
        objectFit="cover"
        className="w-full h-full"
        pictureClass="block w-full h-full"
      />
    </div>
    <div
      class="pointer-events-none absolute inset-0 hidden md:block [clip-path:polygon(42%_0,100%_0,100%_100%,65%_100%)]"
      aria-hidden="true"
    >
      <Svg
        type="mirrorH"
        className="absolute right-0 top-[16%] w-[clamp(130px,14vw,230px)] text-[#E18E38]"
      />
      <Svg
        type="branchH"
        className="absolute right-0 top-[52%] -translate-y-1/2 w-[clamp(56px,6vw,94px)] text-[#E18E38]"
      />
      <Svg
        type="mirrorVH"
        className="absolute right-0 bottom-[12%] w-[clamp(130px,14vw,230px)] text-[#E18E38]"
      />
    </div>
    <div class="pointer-events-none absolute inset-y-0 left-0 w-[70%] bg-linear-to-r from-black/65 via-black/35 to-transparent" aria-hidden="true"></div>
    <div class="relative z-20 flex min-h-screen w-full items-stretch px-6 py-8 md:px-10 md:py-12">
      <div class="flex w-full max-w-[460px] flex-col justify-between">
        <img src="/assets/LapLogo_white_orange.png" alt="MTÜ Lapikud" class="w-full max-w-[220px] md:max-w-[260px] h-auto"/>
        <div class="flex flex-col items-start gap-5">
          <p class="w-full max-w-[440px] text-left text-lg leading-[165%] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:max-w-[500px] md:text-xl">
            MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, mis ühendab endisi
            ja praegusi IT huvilisi tudengeid.
          </p>
          <Button
            class="rounded-lg border-orange-500 bg-orange-500 px-6 py-3 text-gray-900 transition-colors hover:border-orange-300 hover:bg-orange-300"
            onClick={() => navigate("/tudengile")}
          >
            Liitu LAPikutega!
          </Button>
        </div>
      </div>
    </div>
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

  <Grid columns={2} largeColumns={3} mobileColumns={1} className="relative z-10 items-start max-w-6xl mx-auto mt-12 px-4 md:mt-20 md:px-6" gap="gap-12 md:gap-16 lg:gap-24">
    <Center dir="col" className="w-full max-w-sm justify-start mx-auto">
      <div class="w-[min(72vw,240px)] md:w-[min(26vw,280px)] lg:w-[min(23vw,300px)] aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/student-images/image_1.jpg"
          webpSrc=""
          alt="Tudengile Pilt"
          objectFit="cover"
          className="w-full h-full rounded-full object-[center_35%]"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-10 text-center text-2xl font-semibold flex items-center justify-center">Tudengile</h3>
      <p class="w-full max-w-[26ch] text-center text-base leading-[160%]">Tule arenda oma oskuseid ja saa ägedaid sõpru! Omanda praktilist kogemust reaalsetest projektidest.</p>
    </Center>

    <Center dir="col" className="w-full max-w-sm justify-start mx-auto">
      <div class="w-[min(72vw,240px)] md:w-[min(26vw,280px)] lg:w-[min(23vw,300px)] aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/helpdesk/helpdesk_bg.jpg"
          webpSrc=""
          alt="Helpdesk Pilt"
          objectFit="cover"
          className="w-full h-full rounded-full object-[center_38%]"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-10 text-center text-2xl font-semibold flex items-center justify-center">Helpdesk</h3>
      <p class="w-full max-w-[26ch] text-center text-base leading-[160%]">HELPDESK on MTÜ Lapikute poolt pakutav arvutiabiteenus. Teenus on suunatud tudengitele, õppejõududele ning kõikidele huvilistele.</p>
    </Center>

    <Center dir="col" className="w-full max-w-sm justify-start mx-auto md:col-span-2 lg:col-span-1">
      <div class="w-[min(72vw,240px)] md:w-[min(26vw,280px)] lg:w-[min(23vw,300px)] aspect-square rounded-full overflow-hidden">
        <Image
          src="/assets/asi-karikas-2023-images/miina_harma.jpeg"
          webpSrc=""
          alt="Ettevõttele Pilt"
          objectFit="cover"
          className="w-full h-full rounded-full object-[center_25%]"
          pictureClass="block w-full h-full"
        />
      </div>
      <h3 class="w-full min-h-10 text-center text-2xl font-semibold flex items-center justify-center">Ettevõttele</h3>
      <p class="w-full max-w-[26ch] text-center text-base leading-[160%]">Aitame sinu ideed ellu viia! Meie kogenud tudengid on valmis teie projekte realiseerima.</p>
    </Center>
  </Grid>
</Section>
