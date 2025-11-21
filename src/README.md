# Development Guide

> [!TIP]
> Don't take anything here too seriously and have fun experimenting!
>
> You're here to learn after all :)

Running `npm run dev` starts a local development server with hot reloading (so you can see changes immediately as you edit files)

> [!WARNING]  
> This project uses custom router in `lib/Router.svelte`
>
> DO NOT TOUCH unless you know what you're doing! If you want to tinker, then do. When it breaks it just doesn't load any pages

## Internationalization (i18n)

This project uses a simple custom i18n solution defined in `src/lib/i18n.js`.

Import it with `$lib` alias as:

```js
import { currentLang, text, switchLang } from "$lib";
```

text contains a Svelte store that holds the current translations. To use it in a Svelte component, use the `$` prefix to auto-subscribe to the store:

```js
<p>{$text.key}</p> //replace the key with the translation key example: "nav.about"
```

## Styling

Look at `src/app.css` for global styles and CSS variables. Each Svelte component can also have its own styles scoped to that component

Variables are defined in `:root`

we only have 3 colors in out palette + 2 variants:

- `--orange`
- `--black`
- `--white`

- `--off-white`
- `--off-black`

Add new ones only if they seem universal enough to be used in multiple places, don't add stuff like `--space-100: -888px` noone else will ever use that, if you really need it just add it to the component's own style block

## Layout

Try to use the existing layout components in `src/app.css` as much as possible to keep things consistent across the site.

> [!NOTE]
> These components are standard html components like h1, p, a, ul, li, etc but styled to fit the site's look and feel. Use html components defined in `src/app.css` unless you have a very good reason not to.

If there are no existing components that fit your needs, feel free to add new ones but try to keep them generic enough to be reused in other places. Extra styiling can be added in the component's own style block as needed.

## Responsive design

There are also helper classes for responsive design:

- `desktop-only` - hides content on mobile devices
- `mobile-only` - hides content on desktop devices

These classes use media queries defined in `src/app.css` based on common breakpoints.

also things like `.stack`, `.inline`, `.grid`. Go look at `src/app.css` for what they do.

## Routing

Routing is handled by the custom router in `src/lib/Router.svelte` and `src/lib/router/router.js`.
To add new routes, edit `src/routes/index.js` and add your new route there.

Import router functions as:

```js
import { navigate, goBack, reload, getPath, getQuery } from "$lib"; // only import what you need
```
