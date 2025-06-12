import CustomAppShell from '@/components/app-shell';
import { SharedDataProvider } from '@/contexts/shared-data';
import { theme } from '@/theme';
import '@mantine/code-highlight/styles.css';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'EssentialsX',
  description: 'The essential plugin suite for Minecraft servers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel='icon' href='/logo.svg' />
      </head>
      <body>
        <SharedDataProvider>
          <MantineProvider theme={theme}>
            <CustomAppShell>{children}</CustomAppShell>
          </MantineProvider>
        </SharedDataProvider>
      </body>
    </html>
  );
}
