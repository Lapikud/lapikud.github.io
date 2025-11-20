import { writable } from 'svelte/store'

const init = (() => {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch (e) {}
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
})()

export const theme = writable(init)

theme.subscribe(value => {
  try { localStorage.setItem('theme', value) } catch (e) {}
  document.documentElement.dataset.theme = value
})

export function toggle() {
  theme.update(t => t === 'dark' ? 'light' : 'dark')
}