import Card from '../components/layout/Card.vue';

export default {
  title: 'Layout/Card',
  component: Card,
  args: { class: '', variant: 'default', href: '' },
  argTypes: { variant: { control: 'select', options: ['default', 'animated', 'animated-neutral', 'glass', 'blur'] } },
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `<Card v-bind="args">Card content</Card>`,
  }),
};

export const Default = {};
