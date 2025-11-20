import Demo from './Demo.svelte'
import Home from './Home.svelte'

export const routes = {
  '/': Home,
  '/demo': Demo,
  // '/page': Page,
  // '/page/:id': Page, // with optional param
}