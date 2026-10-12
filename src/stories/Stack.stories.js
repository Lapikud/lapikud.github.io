import Stack from '../components/layout/Stack.vue';

const box = '<div class="p-4 bg-orange-200 rounded">Item</div>';
const items = box.repeat(4);

export default {
  title: 'Layout/Stack',
  component: Stack,
  args: { class: '', gap: 'gap-3', align: 'stretch' },
  argTypes: {},
  render: (args) => ({
    components: { Stack },
    setup: () => ({ args }),
    template: `<Stack v-bind="args">${items}</Stack>`,
  }),
};

export const Default = {};
