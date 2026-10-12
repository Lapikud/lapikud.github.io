import Container from '../components/layout/Container.vue';

const box = '<div class="p-4 bg-orange-200 rounded">Item</div>';

export default {
  title: 'Layout/Container',
  component: Container,
  args: { class: '', maxWidth: false, center: true },
  argTypes: {},
  render: (args) => ({
    components: { Container },
    setup: () => ({ args }),
    template: `<Container v-bind="args">${box}</Container>`,
  }),
};

export const Default = {};
