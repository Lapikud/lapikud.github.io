import Grid from '../components/layout/Grid.vue';

const box = '<div class="p-4 bg-orange-200 rounded">Item</div>';
const items = box.repeat(4);

export default {
  title: 'Layout/Grid',
  component: Grid,
  args: { class: '', columns: 4, tabletColumns: null, largeColumns: null, mobileColumns: 1, min: '220px', gap: 'gap-3' },
  argTypes: {},
  render: (args) => ({
    components: { Grid },
    setup: () => ({ args }),
    template: `<Grid v-bind="args">${items}</Grid>`,
  }),
};

export const Default = {};
