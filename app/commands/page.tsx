'use client';

import CommandAliases from '@/components/command-aliases';
import CommandUsages from '@/components/command-usages';
import PageHeader from '@/components/page-header';

import core from '@/lib/EssentialsX-commands.json';
import chat from '@/lib/EssentialsXChat-commands.json';
import discord from '@/lib/EssentialsXDiscord-commands.json';
import discordlink from '@/lib/EssentialsXDiscordLink-commands.json';
import spawn from '@/lib/EssentialsXSpawn-commands.json';
import xmpp from '@/lib/EssentialsXXMPP-commands.json';
import { Command, CommandData } from '@/lib/types';
import { Badge, Button } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { Entries } from 'type-fest';

export default function Commands() {
  const [allCommands, setAllCommands] = useState<Record<string, CommandData>>(
    {},
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommands = async () => {
      try {
        const commandData = {
          Essentials: core as CommandData,
          Chat: chat as CommandData,
          Spawn: spawn as CommandData,
          Discord: discord as CommandData,
          'Discord Link': discordlink as CommandData,
          XMPP: xmpp as CommandData,
        };

        setAllCommands(commandData);
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

  if (loading) {
    return (
      <div className='flex flex-col min-h-screen'>
        <PageHeader
          title='Commands'
          description='EssentialsX commands reference.'
        />
        <div className='flex-1 container mx-auto px-4 py-8 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p>Loading commands...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <PageHeader
        title='Commands'
        description='EssentialsX commands reference.'
      />
      <div className='flex-1 container mx-auto px-4 py-8'>
        <div className='bg-background rounded-lg border shadow-sm overflow-hidden'>
          <div className='w-full'>
            <div className='grid grid-cols-5 gap-4 p-4 border-b font-semibold text-sm'>
              <div>Module</div>
              <div>Command</div>
              <div>Aliases</div>
              <div>Description</div>
              <div>Usage(s)</div>
            </div>

            <div>
              {Object.entries(allCommands).map(([mod, cmds]) =>
                (Object.entries(cmds) as Entries<Record<string, Command>>).map(
                  ([cmd, obj]: [string, Command]) => (
                    <Fragment key={cmd}>
                      <div className='border-b'>
                        <div className='grid grid-cols-5 gap-4 p-4 items-center'>
                          <div className='flex items-center'>
                            <Badge variant='secondary' className='text-xs'>
                              {mod}
                            </Badge>
                          </div>

                          <div className='flex items-center text-sm prose dark:prose-invert'>
                            <code className='px-2 py-1 rounded text-xs'>
                              /{cmd}
                            </code>
                          </div>

                          <div className='prose dark:prose-invert'>
                            {obj.aliases.length === 0 ?
                              <span className='text-sm'>None</span>
                            : obj.aliases.length === 1 ?
                              <code className='text-xs px-1 py-0.5 rounded'>
                                {obj.aliases[0]}
                              </code>
                            : <div className='gap-1'>
                                <code className='text-xs px-1 py-0.5 rounded'>
                                  {obj.aliases[0]}
                                </code>
                                <Button
                                  variant='transparent'
                                  size='sm'
                                  px={4}
                                  className='!cursor-default'
                                >
                                  <IconChevronRight className='h-4 w-4' />
                                </Button>
                                {obj.aliases.length > 1 && (
                                  <span className='text-xs text-muted-foreground'>
                                    +{obj.aliases.length - 1} more
                                  </span>
                                )}
                              </div>
                            }
                          </div>

                          <div className='text-sm flex items-center'>
                            {obj.description || 'None'}
                          </div>

                          <div className='flex items-center gap-2 prose dark:prose-invert'>
                            <code className='px-2 py-1 rounded text-xs flex-1 truncate'>
                              /{cmd}
                              {obj.usage ? obj.usage.slice(10) : ''}
                            </code>
                            {(obj.usages?.length > 0 ||
                              obj.aliases?.length > 1) && (
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

                        <AnimatePresence>
                          {openRow === cmd && (
                            <motion.div className='flex flex-row gap-0 justify-end items-center'>
                              {obj.aliases?.length > 1 && (
                                <div>
                                  <CommandAliases aliases={obj.aliases} />
                                </div>
                              )}

                              {obj.usages?.length > 0 && (
                                <div>
                                  <CommandUsages usages={obj.usages} />
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Fragment>
                  ),
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
