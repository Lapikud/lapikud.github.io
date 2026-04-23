import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const svelteSrc = readFileSync(resolve(__dirname, '../src/components/Svg.svelte'), 'utf-8');

const match = svelteSrc.match(/export const VARIANTS\s*=\s*\[([^\]]+)\]/);
if (!match) {
  console.error('Could not find VARIANTS in Svg.svelte');
  process.exit(1);
}

const variants = match[1]
  .split(',')
  .map(v => v.trim().replace(/['"]/g, ''))
  .filter(Boolean);

const stories = variants.map(v => `<Story name="${v}" args={{ type: '${v}' }} />`).join('\n');

const output = `<script context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Svg from '../components/Svg.svelte';

  const { Story } = defineMeta({
    title: 'Components/Svg',
    component: Svg,
  });
</script>

${stories}
`;

const outPath = resolve(__dirname, '../src/stories/Svg.stories.svelte');
writeFileSync(outPath, output, 'utf-8');
console.log(`✅ Generated ${variants.length} stories: ${variants.join(', ')}`);