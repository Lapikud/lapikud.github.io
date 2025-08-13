<script>
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

<div class="flex flex-col md:w-9/12 mx-auto px-4 py-16">
    <h1 class="text-4xl font-light items-start pb-8">Kontakt</h1>
    <div class="grid grid-cols-2 font-light">
        <div>
            <h2 class="text-3xl pb-4">Helpdesk</h2>
            <p class="text-xl font-medium pb-2">
                E-mail: <a
                    class="text-[#E69635] font-normal"
                    href="mailto:helpdesk@lapikud.ee">helpdesk@lapikud.ee</a
                >
            </p>
            <p class="text-xl pb-2 font-medium">
                Telefon: <a
                    class="text-[#E69635] font-normal"
                    href="tel:+37258160799"
                    >+372 58 160 799
                </a>
            </p>
            <p class="text-xl font-medium">
                Facebook: <a
                    class="text-[#E69635] font-normal"
                    href="https://www.facebook.com/lapikudhelpdesk"
                    target="_blank">lapikudhelpdesk</a
                >
            </p>
        </div>
        <div>
            <h2 class="text-3xl pb-4">Mittetulundusühing Lapikud</h2>

            <p class="text-xl font-medium pb-2">
                Aadress: <span class="text-[#E69635] font-normal"
                    >Akadeemia tee 5, 12616 Tallinn</span
                >
            </p>
            <p class="text-xl font-medium pb-2">
                E-post: <a
                    class="text-[#E69635] font-normal"
                    href="mailto:lapikud@lapikud.ee">lapikud@lapikud.ee</a
                >
            </p>
            <p class="text-xl pb-2 font-medium">
                Telefon: <a
                    class="text-[#E69635] font-normal"
                    href="tel:+37258160799"
                    >+372 58 160 799
                </a>
            </p>
            <p class="text-xl pb-2 font-medium">
                Reg. kood: <span class="text-[#E69635] font-normal"
                    >801 67 145</span
                >
            </p>
            <p class="text-xl font-medium">
                Swedbank: <span class="text-[#E69635] font-normal"
                    >EE812200221019551756</span
                >
            </p>
        </div>
    </div>
    <h2 class="text-3xl font-light pb-2 pt-8">Asukoht</h2>
    <p class="pb-4 text-neutral-500">
        Saab <span class="text-[#E69635]"
            >11, 37, 83, 91 bussiga Keemia peatusest</span
        >
        või
        <span class="text-[#E69635]"
            >Tehnikaülikool peatusest 10, 27, 33, 36, 45 bussiga.</span
        >
    </p>
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
            <Marker class="flex flex-col items-center" lngLat={keemiaBusStop}>
                <p>Keemia</p>
                <BusFront class="w-8 h-8 text-[#E69635]" />
            </Marker>
            <Marker class="flex flex-col items-center" lngLat={tehnikaBusStop}>
                <p>Tehnikaülikool</p>
                <BusFront class="w-8 h-8 text-[#E69635]" />
            </Marker>
        </MapLibre>
    </div>
</div>
