<script context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Svg from '../components/Svg.svelte';

  const { Story } = defineMeta({
    title: 'Components/Svg',
    component: Svg,
  });
</script>

<Story name="connector" args={{ type: 'connector' }} />
<Story name="mirrorV" args={{ type: 'mirrorV' }} />
<Story name="mirrorH" args={{ type: 'mirrorH' }} />
<Story name="mirrorVH" args={{ type: 'mirrorVH' }} />
<Story name="branch" args={{ type: 'branch' }} />
<Story name="branchH" args={{ type: 'branchH' }} />
