import { expect, fn, userEvent, within } from 'storybook/test';
import Button from '../components/Button.vue';

export default {
  title: 'Components/Button',
  component: Button,
  args: { class: '', label: 'Click me', onClick: fn() },
  render: ({ label, ...args }) => ({
    components: { Button },
    setup: () => ({ args, label }),
    template: '<Button v-bind="args">{{ label }}</Button>',
  }),
};

export const Default = {};

export const ClickCallsOnClick = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button'));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
