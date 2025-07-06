import WikiSidebar from '@/components/wiki-sidebar';
import { Container } from '@mantine/core';
import React from 'react';

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mt-8'>
      <Container size='lg'>
        <div className='flex flex-col gap-8 md:flex-row'>
          <div className='flex-shrink-0'>
            <WikiSidebar />
          </div>

          <div className='min-w-0 flex-1'>
            <div className='prose dark:prose-invert max-w-none'>{children}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
