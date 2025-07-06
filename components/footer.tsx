'use client';

import StatBadge from '@/components/stat-badge';
import { useSharedData } from '@/contexts/shared-data';
import {
  ActionIcon,
  Container,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function Footer() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { downloads, discord, github, stableBuild, devBuild } = useSharedData();

  const year = new Date().getFullYear();

  return (
    <footer className='mt-2'>
      <Container size='xl' py='md' px='xl'>
        <div className='mb-4 flex flex-wrap justify-center gap-2 sm:gap-4'>
          <StatBadge
            href='https://www.spigotmc.org/resources/essentialsx.9089'
            label='Downloads'
            value={`${(downloads / 1000000).toFixed(2)}m`}
            valueColor='#ee8a18'
          />
          <StatBadge
            href='https://github.com/EssentialsX/Essentials/releases/latest'
            label='Latest Release'
            value={stableBuild?.version ?? '??'}
            valueColor='#E93B38FF'
          />
          <StatBadge
            href='https://ci.ender.zone/job/EssentialsX'
            label='Jenkins'
            value={`b${devBuild?.build ?? '??'}`}
            valueColor='#1fab52'
          />
          <StatBadge
            href='https://discord.gg/h8CnPSw'
            label='Discord'
            value={`${(discord.members / 1000).toFixed(1)}k online`}
            valueColor='#7289DA'
          />
          <StatBadge
            href='https://github.com/EssentialsX/Essentials'
            label='GitHub'
            value={`${github.stars} stars`}
            valueColor='#000'
          />
        </div>
        <div className='flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <Text size='sm' c='dimmed' className='text-center sm:text-left'>
            Website copyright © 2019-{year} EssentialsX Team, 2015-{year}{' '}
            EssentialsX wiki contributors except where otherwise noted.
          </Text>
          <ActionIcon
            suppressHydrationWarning
            onClick={() => toggleColorScheme()}
            variant='default'
            size='lg'
            aria-label='Toggle color scheme'
            className='flex-shrink-0'
          >
            {colorScheme === 'dark' ?
              <IconSun suppressHydrationWarning size='1.1rem' />
            : <IconMoon suppressHydrationWarning size='1.1rem' />}
          </ActionIcon>
        </div>
      </Container>
    </footer>
  );
}
