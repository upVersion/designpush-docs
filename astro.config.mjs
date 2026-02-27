import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'DesignPush',
      logo: {
        src: './src/assets/dp-logo.svg',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      head: [],
      components: {
        Header: './src/components/Header.astro',
        Sidebar: './src/components/Sidebar.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          collapsed: true,
          items: [
            { label: 'Quick Start', link: '/getting-started/quick-start/' },
          ],
        },
        {
          label: 'Fundamentals',
          collapsed: true,
          items: [
            { slug: 'fundamentals/concepts' },
            { slug: 'fundamentals/interface-overview' },
          ],
        },
        {
          label: 'Editing Tokens',
          collapsed: true,
          items: [
            { slug: 'editing-tokens/primitive-tokens' },
            { slug: 'editing-tokens/semantic-tokens' },
            { slug: 'editing-tokens/component-tokens' },
          ],
        },
        {
          label: 'Features',
          collapsed: true,
          items: [
            { slug: 'features/preview-panel' },
            { slug: 'features/fonts' },
            { slug: 'features/ai-workflow' },
          ],
        },
        {
          label: 'Output',
          collapsed: true,
          items: [
            { slug: 'output/publishing' },
          ],
        },
        {
          label: 'Integrations',
          collapsed: true,
          items: [
            { slug: 'tailwind/preset' },
            { slug: 'tailwind/faq' },
            { slug: 'reference/figma-plugin' },
          ],
        },
        {
          label: 'Reference',
          collapsed: true,
          items: [
            { slug: 'reference/beta-testing' },
            { slug: 'reference/tips-and-troubleshooting' },
          ],
        },
      ],
    }),
  ],
});
