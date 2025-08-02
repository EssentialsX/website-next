'use client';

import WikiSidebar from '@/components/wiki-sidebar';
import { Button, Container } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import React, { useState } from 'react';

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pinned = useHeadroom({ fixedAt: 160 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='mt-8'>
      <Container size='lg'>
        {/* Mobile hamburger button */}
        <div className='mb-4 md:hidden'>
          <Button fullWidth onClick={() => setMobileMenuOpen(prev => !prev)}>
            Table of Contents
          </Button>
        </div>

        <div className='flex flex-col gap-8 md:flex-row'>
          {/* Desktop sidebar */}
          <div className='hidden flex-shrink-0 md:block'>
            <WikiSidebar />
          </div>

          {/* Mobile sidebar */}
          <div
            className={`fixed inset-0 z-50 md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
          >
            {/* Overlay */}
            <div
              className='absolute inset-0 bg-black opacity-80'
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <div
              className='absolute left-0 h-full'
              style={{
                top: pinned ? '80px' : '0px',
                height: pinned ? 'calc(100vh - 80px)' : '100vh',
              }}
            >
              <div className='h-full overflow-y-auto'>
                <WikiSidebar onLinkClick={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          </div>

          <div className='min-w-0 flex-1'>
            <div className='prose dark:prose-invert max-w-none'>{children}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
