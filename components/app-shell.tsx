'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { PropsWithChildren } from 'react';

export default function CustomAppShell({ children }: PropsWithChildren) {
  const pinned = useHeadroom({ fixedAt: 80 });

  return (
    <AppShell header={{ height: 80, collapsed: !pinned }}>
      <AppShellHeader withBorder={false}>
        <Header />
      </AppShellHeader>
      <AppShellMain>
        {children}
        <Footer />
      </AppShellMain>
    </AppShell>
  );
}
