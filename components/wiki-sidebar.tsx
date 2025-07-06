'use client';

import { wikiNavigation } from '@/lib/wiki-navigation';
import { Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WikiSidebar() {
  const path = usePathname();

  return (
    <aside className='w-64 min-w-64 rounded-lg bg-[#1c1e22] p-4'>
      <div>
        {Object.keys(wikiNavigation).map((category, index) => (
          <div key={index} className='mb-6'>
            <Text size='sm' fw={700} c='dimmed' mb={4}>
              {category}
            </Text>
            <div className='space-y-1'>
              {wikiNavigation[category].map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.slug ? `/wiki/${link.slug}` : link.href!}
                  className={`block rounded px-2 py-1 text-sm leading-relaxed hover:bg-[#d91c1c] ${
                    path === `/wiki/${link.slug}` ?
                      'bg-[#d91c1c] text-white'
                    : 'text-gray-300'
                  }`}
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
