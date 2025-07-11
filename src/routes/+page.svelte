<script>
    // Image and logo imports
    import logo from "$lib/assets/LAP_logo_v3_transp.png";

    // Icon imports (Lucide)
    import Rocket from "lucide-svelte/icons/rocket";
    import CalendarClock from "lucide-svelte/icons/calendar-clock";

    // Component imports
    import partnersList from "$lib/data/partnersList.json";
</script>

<div class="w-screen bg-[#f0941d] justify-center flex px-8 md:px-16">
    <div
        class="flex md:flex-row flex-col items-center max-w-[112rem] md:gap-16"
    >
        <img
            src={logo}
            alt="Logo"
            class="w-[16rem] lg:w-[28rem] my-8 md:my-16"
        />
        <h1 class="text-xl mb-8 md:mb-0 lg:mb-0 lg:text-3xl">
            MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, mis
            ühendab endisi ja praegusi IT huvilisi tudengeid.
        </h1>
    </div>
</div>
<div class="max-w-[96rem] mx-auto flex flex-col py-4 px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 py-8">
        <div class="flex flex-col">
            <h2 class="text-4xl font-light pb-4">Kes me oleme?</h2>
            <p class="text-lg">
                Organisatsioon loodi 2002. aastal informaatika tudengite poolt,
                kelle erialatunnuseks oli “LAP”. Targad mehed otsustasid, et
                järelikult on nad “Lapikud”.
            </p>
        </div>
        <div class="flex flex-col justify-center">
            <h2 class="text-4xl font-light pb-4">Millega tegeleme?</h2>
            <p class="text-lg">
                Meie põhieesmärgiks on Tallinna Tehnikaülikooli IT tudengite
                erialase lisandväärtuse loomine. Kaasame tudengeid huvitavatesse
                IT projektidesse ning anname tudengitele võimaluse midagi
                reaalset oma käega midagi ära teha. Meie projektidest kooruvad
                välja huvitavad ja tarvilikud lõputööd. Pakume nutikatele
                tudengitele võimalust saada meie juures esimene töökogemus.
                Lapikud ei ole ainult IT tudengite organisatsioon – püüame
                kaasata oma tegevusse ka majandusteaduskonna tudengeid, et
                projektides oleks esindatud ka äriline pool.
            </p>
        </div>
    </div>
    <div class="grid gap-16 py-8">
        <div class="flex flex-col">
            <h2 class="text-4xl font-light pb-4">
                Kas midagi huvitavat toimub?
            </h2>
            <p class="text-lg">
                Meie tegevuste hulka kuulub magus ja mõnus Remondikohvik, kus
                elektroonika saab uue elu. Lisaks pakume erinevaid koolitusi,
                alates Gitist ja andmebaasidest kuni riistvara paranduse ja
                tarkvaraarenduse põhitõdedeni mis on ka koostöös vahel ITÜKiga. <br
                />
                Traditsioonid elavad edasi LapLanil, kus võtab mõõtu näiteks Factorio
                <i>speedrun</i>. Samuti korraldame DnD päevi, kareokeõhtuid,
                talve- ja suvepäevi ning palju muid meeldejäävaid sündmusi.
                <br />
                Eraldi tõstame esile ka ASI Karika, mida korraldavad Tallinna Tehnikaülikooli
                Arvutisüsteemide Instituut ja tarkvaraarendusklubi MTÜ Lapikud. See
                on ideaalne võimalus panna oma koodikirjutamise oskused proovile
                ja lahendada praktilisi muresid!
            </p>
            <div
                class="flex text-xl items-center text-[#f0941d] font-bold flex-row gap-x-4 py-8"
            >
                <Rocket size="40" />
                <div class="flex items-center flex-col gap-4">
                    <p>Tule ja avasta, mida kõike põnevat meil pakkuda on!</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="w-screen justify-center flex flex-col">
    <div class="mx-auto flex flex-col py-4 px-8">
        <h2 class="text-4xl font-light pb-4">Koostööpartnerid</h2>
    </div>
    <div class="w-full py-8">
        <div class="max-w-[96rem] mx-auto px-8">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {#each partnersList as partner}
                    <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-center h-20 p-4"
                    >
                        <img
                            src={partner.logopath}
                            alt={partner.alt}
                            class="{partner.sizeClass} object-contain"
                        />
                    </a>
                {/each}
            </div>
        </div>
    </div>
    <div class="max-w-[96rem] mx-auto flex flex-col py-12 px-8">
        <h2 class="text-4xl font-light pb-4">EIS projekt</h2>
        <p class="text-lg">
            MTÜ Lapikud projekti "Mobiilne Droonituvastussüsteem" rahastatakse
            riigieelarvest teadus- ja arendustegevuse rahastamise vahenditest
            100 000 € ulatuses, eesmärgiga luua füüsilised
            droonituvastusseadmed, mis tagavad kasutajale droonialase olukorra
            teadlikkuse. Projekti lõpptulemusena valmib kaks teineteisest
            eraldiseisvat seadet – spektrianalüüsi ning Direct Remote
            Identification tööpõhimõttel toimivad seadmed.
        </p>
    </div>
</div>
