<script setup>
import {
    Grid,
    Section,
    Container,
    Center,
    Svg,
  } from "../components/index.js";
import { text } from "../lib/index.js";

</script>

<template>
<Section bg="bg-gray-900" class="text-white" id="kontakt">
    <Grid>
        <div>
            <h3 class="text-3xl font-light pb-4">MTÜ Lapikud</h3>
            <Container :center="false">
                <address class="not-italic pb-4">
                    {{ text.footer?.address || "Aadress: " }}<a href="https://maps.app.goo.gl/1pCDMVNaMD29G7y78" class="text-orange-500">{{ text.footer?.addressValue || "Akadeemia tee 5, 12616 Tallinn, Eesti" }}</a>
                    <br/>
                    {{ text.footer?.mail || "E-post: " }}<a href="mailto:lapikud@lapikud.ee" class="text-orange-500">lapikud@lapikud.ee</a>
                    <br/>
                    {{ text.footer?.phone || "Tel: " }}<a href="tel:+37258160799" class="text-orange-500">+372 58 160 799</a>
                    <br/>
                    {{ text.footer?.messenger || "Messenger: " }}<a href="https://m.me/Lapikud" target="_blank" rel="noopener noreferrer" class="text-orange-500">m.me/Lapikud</a>
                </address>
                <div>
                    {{ text.footer?.reg || "Reg. kood: " }}<a href="https://ariregister.rik.ee/est/company/80167145/" class="text-orange-500">80167145</a>
                    <br/>
                    {{ text.footer?.bank || "Swedbank" }} EE812200221019551756
                </div>
            </Container>
        </div>
        <div>
        <Container :center="false">
            <h3 class="text-3xl font-light flex justify-center pb-4">{{ text.footer?.socials || "Sotsiaalmeedia" }}</h3>
            <div class="flex items-center justify-center gap-4">
                <a href="https://www.instagram.com/lapikud/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="transition-opacity duration-200">
                    <Svg type="instagram"/>
                </a>
                <a href="https://www.facebook.com/Lapikud" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="transition-opacity duration-200">
                    <Svg type="facebook"/>
                </a>
                <a href="https://github.com/lapikud" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="transition-opacity duration-200">
                    <Svg type="github"/>
                </a>
            </div>
        </Container>
        </div>
    </Grid>
    <Center><small class="text-orange-500 pt-6">© 2026 {{ text.footer?.organization || "MTÜ Lapikud" }}</small></Center>
</Section>
</template>
