const color = (c) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="400" height="250" fill="${c}"/></svg>`)}`;

export const images = ['#f97316', '#3b82f6', '#10b981'].map((c, i) => ({ src: color(c), alt: `Slide ${i + 1}` }));
