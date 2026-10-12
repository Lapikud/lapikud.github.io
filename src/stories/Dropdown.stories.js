import { expect, userEvent, within } from 'storybook/test';
import Dropdown from '../components/Dropdown.vue';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: { name: 'Menu', buttonClass: '', panelClass: '' },
  render: (args) => ({
    components: { Dropdown },
    setup: () => ({ args }),
    template: `<div class="h-40"><Dropdown v-bind="args">
      <button type="button" class="block p-2">One</button><button type="button" class="block p-2">Two</button>
    </Dropdown></div>`,
  }),
};

export const Default = {};

export const OpensAndClosesOnSelect = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('One')).not.toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /Menu/ }));
    await expect(canvas.getByText('One')).toBeVisible();
    await userEvent.click(canvas.getByText('One'));
    await expect(canvas.getByText('One')).not.toBeVisible();
  },
};
