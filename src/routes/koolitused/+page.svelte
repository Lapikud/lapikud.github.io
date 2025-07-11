<script>
    import koolitusebanner from '$lib/assets/469521237_1574639476758835_7853856396417097536_n.jpg';
    import graafik from '$lib/data/koolitusteGraafik.json';

    let uritused = graafik.plannedEvents;
</script>

<div class="flex flex-col">
    <div class="w-full bg-black">
        <div class="flex absolute justify-center items-center flex-row w-full h-[60vh] px-4">
            <h1 class="text-8xl font-bold text-[#f0941d] z-10 -translate-x-4 block">Koolitused</h1>
        </div>
        <img class="h-[60vh] object-cover w-[920rem] opacity-50 blur-[1.5px]" src={koolitusebanner} alt="Koolituste banner"/>
    </div>
</div>
<div class="max-w-[96rem] mx-auto flex flex-col py-4 px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 py-16">
        <div class="flex flex-col">
            <h2 class="text-4xl font-light pb-4">Mis on plaanis?</h2>
            <ul class="space-y-4">
                {#each uritused as uritus}
                    <li class="text-lg bg-white p-4 rounded-lg shadow-md border-l-4 border-[#f0941d]">
                        <h3 class="font-semibold text-xl text-[#f0941d]">{uritus.eventName}</h3>
                        <div class="text-gray-800">
                            <span class="font-medium">Kuupäev:</span> {new Date(uritus.date).toLocaleDateString('et-EE')}
                        </div>
                        <div class="text-gray-800">
                            <span class="font-medium">Kellaaeg:</span> {uritus.time}
                        </div>
                        <div class="text-gray-800">
                            <span class="font-medium">Asukoht:</span> {uritus.location}
                        </div>
                        {#if uritus.collaborator}
                        <div class="text-gray-800">
                            <span class="font-medium">Koostööpartner:</span> {uritus.collaborator}
                        </div>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="flex flex-col">
            <h2 class="text-4xl font-light pb-4">Mis on koolituste mõtte?</h2>
            <p class="text-lg">
                Meie koolituste eesmärk on pakkuda Tallinna Tehnikaülikooli IT tudengitele praktilisi ja väärtuslikke kogemusi, mis aitavad neil oma erialaseid oskusi arendada. Koolituste kaudu saavad tudengid osaleda põnevates IT projektides, kus nad saavad oma teadmisi rakendada ja uusi oskusi omandada. 
                <br><br>
                Lapikud ei ole ainult IT-tudengite organisatsioon – me püüame kaasata ka majandus- ja inseneriteaduskonna tudengeid, et projektides oleks esindatud äriline kui ka praktiline pool. Meie koolitused ja üritused on suurepärane võimalus kohtuda sarnaselt mõtlevate inimestega, luua uusi kontakte ja saada osa meie aktiivsest ja toetavast kogukonnast.
            </p>
        </div>
    </div>
</div>