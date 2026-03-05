import Icon from '../components/Svg.svelte';

export default {
  title: 'SVG/Icon',
  component: Icon,
  argTypes: {
    type: { control: { type: 'select', options: ['connector','mirrorV','mirrorH','mirrorVH','branch','branchH'] } },
    className: { control: 'text' },
  },
};

const Template = (args) => ({
  Component: Icon,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  type: 'connector',
  className: 'w-64 text-cyan-500',
};

export const MirrorV = Template.bind({});
MirrorV.args = {
  type: 'mirrorV',
  className: 'w-64 text-green-500',
};

export const MirrorH = Template.bind({});
MirrorH.args = {
  type: 'mirrorH',
  className: 'w-64 text-yellow-500',
};

export const MirrorVH = Template.bind({});
MirrorVH.args = {
  type: 'mirrorVH',
  className: 'w-64 text-pink-500',
};

export const Branch = Template.bind({});
Branch.args = {
  type: 'branch',
  className: 'w-48 text-magenta-500',
};

export const BranchH = Template.bind({});
BranchH.args = {
  type: 'branchH',
  className: 'w-48 text-magenta-500',
};