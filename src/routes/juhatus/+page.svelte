<script>
    // Data imports (JSON)
    import pastManagement from '$lib/data/pastManagement.json';
    import currentManagement from '$lib/data/currentManagement.json';

    // Icon imports (Lucide)
    import Mailbox from 'lucide-svelte/icons/mailbox';
    import Phone from 'lucide-svelte/icons/phone';
</script>

<div class="max-w-[96rem] mx-auto flex flex-col py-8 px-4">
    <h1 class="text-4xl font-light pb-4 text-center">Praegune juhtkond</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {#each currentManagement as member}
            <div class="flex flex-col lg:flex-row items-center p-4">
                <div class="w-full h-auto max-w-[250px] aspect-square mb-2">
                    <img src={`src/lib/assets/management-images/${member.photo}`} alt={member.name} class="w-full h-full object-cover rounded-md"/>
                </div>
                <div class="ml-4">
                    <h3 class="text-2xl">{member.name}</h3>
                    <p class="text-xl">{member.role} - {member.subrole}</p>
                    <a href='mailto:{member.email}' class="text-lg flex items-center gap-4 text-[#f0941d]"><Mailbox />{member.email}</a>
                    <a href='tel:{member.phone}' class="text-lg flex items-center gap-4 text-[#f0941d]"><Phone />{member.phone}</a>
                </div>
            </div>
        {/each}
    </div>
</div>

<div class="max-w-[96rem] mx-auto flex flex-col py-8 px-4">
    <h1 class="text-4xl font-light pb-4 text-center">Organisatsiooni juhtinud inimesed läbi aegade</h1>
    {#each pastManagement as yearData}
        <div class="py-8">
            <div class="flex items-center pb-4 lg:px-16">
                <h2 class="text-3xl font-light text-[#f0941d]">{yearData.year}</h2>
                <hr class="border-t-2 border-[#f0941d] flex-grow ml-4">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-center">
                {#each yearData.members as member}
                    <div class="flex flex-col items-center">
                        <div class="w-full h-auto max-w-[150px] mx-auto aspect-square mb-2">
                            <img src={`src/lib/assets/past-management-images/optimised/${member.image}`} alt={member.name} class="w-full h-full object-cover rounded-md"/>
                        </div>
                        <h3 class="text-lg font-medium text-center">{member.name}</h3>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
