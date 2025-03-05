import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx', 'mdx', 'md'],
    redirects: async () => ([
        {
            source: '/wiki',
            destination: '/wiki/introduction',
            permanent: true
        }
    ]),
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
        webpackBuildWorker: true,
        parallelServerBuildTraces: true,
        parallelServerCompiles: true
    }
};

const withMDX = createMDX({
    options: {
        // @ts-ignore - this is required for this to work with turbopack
        remarkPlugins: [['remark-gfm', {strict: true, throwOnError: true}]],
        // @ts-ignore - this is required for this to work with turbopack
        rehypePlugins: [['rehype-slug', {strict: true, throwOnError: true}]]
    }
});


export default withMDX(nextConfig);
