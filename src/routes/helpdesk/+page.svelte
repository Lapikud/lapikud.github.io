<script>
    import helpdeskbg from "$lib/assets/458396300_921856893308127_7829656149477072375_n.jpg";
    import helpdesk from "$lib/assets/helpdesk-on-black.png";

    import { MapLibre, Marker } from "svelte-maplibre";
    import MapPin from "lucide-svelte/icons/map-pin";
    import BusFront from "lucide-svelte/icons/bus-front";

    // Coordinates for Akadeemia tee 5, 12616 Tallinn [longitude, latitude]
    const center = [24.66887400515207, 59.396427975093935];
    // Coordinates for Keemia bus stop [longitude, latitude]
    const keemiaBusStop = [24.668325396145953, 59.397074517662276];
    // Coordinates for Tehnikaülikool bus stop [longitude, latitude]
    const tehnikaBusStop = [24.67328945396854, 59.39508874042947];
</script>

<div class="flex flex-col pb-8">
    <div class="w-full bg-black">
        <div
            class="flex absolute justify-center items-center flex-row w-full h-[60vh] px-4"
        >
            <img src={helpdesk} alt="Helpdesk logo" class="z-10" />
        </div>
        <img
            class="h-[60vh] object-cover object-left w-full opacity-50 blur-[1.5px]"
            src={helpdeskbg}
            alt="Helpdesk"
        />
    </div>
    <div class="max-w-[96rem] mx-auto flex flex-col py-16 px-8">
        <div class="grid lg:grid-cols-2 gap-16">
            <div class="flex flex-col">
                <h2 class="text-4xl font-light pb-4">Mis on HELPDESK?</h2>
                <p class="text-lg">
                    HELPDESK on MTÜ Lapikute poolt pakutav arvutiabiteenus.
                    Teenus on suunatud tudengitele, õppejõududele ning kõikidele
                    huvilistele ka väljaspool Tallinna Tehnikaülikooli. Meie
                    meeskond koosneb kogenud ja nutikatest Tallinna
                    Tehnikaülikooli IT-tudengitest.
                </p>
            </div>
            <div class="flex flex-col">
                <h2 class="text-4xl font-light pb-4">Mis teenuseid osutame?</h2>
                <ul class="text-lg list-disc pl-5">
                    <li>Arvuti riistvara diagnostika ja remont</li>
                    <li>Arvuti riistvara hooldus</li>
                    <li>Tarkvara diagnostika ja seadistamine</li>
                    <li>Tarkvara paigaldamine</li>
                    <li>Muu elektroonika parandamine</li>
                </ul>
            </div>
            <div class="flex flex-col">
                <h2 class="text-4xl font-light pb-4">Hinnakiri</h2>
                <div
                    class="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
                >
                    <table class="w-full text-lg">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200"
                                    >Teenus</th
                                >
                                <th
                                    class="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200"
                                    >Kogus/Aeg</th
                                >
                                <th
                                    class="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200"
                                    >Hind</th
                                >
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Arvuti diagnostika</td
                                >
                                <td class="px-6 py-4 text-gray-600">15min</td>
                                <td class="px-6 py-4 font-medium text-green-600"
                                    >Tasuta</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Arvuti diagnostika (alates +15min)</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >20€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Detaili paigaldamine arvutisse</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >10-15€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Sülearvuti tolmupuhastus + termopasta</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >10-20€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Sülearvuti ekraani paigaldus</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >15€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Arvuti komplekteerimine</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >20€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Tarkvara hooldustöö ja paigaldamine</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >10-15€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Muu elektroonika parandus</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >10-50€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Andmete taastamine</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >10-30€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Nutiseadmete tarkvarahooldus</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >15€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Operatsioonisüsteemi taaspaigaldus</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >15€</td
                                >
                            </tr>
                            <tr
                                class="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td class="px-6 py-4 text-gray-900"
                                    >Nutitelefoni klaasi/ekraani/aku vahetus</td
                                >
                                <td class="px-6 py-4 text-gray-600">tk</td>
                                <td class="px-6 py-4 font-medium text-gray-900"
                                    >15-30€</td
                                >
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="pt-4 text-lg font-bold">
                    Jupid tellitakse kliendi enda poolt või kokkuleppel
                    tehnikuga.
                    <br /><br />
                    Vajadusel tuleme üliõpilasküla ja Tehnopoli piires kohale.
                    <br /><br />
                    Oma tudengisõbralike hindade ja personaalse lähenemisega pakume
                    teenust, milles ei pea pettuma!
                </p>
            </div>
            <div class="flex flex-col">
                <h2 class="text-4xl font-light pb-4">
                    Lahtiolekuajad: <br /><strong>E</strong>smaspäevast –
                    <strong>R</strong>eedeni 14-19*
                </h2>
                <p class="text-lg font-light opacity-70 pb-16">
                    * Tegu on ajaperioodiga, mil meid on kõige tõenäolisem
                    tabada. Siiski ei saa garanteerida kohalolekut.
                </p>
                <h2 class="text-4xl font-light pb-4">Asukoht</h2>
                <div class="w-full h-96 rounded-lg overflow-hidden">
                    <MapLibre
                        style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                        class="relative aspect-video w-full h-full"
                        standardControls
                        {center}
                        zoom={15}
                    >
                        <Marker lngLat={center}>
                            <MapPin class="w-8 h-8 text-[#E69635]" />
                        </Marker>
                        <Marker
                            class="flex flex-col items-center"
                            lngLat={keemiaBusStop}
                        >
                            <p>Keemia</p>
                            <BusFront class="w-8 h-8 text-[#E69635]" />
                        </Marker>
                        <Marker
                            class="flex flex-col items-center"
                            lngLat={tehnikaBusStop}
                        >
                            <p>Tehnikaülikool</p>
                            <BusFront class="w-8 h-8 text-[#E69635]" />
                        </Marker>
                    </MapLibre>
                </div>
                <p class="pb-4 text-lg">
                    Saab <span class="text-[#E69635]"
                        >11, 37, 83, 91 bussiga Keemia peatusest</span
                    >
                    või
                    <span class="text-[#E69635]"
                        >Tehnikaülikool peatusest 10, 27, 33, 36, 45 bussiga.</span
                    >
                </p>
                <p class="text-lg font-bold">
                    Akadeemia tee 5 ühiselamu, ruum 008A
                </p>
            </div>
        </div>
    </div>
</div>
