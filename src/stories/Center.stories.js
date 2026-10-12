import Center from '../components/layout/Center.vue';

const box = '<div class="p-4 bg-orange-200 rounded">Item</div>';
const items = box.repeat(4);

export default {
  title: 'Layout/Center',
  component: Center,
  args: { class: '', dir: 'row', gap: 'gap-4' },
  argTypes: { dir: { control: 'select', options: ['row', 'col'] } },
  render: (args) => ({
    components: { Center },
    setup: () => ({ args }),
    template: `<Center v-bind="args">${items}</Center>`,
  }),
};

export const Default = {};
