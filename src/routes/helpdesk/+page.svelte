<script>
    import helpdeskbg from "$lib/assets/458396300_921856893308127_7829656149477072375_n.jpg";
    import helpdesk from "$lib/assets/helpdesk-on-black.png";
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
        <div class="grid lg:grid-cols-2 gap-0 lg:gap-16">
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
        </div>
    </div>
</div>
