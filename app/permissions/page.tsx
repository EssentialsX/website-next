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
      <div className='flex flex-col min-h-screen'>
        <PageHeader
          title='Permissions'
          description='EssentialsX permissions reference.'
        />
        <div className='flex-1 container mx-auto px-4 py-8 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
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
    <div className='flex flex-col min-h-screen'>
      <PageHeader
        title='Permissions'
        description={`EssentialsX permissions reference for ${permsCount} permissions.`}
      />
      <div className='flex-1 container mx-auto px-4 py-8'>
        <div className='bg-background rounded-lg border shadow-sm overflow-hidden'>
          <div className='w-full'>
            <div className='flex gap-4 p-4 border-b border-gray-300 dark:border-gray-700'>
              <TextInput
                placeholder='Search permissions'
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
                style={{ flex: 1 }}
              />
              <Select
                placeholder='Filter module'
                data={['All', ...Object.keys(allPermissions)]}
                value={moduleFilter || 'All'}
                onChange={value =>
                  setModuleFilter(value === 'All' ? null : value)
                }
              />
            </div>
            <div className='grid grid-cols-4 gap-4 p-4 border-b border-gray-300 dark:border-gray-700 font-semibold text-sm'>
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
                            <div className='grid grid-cols-4 gap-4 p-4 items-center'>
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
                                  <code className='px-2 py-1 rounded text-xs'>
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
