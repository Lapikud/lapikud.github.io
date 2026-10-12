import Section from '../components/layout/Section.vue';

const box = '<div class="p-4 bg-orange-200 rounded">Item</div>';

export default {
  title: 'Layout/Section',
  component: Section,
  args: { class: '', bg: 'bg-gray-100', background: '', id: '', contentClass: '', padding: 'normal', fullWidth: false },
  argTypes: { padding: { control: 'select', options: ['none', 'tight', 'small', 'normal', 'large'] } },
  render: (args) => ({
    components: { Section },
    setup: () => ({ args }),
    template: `<Section v-bind="args">${box}</Section>`,
  }),
};

export const Default = {};
