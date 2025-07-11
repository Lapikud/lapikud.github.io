<script>
    // Image and logo imports
    import logo from '$lib/assets/LAP_logo_v3_transp.png';
    import robotiklubi from '$lib/assets/partners/robotiklubi.png';
    import taltech_it_tk from '$lib/assets/partners/taltech_it_teaduskond_logo.png';
    import taltech from '$lib/assets/partners/taltech_logo.png';
    import eul from '$lib/assets/partners/eul.jpg';
    import hextech from '$lib/assets/partners/hextech_logo.svg';
    import eis from '$lib/assets/partners/eis.svg';
    import tehnopol from '$lib/assets/partners/tehnopollogo.png';
    import ituk from '$lib/assets/partners/ituk.svg';
    
    // Icon imports (Lucide)
    import Rocket from 'lucide-svelte/icons/rocket';
    import CalendarClock from 'lucide-svelte/icons/calendar-clock';
</script>

<div class="w-screen bg-[#f0941d] justify-center flex px-4 md:px-16">
    <div class="flex md:flex-row flex-col items-center max-w-[112rem] md:gap-16">
        <img src={logo} alt="Logo" class="w-[16rem] lg:w-[28rem] my-8 md:my-16"/>
        <h1 class="text-xl mb-8 md:mb-0 lg:mb-0 lg:text-3xl">MTÜ Lapikud on Tallinna Tehnikaülikooli Tarkvaraarendusklubi, mis ühendab endisi ja praegusi IT huvilisi tudengeid.</h1>
    </div>
</div>
<div class="max-w-[96rem] mx-auto flex flex-col py-4 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 py-8">
        <div class="flex flex-col">
            <h2 class="text-4xl font-light pb-4">Kes me oleme?</h2>
            <p class="text-lg">Organisatsioon loodi 2002. aastal informaatika tudengite poolt, kelle erialatunnuseks oli “LAP”. Targad mehed otsustasid, et järelikult on nad “Lapikud”. </p>
        </div>
        <div class="flex flex-col justify-center">
            <h2 class="text-4xl font-light pb-4">Millega tegeleme?</h2>
            <p class="text-lg">Meie põhieesmärgiks on Tallinna Tehnikaülikooli IT tudengite erialase lisandväärtuse loomine. Kaasame tudengeid huvitavatesse IT projektidesse ning anname tudengitele võimaluse midagi reaalset oma käega midagi ära teha. Meie projektidest kooruvad välja huvitavad ja tarvilikud lõputööd. Pakume nutikatele tudengitele võimalust saada meie juures esimene töökogemus. Lapikud ei ole ainult IT tudengite organisatsioon – püüame kaasata oma tegevusse ka majandusteaduskonna tudengeid, et projektides oleks esindatud ka äriline pool.</p>
        </div>
    </div>
    <div class="grid gap-16 py-8">
        <div class="flex flex-col">
            <h2 class="text-4xl font-light pb-4">Kas midagi huvitavat toimub?</h2>
            <p class="text-lg">
                Meie tegevuste hulka kuulub magus ja mõnus Remondikohvik, kus elektroonika saab uue elu. Lisaks pakume erinevaid koolitusi, alates Gitist ja andmebaasidest kuni riistvara paranduse ja tarkvaraarenduse põhitõdedeni mis on ka koostöös vahel ITÜKiga. <br>
                Traditsioonid elavad edasi LapLanil, kus võtab mõõtu näiteks Factorio <i>speedrun</i>. Samuti korraldame DnD päevi, kareokeõhtuid, talve- ja suvepäevi ning palju muid meeldejäävaid sündmusi. <br>
                Eraldi tõstame esile ka ASI Karika, mida korraldavad Tallinna Tehnikaülikooli Arvutisüsteemide Instituut ja tarkvaraarendusklubi MTÜ Lapikud. See on ideaalne võimalus panna oma koodikirjutamise oskused proovile ja lahendada praktilisi muresid!
            </p>
            <div class="flex text-xl items-center text-[#f0941d] font-bold flex-row gap-x-4 py-8">
                <Rocket size="40"/>
                <div class="flex items-center flex-col gap-4">
                    <p>Tule ja avasta, mida kõike põnevat meil pakkuda on!</p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col py-8">
        <h2 class="text-4xl font-light pb-4">Lahedad koostööpartnerid</h2>
        <div class="grid md:grid-cols-4 gap-8">
            <div class="flex justify-center items-center">
                <a href="https://eis.ee/">
                    <img src={eis} alt="Enterprise Estonia logo" class="w-96"/>
                </a>
            </div>
            <div class="flex justify-center items-center">
                <a href="https://www.eyl.ee">
                    <img src={eul} alt="Eesti Üliõpilaskondade Liit logo" class="w-48"/>
                </a>
            </div>
            <div class="flex justify-center items-center">
                <a href="https://hextech.ee">
                    <img src={hextech} alt="Hextech logo" class="w-48"/>
                </a>
            </div>
            <div class="flex justify-center items-center">
                <a href="https://ituk.ee/">
                    <img src={ituk} alt="ITÜK logo" class="w-48"/>
                </a>
            </div>
            <div class="flex justify-center items-center">
                <a href="https://www.robotiklubi.ee">
                    <img src={robotiklubi} alt="Tallinna Tehnikaülikooli robotiklubi logo" class="w-48 p-8"/>
                </a>
            </div>
            <div class="flex justify-center items-center">
                <a href="https://taltech.ee">
                    <img src={taltech} alt="Tallinna Tehnikaülikooli (TalTech) logo" class="w-48"/>
                </a>
            </div>
            <div class="flex justify-center items-center">
                <a href="https://taltech.ee/infotehnoloogia-teaduskond">
                    <img src={taltech_it_tk} alt="Tallinna Tehnikaülikooli (TalTech) infotehnoloogia teaduskonna logo" class="w-48"/>
                </a>
            </div>
            <div class="flex justify-center items-center">
                <a href="https://tehnopol.ee/">
                    <img src={tehnopol} alt="Technopol logo" class="w-48"/>
                </a>
            </div>
        </div>
        <div>
            <h2 class="text-4xl font-light pb-4">EIS projekt</h2>
            <p class="text-lg">MTÜ Lapikud projekti "Mobiilne Droonituvastussüsteem" rahastatakse riigieelarvest teadus- ja arendustegevuse rahastamise vahenditest 100 000 € ulatuses, eesmärgiga luua füüsilised droonituvastusseadmed, mis tagavad kasutajale droonialase olukorra teadlikkuse. Projekti lõpptulemusena valmib kaks teineteisest eraldiseisvat seadet – spektrianalüüsi ning Direct Remote Identification tööpõhimõttel toimivad seadmed.</p>
        </div>
    </div>
</div>
