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
      source: '/do-not-use-mohist.html',
      destination: '/do-not-use-mohist',
      permanent: true,
    },
    // Ported from https://github.com/EssentialsX/Website/blob/master/plugins/wiki-redirects/index.js
    // Paths missing /wiki/ prefix and .html extension
    { source: '/Home', destination: '/wiki/introduction', permanent: true },
    {
      source: '/Installing-EssentialsX',
      destination: '/wiki/installing',
      permanent: true,
    },
    {
      source: '/Module-Breakdown',
      destination: '/wiki/modules',
      permanent: true,
    },
    {
      source: '/Improvements',
      destination: '/wiki/improvements',
      permanent: true,
    },
    { source: '/Locale', destination: '/wiki/translations', permanent: true },
    { source: '/Common-Issues', destination: '/wiki/faq', permanent: true },
    {
      source: '/Command-Cooldowns',
      destination: '/wiki/command-cooldowns',
      permanent: true,
    },
    {
      source: '/Color-Permissions',
      destination: '/wiki/color-permissions',
      permanent: true,
    },
    {
      source: '/BannerMeta',
      destination: '/wiki/banner-meta',
      permanent: true,
    },
    {
      source: '/discord-tutorial',
      destination: '/wiki/discord',
      permanent: true,
    },
    {
      source: '/Discord-Tutorial',
      destination: '/wiki/discord',
      permanent: true,
    },
    { source: '/geoip', destination: '/wiki/geo-ip', permanent: true },
    { source: '/help', destination: '/wiki/faq', permanent: true },
    // Paths missing /wiki/ prefix but with .html extension
    {
      source: '/Home.html',
      destination: '/wiki/introduction',
      permanent: true,
    },
    {
      source: '/Installing-EssentialsX.html',
      destination: '/wiki/installing',
      permanent: true,
    },
    {
      source: '/Module-Breakdown.html',
      destination: '/wiki/modules',
      permanent: true,
    },
    {
      source: '/Improvements.html',
      destination: '/wiki/improvements',
      permanent: true,
    },
    {
      source: '/Locale.html',
      destination: '/wiki/translations',
      permanent: true,
    },
    {
      source: '/Common-Issues.html',
      destination: '/wiki/faq',
      permanent: true,
    },
    {
      source: '/Command-Cooldowns.html',
      destination: '/wiki/command-cooldowns',
      permanent: true,
    },
    {
      source: '/Color-Permissions.html',
      destination: '/wiki/color-permissions',
      permanent: true,
    },
    {
      source: '/BannerMeta.html',
      destination: '/wiki/banner-meta',
      permanent: true,
    },
    {
      source: '/Discord-Tutorial.html',
      destination: '/wiki/discord',
      permanent: true,
    },
    { source: '/geoip.html', destination: '/wiki/geo-ip', permanent: true },
    { source: '/help.html', destination: '/wiki/faq', permanent: true },
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
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm', { strict: true, throwOnError: true }]],
    rehypePlugins: [['rehype-slug', { strict: true, throwOnError: true }]],
  },
});

export default withMDX(nextConfig);

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
