import Svg, { VARIANTS } from '../components/Svg.vue';

export default {
  title: 'Components/Svg',
  component: Svg,
  argTypes: { type: { control: 'select', options: VARIANTS } },
  args: { type: VARIANTS[0], class: 'w-48' },
  render: (args) => ({
    components: { Svg },
    setup: () => ({ args }),
    template: '<Svg :type="args.type" :class="args.class" />',
  }),
};

export const Playground = {};

export const AllVariants = {
  render: () => ({
    components: { Svg },
    setup: () => ({ VARIANTS }),
    template: `<div class="grid grid-cols-3 gap-6 p-4">
      <div v-for="v in VARIANTS" :key="v"><Svg :type="v" class="w-32" /><p>{{ v }}</p></div>
    </div>`,
  }),
};
