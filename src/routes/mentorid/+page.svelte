<script>
    // Data imports (JSON)
    import mentorid from "$lib/data/mentorid.json";

    // Icon imports (Lucide)
    import Mailbox from "lucide-svelte/icons/mailbox";
    import Phone from "lucide-svelte/icons/phone";
    import MessageCircle from "lucide-svelte/icons/message-circle";
    import Linkedin from "lucide-svelte/icons/linkedin";
    import Facebook from "lucide-svelte/icons/facebook";
    import Send from "lucide-svelte/icons/send";
</script>

<div class="max-w-[96rem] mx-auto flex flex-col py-8 px-8">
    <h1 class="text-4xl font-light pb-4 text-center">Lahedad mentorid</h1>
    <div class="grid grid-cols-1 gap-0 lg:gap-4">
        {#each mentorid as mentor}
            <div
                class="flex flex-col lg:flex-row items-start lg:items-center py-4 {mentorid.indexOf(
                    mentor,
                ) ===
                mentorid.length - 1
                    ? ''
                    : 'border-b-2 border-[#f0941d]'}"
            >
                <div class="w-80 h-80 aspect-square mb-2">
                    <img
                        src={`src/lib/assets/mentors-images/optimised/${mentor.photo}`}
                        alt={mentor.name}
                        class="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div class="ml-0 lg:ml-4 flex flex-col gap-4 lg:flex-row">
                    <div class="flex flex-col min-w-80">
                        <h3 class="text-4xl font-light pb-4">{mentor.name}</h3>
                        <p class="text-lg pb-4">Vanus: {mentor.age}</p>
                        <p class="text-lg">
                            {mentor.speciality}{mentor.term
                                ? ` - ${mentor.term}. kursus`
                                : ""}
                        </p>
                        <ul class="text-lg flex flex-row gap-1 pb-4">
                            <li>
                                {mentor.teams.length > 1 ? "Tiimid:" : "Tiim:"}
                            </li>
                            {#each mentor.teams as team, index}
                                <li>
                                    {team}{#if index < mentor.teams.length - 1},
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                        {#each mentor.contactMethods as method}
                            {#if method.name.toLowerCase() === "email"}
                                <a
                                    href="mailto:{method.value}"
                                    class="text-lg flex items-center gap-2 text-[#f0941d]"
                                    ><Mailbox />{method.value}</a
                                >
                            {/if}
                            {#if method.name.toLowerCase() === "telefoninumber"}
                                <a
                                    href="tel:{method.value}"
                                    class="text-lg flex items-center gap-2 text-[#f0941d]"
                                    ><Phone />{method.value}</a
                                >
                            {/if}
                            {#if method.name.toLowerCase() === "discord"}
                                <a
                                    href="https://discord.com/users/{method.value}"
                                    class="text-lg flex items-center gap-2 text-[#f0941d]"
                                    ><svg
                                        role="img"
                                        class="fill-current w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        ><path
                                            d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                                        /></svg
                                    >{method.value}</a
                                >
                            {/if}
                            {#if method.name.toLowerCase() === "linkedin"}
                                <a
                                    href="https://www.linkedin.com/in/{method.value}"
                                    class="text-lg flex items-center gap-2 text-[#f0941d]"
                                    ><Linkedin />{method.value}</a
                                >
                            {/if}
                            {#if method.name.toLowerCase() === "messenger"}
                                <a
                                    href="https://m.me/{method.value}"
                                    class="text-lg flex items-center gap-2 text-[#f0941d]"
                                    ><svg
                                        role="img"
                                        class="fill-current w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        ><path
                                            d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z"
                                        /></svg
                                    >{method.value}</a
                                >
                            {/if}
                            {#if method.name.toLowerCase() === "facebook"}
                                <a
                                    href={method.value}
                                    class="text-lg flex items-center gap-2 text-[#f0941d]"
                                    ><Facebook />Facebook</a
                                >
                            {/if}
                            {#if method.name.toLowerCase() === "telegram"}
                                <a
                                    href="https://t.me/{method.value}"
                                    class="text-lg flex items-center gap-2 text-[#f0941d]"
                                    ><Send />{method.value}</a
                                >
                            {/if}
                        {/each}
                    </div>
                    <div class="flex flex-col gap-2">
                        <h3 class="text-xl">
                            Milliseid inimesi ootan oma piksliteks?
                        </h3>
                        <p class="text-lg">{mentor.description}</p>
                        <h3 class="text-xl">Milline Lapik olen ise?</h3>
                        <p class="text-lg">{mentor.activities}</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
