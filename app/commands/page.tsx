'use client';

import { fetchCommands } from '@/app/actions';
import CommandAliases from '@/components/command-aliases';
import CommandUsages from '@/components/command-usages';
import PageHeader from '@/components/page-header';

import { Command, CommandData } from '@/lib/types';
import { Badge, Button, Select, TextInput } from '@mantine/core';
import {
  IconChevronDown,
  IconChevronRight,
  IconHash,
  IconSearch,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { Entries } from 'type-fest';

function sortAliases(command: string, aliases: string[]): string[] {
  const set = new Set([...aliases, command]);
  return [...aliases].sort((a, b) => {
    const aIsE = a.startsWith('e') && set.has(a.slice(1));
    const bIsE = b.startsWith('e') && set.has(b.slice(1));
    if (aIsE !== bIsE) return aIsE ? 1 : -1;
    if (a.length !== b.length) return a.length - b.length;
    return a.localeCompare(b);
  });
}

export default function Commands() {
  const [allCommands, setAllCommands] = useState<Record<string, CommandData>>(
    {},
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommands = async () => {
      try {
        setAllCommands(await fetchCommands());
      } catch (error) {
        console.error('Failed to load commands:', error);
        setAllCommands({});
      } finally {
        setLoading(false);
      }
    };

    loadCommands();
  }, []);

  const [openRow, setOpenRow] = useState<string>('');
  const toggleRow = (cmd: string) => {
    setOpenRow(prev => (prev === cmd ? '' : cmd));
  };

  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string | null>(null);

  // Scroll to anchor once commands are loaded
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

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col'>
        <PageHeader
          title='Commands'
          description='EssentialsX commands reference.'
        />
        <div className='container mx-auto flex flex-1 items-center justify-center px-4 py-8'>
          <div className='text-center'>
            <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
            <p>Loading commands...</p>
          </div>
        </div>
      </div>
    );
  }

  const commandsCount = Object.values(allCommands).reduce(
    (count, cmds) => count + Object.keys(cmds).length,
    0,
  );

  return (
    <div className='flex min-h-screen flex-col'>
      <PageHeader
        title='Commands'
        description={`EssentialsX commands reference for ${commandsCount} commands.`}
      />
      <div className='container mx-auto flex-1 px-4 py-8'>
        <div className='bg-background overflow-hidden rounded-lg border border-gray-300 shadow-sm dark:border-gray-700'>
          <div className='w-full'>
            <div className='flex flex-col gap-4 border-b border-gray-300 p-4 sm:flex-row dark:border-gray-700'>
              <TextInput
                placeholder='Search commands'
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
                className='flex-1'
              />
              <Select
                placeholder='Filter module'
                data={['All', ...Object.keys(allCommands)]}
                value={moduleFilter || 'All'}
                onChange={value =>
                  setModuleFilter(value === 'All' ? null : value)
                }
                className='sm:min-w-40'
              />
            </div>
            {/* Desktop table header - hidden on mobile */}
            <div className='hidden grid-cols-5 gap-4 border-b border-gray-300 p-4 text-sm font-semibold lg:grid dark:border-gray-700'>
              <div>Module</div>
              <div>Command</div>
              <div>Aliases</div>
              <div>Description</div>
              <div>Usage(s)</div>
            </div>

            <div>
              {Object.entries(allCommands).map(([mod, cmds]) =>
                moduleFilter && moduleFilter !== mod ?
                  null
                : (Object.entries(cmds) as Entries<Record<string, Command>>)
                    .filter(
                      ([command, obj]) =>
                        command.toLowerCase().includes(search.toLowerCase()) ||
                        obj.aliases.some(a =>
                          a.toLowerCase().includes(search.toLowerCase()),
                        ),
                    )
                    .map(([cmd, obj]: [string, Command]) => {
                      const sortedAliases = sortAliases(cmd, obj.aliases);
                      return (
                        <Fragment key={cmd}>
                          <div
                            className='border-b border-gray-200 dark:border-gray-700'
                            id={cmd}
                            style={{ scrollMarginTop: '80px' }}
                          >
                            {/* Desktop table row - hidden on mobile */}
                            <div className='hidden grid-cols-5 items-center gap-4 p-4 lg:grid'>
                              <div className='flex items-center'>
                                <Badge variant='secondary' className='text-xs'>
                                  {mod}
                                </Badge>
                              </div>

                              <div className='prose dark:prose-invert flex items-center text-sm'>
                                <a
                                  href={`#${cmd}`}
                                  className='flex items-center gap-1'
                                >
                                  <code className='rounded px-2 py-1 text-xs'>
                                    /{cmd}
                                  </code>
                                  <IconHash size={14} />
                                </a>
                              </div>

                              <div className='prose dark:prose-invert'>
                                {sortedAliases.length === 0 ?
                                  <span className='text-sm'>None</span>
                                : sortedAliases.length === 1 ?
                                  <code className='rounded px-1 py-0.5 text-xs'>
                                    {sortedAliases[0]}
                                  </code>
                                : <div className='gap-1'>
                                    <code className='rounded px-1 py-0.5 text-xs'>
                                      {sortedAliases[0]}
                                    </code>
                                    <Button
                                      variant='transparent'
                                      size='sm'
                                      px={4}
                                      className='!cursor-default'
                                    >
                                      <IconChevronRight className='h-4 w-4' />
                                    </Button>
                                    {sortedAliases.length > 1 && (
                                      <span className='text-xs'>
                                        +{sortedAliases.length - 1} more
                                      </span>
                                    )}
                                  </div>
                                }
                              </div>

                              <div className='flex items-center text-sm'>
                                {obj.description || 'None'}
                              </div>

                              <div className='prose dark:prose-invert flex items-center gap-2'>
                                <code className='flex-1 truncate rounded px-2 py-1 text-xs'>
                                  /{cmd}
                                  {obj.usage ? obj.usage.slice(10) : ''}
                                </code>
                                {(obj.usages?.length > 0 ||
                                  sortedAliases.length > 1) && (
                                  <Button
                                    variant='subtle'
                                    size='xs'
                                    px={4}
                                    className='flex-shrink-0 transition-all duration-200 hover:scale-105'
                                    onClick={() => toggleRow(cmd)}
                                  >
                                    <motion.div
                                      animate={{
                                        rotate: openRow === cmd ? 180 : 0,
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
                                {(obj.usages?.length > 0 ||
                                  sortedAliases.length > 1) && (
                                  <Button
                                    variant='subtle'
                                    size='xs'
                                    px={4}
                                    className='flex-shrink-0 transition-all duration-200 hover:scale-105'
                                    onClick={() => toggleRow(cmd)}
                                  >
                                    <span className='mr-1 text-xs'>
                                      {openRow === cmd ? 'Hide' : 'Show'}{' '}
                                      details
                                    </span>
                                    <motion.div
                                      animate={{
                                        rotate: openRow === cmd ? 180 : 0,
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

                              <div className='prose dark:prose-invert'>
                                <a
                                  href={`#${cmd}`}
                                  className='flex items-center gap-1'
                                >
                                  <code className='rounded px-2 py-1 font-mono text-sm'>
                                    /{cmd}
                                  </code>
                                  <IconHash size={14} />
                                </a>
                              </div>

                              <div className='text-sm text-gray-600 dark:text-gray-400'>
                                {obj.description || 'None'}
                              </div>

                              {sortedAliases.length > 0 && (
                                <div className='space-y-1'>
                                  <div className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                                    Aliases:
                                  </div>
                                  <div className='flex flex-wrap gap-1'>
                                    {sortedAliases.slice(0, 3).map(alias => (
                                      <code
                                        key={alias}
                                        className='rounded px-1 py-0.5 text-xs'
                                      >
                                        {alias}
                                      </code>
                                    ))}
                                    {sortedAliases.length > 3 && (
                                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                                        +{sortedAliases.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className='space-y-1'>
                                <div className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                                  Usage:
                                </div>
                                <code className='block overflow-x-auto rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800'>
                                  /{cmd}
                                  {obj.usage ? obj.usage.slice(10) : ''}
                                </code>
                              </div>
                            </div>

                            <AnimatePresence>
                              {openRow === cmd && (
                                <motion.div className='flex w-full flex-col'>
                                  {sortedAliases.length > 1 && (
                                    <div className='w-full'>
                                      <CommandAliases aliases={sortedAliases} />
                                    </div>
                                  )}

                                  {obj.usages?.length > 0 && (
                                    <div className='w-full'>
                                      <CommandUsages
                                        commandName={cmd}
                                        usages={obj.usages}
                                      />
                                    </div>
                                  )}
                                </motion.div>
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
