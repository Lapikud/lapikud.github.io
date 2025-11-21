# Development Guide

> [!TIP]
> Don't take anything here too seriously and have fun experimenting!
>
> > You're here to learn after all :)

Running `npm run dev` starts a local development server with hot reloading (so you can see changes immediately as you edit files)

> [!WARNING]  
> This project uses custom router in `lib/Router.svelte`
>
> > DO NOT TOUCH unless you know what you're doing! If you want to tinker, then do. When it breaks it just doesnt load any pages

## Styling

Look at `src/app.css` for global styles and CSS variables. Each Svelte component can also have its own styles scoped to that component

Variables are defined in `:root`

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
