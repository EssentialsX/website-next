import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx', 'md'],
  redirects: async () => [
    {
      source: '/community.html',
      destination: '/community',
      permanent: true,
    },
    {
      source: '/discord.html',
      destination: '/discord',
      permanent: true,
    },
    {
      source: '/downloads.html',
      destination: '/downloads',
      permanent: true,
    },
    {
      source: '/dump.html',
      destination: '/dump',
      permanent: true,
    },
    {
      source: '/wiki',
      destination: '/wiki/introduction',
      permanent: true,
    },
    {
      source: '/wiki/Home.html',
      destination: '/wiki/introduction',
      permanent: true,
    },
    {
      source: '/wiki/BannerMeta.html',
      destination: '/wiki/banner-meta',
      permanent: true,
    },
    {
      source: '/wiki/Color-Permissions.html',
      destination: '/wiki/color-permissions',
      permanent: true,
    },
    {
      source: '/wiki/Command-Cooldowns.html',
      destination: '/wiki/command-cooldowns',
      permanent: true,
    },
    {
      source: '/wiki/Discord-Tutorial.html',
      destination: '/wiki/discord',
      permanent: true,
    },
    {
      source: '/wiki/Discord-Link.html',
      destination: '/wiki/discord-link',
      permanent: true,
    },
    {
      source: '/wiki/GeoIP.html',
      destination: '/wiki/geo-ip',
      permanent: true,
    },
    {
      source: '/wiki/Improvements.html',
      destination: '/wiki/improvements',
      permanent: true,
    },
    {
      source: '/wiki/Installing-EssentialsX.html',
      destination: '/wiki/installing',
      permanent: true,
    },
    {
      source: '/wiki/Keywords.html',
      destination: '/wiki/keywords',
      permanent: true,
    },
    {
      source: '/wiki/Locale.html',
      destination: '/wiki/translations',
      permanent: true,
    },
    {
      source: '/wiki/Module-Breakdown.html',
      destination: '/wiki/modules',
      permanent: true,
    },
    {
      source: '/wiki/Text-Commands.html',
      destination: '/wiki/text-commands',
      permanent: true,
    },
  ],
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

const withMDX = createMDX({
  options: {
    // @ts-expect-error - this is required for this to work with turbopack
    remarkPlugins: [['remark-gfm', { strict: true, throwOnError: true }]],
    // @ts-expect-error - this is required for this to work with turbopack
    rehypePlugins: [['rehype-slug', { strict: true, throwOnError: true }]],
  },
});

export default withMDX(nextConfig);

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
