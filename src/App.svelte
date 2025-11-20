<script>
  import { Router, Route} from 'svelte-routing'
  import Navbar from './layout/Navbar.svelte'
  import Footer from './layout/Footer.svelte'
  import { routes } from './routes/index.js'
  import { theme, toggle } from './lib/theme.js'
</script>

<Navbar />
<Router>
  {#each Object.entries(routes) as [path, component]}
    <Route {path} {component} />
  {/each}
</Router>
<Footer />

<!-- use $theme to show current state -->
<button on:click={toggle} style="position:fixed;right:1rem;bottom:1rem" aria-label="Toggle theme">
  {#if $theme === 'dark'}☀️{:else}🌙{/if}
</button>