'use client';

import { fetchPermissions } from '@/app/actions';
import PageHeader from '@/components/page-header';

import PermissionSets from '@/components/permission-sets';
import { Permission, PermissionData } from '@/lib/types';
import { Badge, Button, Select, TextInput } from '@mantine/core';
import { IconChevronDown, IconHash, IconSearch } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { Entries } from 'type-fest';

export default function Permissions() {
  const [allPermissions, setAllPermissions] = useState<
    Record<string, PermissionData>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setAllPermissions(await fetchPermissions());
      } catch (error) {
        console.error('Failed to load permissions:', error);
        setAllPermissions({});
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string | null>(null);
  const [openRow, setOpenRow] = useState<string>('');
  const toggleRow = (perm: string) => {
    setOpenRow(prev => (prev === perm ? '' : perm));
  };

  // Scroll to anchor once permissions are loaded
  useEffect(() => {
    if (!loading && typeof window !== 'undefined') {
      const id = window.location.hash.slice(1);
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 80;
          const y =
            el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
  }, [loading]);

  const formatDefault = (value: 'op' | 'noop' | boolean) => {
    switch (value) {
      case 'op':
        return 'Operators';
      case 'noop':
        return 'Everyone but Operators';
      case true:
        return 'Everyone';
      case false:
        return 'Nobody';
      default:
        return String(value);
    }
  };

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col'>
        <PageHeader
          title='Permissions'
          description='EssentialsX permissions reference.'
        />
        <div className='container mx-auto flex flex-1 items-center justify-center px-4 py-8'>
          <div className='text-center'>
            <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
            <p>Loading permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  const permsCount = Object.values(allPermissions).reduce(
    (count, perms) => count + Object.keys(perms).length,
    0,
  );

  return (
    <div className='flex min-h-screen flex-col'>
      <PageHeader
        title='Permissions'
        description={`EssentialsX permissions reference for ${permsCount} permissions.`}
      />
      <div className='container mx-auto flex-1 px-4 py-8'>
        <div className='bg-background overflow-hidden rounded-lg border border-gray-300 shadow-sm dark:border-gray-700'>
          <div className='w-full'>
            <div className='flex flex-col gap-4 border-b border-gray-300 p-4 sm:flex-row dark:border-gray-700'>
              <TextInput
                placeholder='Search permissions'
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
                className='flex-1'
              />
              <Select
                placeholder='Filter module'
                data={['All', ...Object.keys(allPermissions)]}
                value={moduleFilter || 'All'}
                onChange={value =>
                  setModuleFilter(value === 'All' ? null : value)
                }
                className='sm:min-w-40'
              />
            </div>
            {/* Desktop table header - hidden on mobile */}
            <div className='hidden grid-cols-4 gap-4 border-b border-gray-300 p-4 text-sm font-semibold lg:grid dark:border-gray-700'>
              <div>Module</div>
              <div>Permission</div>
              <div>Description</div>
              <div>Default</div>
            </div>
            <div>
              {Object.entries(allPermissions).map(([mod, perms]) =>
                moduleFilter && moduleFilter !== mod ?
                  null
                : (Object.entries(perms) as Entries<Record<string, Permission>>)
                    .filter(([perm, obj]) => {
                      const needle = search.toLowerCase();
                      return (
                        perm.toLowerCase().includes(needle) ||
                        obj.description.toLowerCase().includes(needle) ||
                        Object.keys(obj.children || {}).some(c =>
                          c.toLowerCase().includes(needle),
                        )
                      );
                    })
                    .map(([perm, obj]) => {
                      const children = Object.entries(obj.children || {});
                      const hasChildren = children.length > 0;
                      const rowKey = `${mod}:${perm}`;
                      return (
                        <Fragment key={rowKey}>
                          <div
                            className='border-b border-gray-200 dark:border-gray-700'
                            id={perm}
                            style={{ scrollMarginTop: '80px' }}
                          >
                            {/* Desktop table row - hidden on mobile */}
                            <div className='hidden grid-cols-4 items-center gap-4 p-4 lg:grid'>
                              <div className='flex items-center'>
                                <Badge variant='secondary' className='text-xs'>
                                  {mod}
                                </Badge>
                              </div>
                              <div className='prose dark:prose-invert'>
                                <a
                                  href={`#${perm}`}
                                  className='flex items-center gap-1'
                                >
                                  <code className='rounded px-2 py-1 text-xs'>
                                    {perm}
                                  </code>
                                  <IconHash size={14} />
                                </a>
                                {hasChildren && (
                                  <Badge
                                    variant='secondary'
                                    className='mt-1 text-xs whitespace-nowrap'
                                  >
                                    Permission Group
                                  </Badge>
                                )}
                              </div>
                              <div className='text-sm'>
                                {obj.description || 'None'}
                              </div>
                              <div className='flex items-center gap-2 text-sm'>
                                <span>{formatDefault(obj.default)}</span>
                                {hasChildren && (
                                  <Button
                                    variant='subtle'
                                    size='xs'
                                    px={4}
                                    className='flex-shrink-0 transition-all duration-200 hover:scale-105'
                                    onClick={() => toggleRow(rowKey)}
                                  >
                                    <motion.div
                                      animate={{
                                        rotate: openRow === rowKey ? 180 : 0,
                                      }}
                                      transition={{
                                        duration: 0.2,
                                        ease: 'easeInOut',
                                      }}
                                    >
                                      <IconChevronDown className='h-4 w-4' />
                                    </motion.div>
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* Mobile card layout - hidden on desktop */}
                            <div className='space-y-3 p-4 lg:hidden'>
                              <div className='flex items-center justify-between'>
                                <Badge variant='secondary' className='text-xs'>
                                  {mod}
                                </Badge>
                                <Badge
                                  className='text-sm font-medium'
                                  color='gray'
                                >
                                  Default: {formatDefault(obj.default)}
                                </Badge>
                              </div>

                              <div className='prose dark:prose-invert'>
                                <a
                                  href={`#${perm}`}
                                  className='flex items-center gap-1'
                                >
                                  <code className='rounded px-2 py-1 font-mono text-sm'>
                                    {perm}
                                  </code>
                                  <IconHash size={14} />
                                </a>
                              </div>

                              <div className='text-sm text-gray-600 dark:text-gray-400'>
                                {obj.description || 'None'}
                              </div>

                              {hasChildren && (
                                <div className='flex justify-between'>
                                  <Badge
                                    variant='secondary'
                                    className='mt-2 text-xs whitespace-nowrap'
                                  >
                                    Permission Group
                                  </Badge>
                                  <div className='flex justify-end'>
                                    <Button
                                      variant='subtle'
                                      size='xs'
                                      px={4}
                                      className='flex-shrink-0 transition-all duration-200 hover:scale-105'
                                      onClick={() => toggleRow(rowKey)}
                                    >
                                      <span className='mr-1 text-xs'>
                                        {openRow === rowKey ? 'Hide' : 'Show'}{' '}
                                        children
                                      </span>
                                      <motion.div
                                        animate={{
                                          rotate: openRow === rowKey ? 180 : 0,
                                        }}
                                        transition={{
                                          duration: 0.2,
                                          ease: 'easeInOut',
                                        }}
                                      >
                                        <IconChevronDown className='h-4 w-4' />
                                      </motion.div>
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>

                            <AnimatePresence>
                              {hasChildren && openRow === rowKey && (
                                <PermissionSets
                                  permissions={children.map(([child]) => child)}
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </Fragment>
                      );
                    }),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
