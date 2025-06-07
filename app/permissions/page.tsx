'use client';

import PageHeader from '@/components/page-header';

import core from '@/lib/EssentialsX-permissions.json';
import chat from '@/lib/EssentialsXChat-permissions.json';
import discord from '@/lib/EssentialsXDiscord-permissions.json';
import discordlink from '@/lib/EssentialsXDiscordLink-permissions.json';
import spawn from '@/lib/EssentialsXSpawn-permissions.json';
import xmpp from '@/lib/EssentialsXXMPP-permissions.json';
import { Permission, PermissionData } from '@/lib/types';
import { Badge, Select, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { Entries } from 'type-fest';

export default function Permissions() {
  const [allPermissions, setAllPermissions] = useState<Record<string, PermissionData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const permData = {
          Essentials: core as PermissionData,
          Chat: chat as PermissionData,
          Spawn: spawn as PermissionData,
          Discord: discord as PermissionData,
          'Discord Link': discordlink as PermissionData,
          XMPP: xmpp as PermissionData,
        };
        setAllPermissions(permData);
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

  if (loading) {
    return (
      <div className='flex flex-col min-h-screen'>
        <PageHeader title='Permissions' description='EssentialsX permissions reference.' />
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
                onChange={value => setModuleFilter(value === 'All' ? null : value)}
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
                moduleFilter && moduleFilter !== mod
                  ? null
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
                      .map(([perm, obj]) => (
                        <Fragment key={perm}>
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
                              <div className='flex items-center text-sm prose dark:prose-invert'>
                                <code className='px-2 py-1 rounded text-xs'>{perm}</code>
                              </div>
                              <div className='text-sm'>{obj.description || 'None'}</div>
                              <div className='text-sm'>{String(obj.default)}</div>
                            </div>
                            {Object.entries(obj.children || {}).map(([child, val]) => (
                              <div
                                key={child}
                                className='grid grid-cols-4 gap-4 p-4 pl-8 border-t border-gray-200 dark:border-gray-700 text-sm'
                              >
                                <div></div>
                                <div className='flex items-center'>
                                  <code className='px-2 py-1 rounded text-xs'>{child}</code>
                                </div>
                                <div className='text-sm'>
                                  {val ? 'Inherits parent permission' : 'Inherits inverse of parent permission'}
                                </div>
                                <div className='text-sm'>{String(val)}</div>
                              </div>
                            ))}
                          </div>
                        </Fragment>
                      )),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


