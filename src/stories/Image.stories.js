import Image from '../components/Image.vue';
import { images } from './placeholders.js';

export default {
  title: 'Components/Image',
  component: Image,
  args: { class: '', pictureClass: '', src: images[0].src, alt: 'Placeholder', webpSrc: '', srcSet: '', webpSrcSet: '', objectFit: 'contain', hover: false, href: null, target: '_blank', rel: 'noopener noreferrer' },
  argTypes: { objectFit: { control: 'select', options: ['contain', 'cover', 'fill', 'none', 'scale-down'] } },
};

export const Default = {};
export const HoverLink = { args: { hover: true, href: 'https://example.com' } };
