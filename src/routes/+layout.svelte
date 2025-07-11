<script>
	// Importing dropdown component	
	import Dropdown from '$lib/dropdown.svelte';

	// Importing page store
	import { page } from '$app/stores';

	import '../app.css';
	import logo from '$lib/assets/logo.svg';

	// Icon imports (Lucide)
	import Coffee from 'lucide-svelte/icons/coffee';
	import CalendarClock from 'lucide-svelte/icons/calendar-clock';
	import Presentation from 'lucide-svelte/icons/presentation';
	import Swords from 'lucide-svelte/icons/swords';
	import Lectern from 'lucide-svelte/icons/lectern';
	import Bot from 'lucide-svelte/icons/bot';
	import HandHeart from 'lucide-svelte/icons/hand-heart';
	import Trophy from 'lucide-svelte/icons/trophy';

	let { children } = $props();
</script>

<nav class="w-full fixed z-20 inline-flex items-center h-32 p-8 justify-evenly bg-white">
	{#if $page.url.pathname === '/'}
		<div>
			<img src={logo} alt="Logo" class="collapse w-72" />
		</div>
	{:else}
		<a href="/">
			<img src={logo} alt="Logo" class="w-72" />
		</a>
	{/if}
	<div class="flex gap-x-4 text-xl z-20">
		<Dropdown name="Meist">
			<a href="/meist" class="block px-4 py-2 hover:bg-[#f0941d]">Mis teeme?</a>
			<a href="/meist#liitu" class="flex gap-2 items-center px-4 py-2 hover:bg-[#f0941d]"><Bot />Liitu meiega</a>
			<a href="/mentorid" class="flex gap-2 items-center px-4 py-2 hover:bg-[#f0941d]"><HandHeart />Mentorid</a>
			<a href="/juhatus" class="flex gap-2 items-center px-4 py-2 hover:bg-[#f0941d]"><Lectern />Juhatus</a>
		</Dropdown>
		<Dropdown name="Üritused">
			<a href="/kalender" class="flex gap-2 items-center px-4 py-2 border-b-[1px] hover:bg-[#f0941d]"><CalendarClock />Ürituste kalender</a>
			<a href="https://asikarikas.ee/" class="flex gap-2 items-center px-4 py-2 hover:bg-[#f0941d]"><Trophy />ASI karikas</a>
			<a href="/koolitused" class="flex gap-2 items-center px-4 py-2 hover:bg-[#f0941d]"><Presentation />Koolitused</a>
			<a href="/rebased" class="flex gap-2 items-center px-4 py-2 hover:bg-[#f0941d]"><Swords />Rebaste ristimine</a>
			<a href="/remondikohvik" class="flex gap-2 items-center px-4 py-2 hover:bg-[#f0941d]"><Coffee />Remondikohvik</a>
		</Dropdown>
		<a class="w-auto px-4 py-2 hover:bg-[#f0941d] rounded-md" href="/kontakt">Kontakt</a>
		<a class="w-auto flex gap-2 items-center px-4 py-2 hover:bg-[#f0941d] rounded-md" href="/helpdesk">Helpdesk</a>
	</div>
</nav>

<div class="pt-32">
	{@render children()}
</div>

<footer class="w-full bg-black text-[#f0941d] text-center p-8">
	<div class="grid grid-cols-2 max-w-[64rem] mx-auto">
		<div class="text-left">
			<h3 class="pb-4 text-2xl">MTÜ Lapikud</h3>
			<p>Aadress: Akadeemia tee 5, 12616 Tallinn, Eesti</p>
			<p>E-post: +372 58 160 799</p>
			<p>Messenger: m.me/Lapikud</p>
			<p>Reg. kood: 801 67 145</p>
			<p>Swedbank: EE812200221019551756</p>
		</div>
		<div class="text-left">
			<h3 class="pb-4 text-2xl">Meie sotsiaalid!</h3>
			<p>Facebook: <a href="https://www.facebook.com/Lapikud">Lapikud</a></p>
			<p>Instagram: <a href="https://www.instagram.com/lapikud/">@Lapikud</a></p>
		</div>
	</div>
	<p class="py-8">&copy; 2025 MTÜ Lapikud</p>
</footer>
