'use client';

import { wikiNavigation } from '@/lib/wiki-navigation';
import { Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface WikiSidebarProps {
  onLinkClick?: () => void;
}

export default function WikiSidebar({ onLinkClick }: WikiSidebarProps) {
  const path = usePathname();

  return (
    <aside className='dark:bg-dark-600 w-64 min-w-64 p-4 not-dark:bg-gray-200 md:block md:rounded-lg'>
      <div>
        {Object.keys(wikiNavigation).map((category, index) => (
          <div key={index} className='mb-6'>
            <Text size='sm' fw={700} mb={4}>
              {category}
            </Text>
            <div className='space-y-1'>
              {wikiNavigation[category].map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.slug ? `/wiki/${link.slug}` : link.href!}
                  className={`block rounded px-2 py-1 text-sm leading-relaxed transition-colors hover:bg-red-400 hover:text-white ${
                    path === `/wiki/${link.slug}` && 'bg-red-500 text-white'
                  }`}
                  onClick={onLinkClick}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
