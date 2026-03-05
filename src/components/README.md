# SVG previews

use `npm run storybook` which opens a browser window with all the SVG variations. You can also edit the SVG properties in storybook controls.

# Components

under components are building blocks that are not layout related.

## details

- Button: a simple button component with some styling.
- Dropdown: a dropdown component that can be used to show/hide content.
- Slideshow: a simple slideshow component that can be used to show multiple images in a slideshow format. Includes options to enable/disable autoplay and to set the autoplay interval.
- Svg: a component that renders different SVG icons based on the `type` prop. See the comment after the `type` prop in `Svg.svelte` for the available types.
- Image: a component that renders an image with some styling. It accepts a lot of props. Main ones are `src` (the main image source that is used if anything else fails or not provided), `alt` (the alt text for the image), `srcSet` (a string of comma-separated image sources for different screen sizes, jpg or png files), `webpSrc` (the webp image source as a webp file), `webpSrcSet` (a string of comma-separated webp image sources for different screen sizes). We use 2 webp images: 400 and 800 width, and one jpg image 800 width as default src for fallback.

# Layout components

under components/layout are components that are used to structure the page, such as Container, Stack, Center, etc.