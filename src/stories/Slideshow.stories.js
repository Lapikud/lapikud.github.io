import { expect, userEvent, within } from 'storybook/test';
import Slideshow from '../components/Slideshow.vue';
import { images } from './placeholders.js';

export default {
  title: 'Components/Slideshow',
  component: Slideshow,
  args: { class: '', images, width: '400px', height: '250px', interactive: true, autoplay: false, interval: 3000, loop: true, startIndex: 0 },
};

export const Default = {};
export const NextAndPrevButtons = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dots = () => canvas.getAllByRole('button', { name: /Go to slide/ });
    await expect(dots()[0]).toHaveClass('active');
    await userEvent.click(canvas.getByLabelText('Next'));
    await expect(dots()[1]).toHaveClass('active');
    await userEvent.click(canvas.getByLabelText('Previous'));
    await expect(dots()[0]).toHaveClass('active');
  },
};

export const Autoplay = { args: { autoplay: true } };
