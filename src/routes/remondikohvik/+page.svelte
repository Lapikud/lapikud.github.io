<script>
    import rk1 from '$lib/assets/remondikohvik/rk-1.jpg';
    import rk2 from '$lib/assets/remondikohvik/rk-2.jpg';
    import rk3 from '$lib/assets/remondikohvik/rk-3.jpg';
    import rklogo from '$lib/assets/remondikohvik/rk-logo.png';
    import robotiklubi from '$lib/assets/partners/robotiklubi.png';
    import tthk from '$lib/assets/partners/tthk.png';
    import taltech_it_tk from '$lib/assets/partners/taltech_it_teaduskond_logo.png';
</script>

<div class="flex flex-col pb-8">
    <div class="w-full grid grid-cols-2 md:grid-cols-3 bg-black">
        <div class="flex absolute justify-center items-center z-10 pointer-events-none -translate-y-8 flex-row w-full h-[60vh] px-4">
            <img src={rklogo} alt="Remondikohviku logo" class="w-[20rem]"/>
            <h1 class="text-8xl font-bold text-[#ffa80d] translate-y-10 -translate-x-4 lg:block hidden">Remondikohvik</h1>
        </div>
        <img class="h-[60vh] object-cover opacity-50 hover:opacity-80 transition-all hover:blur-none blur-[1.5px]" src={rk1} alt="Remondikohvik 2025"/>
        <img class="hidden md:block h-[60vh] object-cover opacity-50 hover:opacity-80 transition-all hover:blur-none blur-[1.5px]" src={rk2} alt="Remondikohvik 2025"/>
        <img class="h-[60vh] object-cover opacity-50 hover:opacity-80 transition-all hover:blur-none blur-[1.5px]" src={rk3} alt="Remondikohvik 2025"/>
    </div>
    <div class="max-w-[96rem] mx-auto flex flex-col py-8 px-4">
        <div class="grid lg:grid-cols-2 gap-0 lg:gap-16">
            <div class="flex flex-col">
                <h2 class="text-4xl font-light pb-4">Mis on remondikohvik?</h2>
                <p class="text-lg">Remondikohvik on koht, kuhu saab tulla julgelt nõu küsima, ise käed külge lüüa parandamisel või lasta asjatundlikemal üle vaadata parandust vajavad esemed. Teid ootavad sõbralikud ja heatujulised abilised, kellega saab ka niisama kohvitades juttu vesta. ☕️ </p>
            </div>
            <div class="flex flex-col">
                <h2 class="text-4xl font-light pb-4">Kuidas sai remondikohvik alguse?</h2>
                <p class="text-lg">Remondikohvik ei toimu üldsegi mitte esimest korda! See sai alguse juba 2013. aastal Skeemipesa, Lapikute ja kohviku Pööning koostöös. Vahelduva eduga on üritust korraldatud aastate jooksul mitu korda. Tegelikult ei ole ka remondikohviku idee üldsegi uudne, vaid selletaolised üritused on mitmel pool maailmas päris palju populaarsust kogunud. Sellest on kujunenud lausa kogukond, mis toob regulaarselt naabruskonna ühtekokku, et aidata üksteisel korda teha asjad, mille parandamine tüütu või lootusetuna tundub ning samal ajal ka lõbusalt aega veeta. Loodame, et meie unistus täitub ning näeme sellise kogukonna teket ka Tallinnas.</p>
            </div>
        </div>
        <div>
            <h1 class="text-4xl font-light pb-4">Koostööpartnerid</h1>
            <div class="flex flex-row gap-x-4">
                <div class="flex justify-center items-center">
                    <a href="https://www.tthk.ee/">
                        <img src={tthk} alt="Tallinna Tööstushariduskeskus logo" class="w-48 p-4"/>
                    </a>
                </div>
                <div class="flex justify-center items-center">
                    <a href="https://www.robotiklubi.ee">
                        <img src={robotiklubi} alt="Tallinna Tehnikaülikooli robotiklubi logo" class="w-48 p-8"/>
                    </a>
                </div>
                <div class="flex justify-center items-center">
                    <a href="https://taltech.ee/infotehnoloogia-teaduskond">
                        <img src={taltech_it_tk} alt="Tallinna Tehnikaülikooli infotehnoloogia teaduskonna logo" class="w-64"/>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>