import Svg, { VARIANTS } from '../components/Svg.vue';

export default {
  title: 'Components/Svg',
  component: Svg,
  argTypes: {
    type: { control: 'select', options: VARIANTS },
  },
};

export const Preview = {
  args: { type: VARIANTS[0] },
};
