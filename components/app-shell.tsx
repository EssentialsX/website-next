'use client';

import { BetaBanner } from '@/components/BetaBanner';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function CustomAppShell({ children }: PropsWithChildren) {
  const pinned = useHeadroom({ fixedAt: 160 });

  return (
    <AppShell header={{ height: 80, offset: false, collapsed: !pinned }}>
      <AppShellHeader withBorder={false}>
        <Header />
      </AppShellHeader>
      <AppShellMain pt={80}>
        {children}
        <BetaBanner />
        <Footer />
      </AppShellMain>
    </AppShell>
  );
}
