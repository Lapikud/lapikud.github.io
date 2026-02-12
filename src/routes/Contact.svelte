<script>
  import {
    Section,
    Grid,
    Card,
    Center,
  } from "$components";
  
  import MapPin from "lucide-svelte/icons/map-pin";
  import Mail from "lucide-svelte/icons/mail";
  import Phone from "lucide-svelte/icons/phone";
  import MessageCircle from "lucide-svelte/icons/message-circle";
  import Facebook from "lucide-svelte/icons/facebook";
  import Instagram from "lucide-svelte/icons/instagram";
  import Github from "lucide-svelte/icons/github";
  import Building from "lucide-svelte/icons/building";
  import Clock from "lucide-svelte/icons/clock";

  const contactMethods = [
    {
      icon: MapPin,
      title: "Aadress",
      content: "Akadeemia tee 5, 12616 Tallinn",
      subtitle: "ICT-teaduskond, Raja 15 ruum 111",
      link: "https://goo.gl/maps/..."
    },
    {
      icon: Mail,
      title: "E-post",
      content: "lapikud@lapikud.ee",
      link: "mailto:lapikud@lapikud.ee"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+372 58 160 799",
      link: "tel:+37258160799"
    },
    {
      icon: MessageCircle,
      title: "Messenger",
      content: "m.me/Lapikud",
      link: "https://m.me/Lapikud"
    }
  ];

  const socialMedia = [
    {
      icon: Facebook,
      name: "Facebook",
      link: "https://www.facebook.com/Lapikud/"
    },
    {
      icon: Instagram,
      name: "Instagram",
      link: "https://www.instagram.com/lapikud/"
    },
    {
      icon: Github,
      name: "GitHub",
      link: "https://github.com/Lapikud/"
    }
  ];

  const organizationInfo = [
    {
      icon: Building,
      title: "Registrikood",
      content: "80167145"
    },
    {
      icon: Building,
      title: "Pangakonto",
      content: "EE812200221019551756",
      subtitle: "Swedbank"
    }
  ];

  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Create mailto link with form data
    const mailtoLink = `mailto:lapikud@lapikud.ee?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nimi: ${formData.name}\nE-post: ${formData.email}\n\nSõnum:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  }
</script>

<!-- Hero Section -->
<Section background="orange">
  <Center>
    <div class="text-center max-w-4xl">
      <h1 class="text-5xl font-bold mb-6">Võta ühendust</h1>
      <p class="text-2xl leading-relaxed">
        Kas sul on küsimusi? Tahad liituda? Või soovid alustada koostööd? Võta julgelt ühendust!
      </p>
    </div>
  </Center>
</Section>

<!-- Contact Methods -->
<Section>
  <div class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4">Kuidas meiega ühendust võtta?</h2>
    <p class="text-xl text-gray-600">Vali endale sobiv viis</p>
  </div>
  
  <Grid columns={2} gap="var(--space-5)">
    {#each contactMethods as method}
      <Card variant="glass">
        <div class="flex items-start gap-4">
          <div class="feature-icon shrink-0" style="color: var(--orange)">
            <svelte:component this={method.icon} size={32} strokeWidth={1.5} />
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold mb-2">{method.title}</h3>
            {#if method.link}
              <a 
                href={method.link}
                class="text-lg hover:underline"
                style="color: var(--orange)"
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                {method.content}
              </a>
            {:else}
              <p class="text-lg">{method.content}</p>
            {/if}
            {#if method.subtitle}
              <p class="text-gray-600 text-sm mt-1">{method.subtitle}</p>
            {/if}
          </div>
        </div>
      </Card>
    {/each}
  </Grid>
</Section>

<!-- Contact Form -->
<Section background="neutral">
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-4xl font-bold mb-4">Saada meile sõnum</h2>
      <p class="text-xl text-gray-600">Täida vorm ja me võtame sinuga ühendust</p>
    </div>
    
    <Card variant="glass">
      <form on:submit={handleSubmit} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-semibold mb-2">Nimi *</label>
          <input
            type="text"
            id="name"
            bind:value={formData.name}
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
            placeholder="Sinu nimi"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-semibold mb-2">E-post *</label>
          <input
            type="email"
            id="email"
            bind:value={formData.email}
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
            placeholder="sinu@email.ee"
          />
        </div>

        <div>
          <label for="subject" class="block text-sm font-semibold mb-2">Teema *</label>
          <input
            type="text"
            id="subject"
            bind:value={formData.subject}
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
            placeholder="Sõnumi teema"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-semibold mb-2">Sõnum *</label>
          <textarea
            id="message"
            bind:value={formData.message}
            required
            rows="6"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none"
            placeholder="Kirjuta oma sõnum siia..."
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
        >
          Saada sõnum
        </button>
      </form>
    </Card>
  </div>
</Section>

<!-- Office Hours & Location -->
<Section>
  <Grid gap="var(--space-5)">
    <Card variant="glass">
      <div class="flex items-start gap-4 mb-4">
        <div class="feature-icon" style="color: var(--orange)">
          <Clock size={32} strokeWidth={1.5} />
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-4">Lahtiolekuajad</h2>
        </div>
      </div>
      <div class="space-y-3 text-lg">
        <div class="flex justify-between">
          <span class="font-semibold">Esmaspäev - Reede:</span>
          <span>10:00 - 16:00</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Laupäev - Pühapäev:</span>
          <span>Suletud</span>
        </div>
        <p class="text-sm text-gray-600 mt-4">
          * Soovitame enne külastamist võtta ühendust, et vältida ootamist
        </p>
      </div>
    </Card>

    <Card variant="glass">
      <div class="flex items-start gap-4 mb-4">
        <div class="feature-icon" style="color: var(--orange)">
          <MapPin size={32} strokeWidth={1.5} />
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-4">Kuidas meid leida?</h2>
        </div>
      </div>
      <div class="space-y-3 text-lg">
        <p><strong>Aadress:</strong> Akadeemia tee 5, 12616 Tallinn</p>
        <p><strong>Hoone:</strong> ICT-teaduskond (Raja 15)</p>
        <p><strong>Ruum:</strong> 111</p>
        <p class="text-sm text-gray-600 mt-4">
          Asume Tallinna Tehnikaülikooli ICT-teaduskonna hoones. 
          Kui tuled ühistranspordiga, on lähimad peatused "Mustakivi" ja "Tehnikaülikool".
        </p>
      </div>
    </Card>
  </Grid>
</Section>

<!-- Social Media & Legal Info -->
<Section background="neutral">
  <Grid gap="var(--space-5)">
    <Card variant="glass">
      <h2 class="text-3xl font-bold mb-6 text-center">Jälgi meid sotsiaalmeedias</h2>
      <div class="flex flex-wrap justify-center gap-4">
        {#each socialMedia as social}
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-6 py-3 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors"
          >
            <svelte:component this={social.icon} size={24} style="color: var(--orange)" />
            <span class="font-semibold">{social.name}</span>
          </a>
        {/each}
      </div>
    </Card>

    <Card variant="glass">
      <h2 class="text-3xl font-bold mb-6 text-center">MTÜ Lapikud</h2>
      <div class="space-y-3">
        {#each organizationInfo as info}
          <div class="flex items-start gap-4">
            <svelte:component this={info.icon} size={24} style="color: var(--orange)" />
            <div>
              <p class="font-semibold">{info.title}</p>
              <p class="text-gray-700">{info.content}</p>
              {#if info.subtitle}
                <p class="text-sm text-gray-600">{info.subtitle}</p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </Grid>
</Section>

<style>
  .feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background: rgba(255, 127, 0, 0.1);
    border-radius: 50%;
  }
</style>
