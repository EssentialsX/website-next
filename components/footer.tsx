'use client';

import { showBetaBanner } from '@/components/BetaBanner';
import StatBadge from '@/components/stat-badge';
import { useSharedData } from '@/contexts/shared-data';
import {
  Anchor,
  Center,
  Container,
  SegmentedControl,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

const THEME_STORAGE_KEY = 'theme-mode';

const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ?
      'dark'
    : 'light';
};

const applyTheme = (
  mode: ThemeMode,
  setColorScheme: (scheme: 'light' | 'dark') => void,
) => {
  if (mode === 'auto') {
    setColorScheme(getSystemTheme());
  } else {
    setColorScheme(mode);
  }
};

const themeControlData = [
  {
    value: 'light' as const,
    label: (
      <Center style={{ gap: 8 }}>
        <IconSun size={16} />
        <span>Light</span>
      </Center>
    ),
  },
  {
    value: 'dark' as const,
    label: (
      <Center style={{ gap: 8 }}>
        <IconMoon size={16} />
        <span>Dark</span>
      </Center>
    ),
  },
  {
    value: 'auto' as const,
    label: (
      <Center style={{ gap: 8 }}>
        <IconDeviceDesktop size={16} />
        <span>Auto</span>
      </Center>
    ),
  },
];

export default function Footer() {
  const { setColorScheme } = useMantineColorScheme();
  const { downloads, discord, github, stableBuild, devBuild } = useSharedData();
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');

  const year = useMemo(() => new Date().getFullYear(), []);

  const handleSystemThemeChange = useCallback(
    (e: MediaQueryListEvent) => {
      setThemeMode(currentMode => {
        if (currentMode === 'auto') {
          setColorScheme(e.matches ? 'dark' : 'light');
        }
        return currentMode;
      });
    },
    [setColorScheme],
  );

  useEffect(() => {
    const savedThemeMode = localStorage.getItem(
      THEME_STORAGE_KEY,
    ) as ThemeMode | null;
    const initialThemeMode = savedThemeMode || 'auto';
    setThemeMode(initialThemeMode);
    applyTheme(initialThemeMode, setColorScheme);
  }, [setColorScheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [handleSystemThemeChange]);

  const handleThemeChange = (value: string) => {
    const newThemeMode = value as ThemeMode;
    setThemeMode(newThemeMode);
    localStorage.setItem(THEME_STORAGE_KEY, newThemeMode);
    applyTheme(newThemeMode, setColorScheme);
  };

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
          <div className='flex flex-col items-center gap-2 sm:items-start'>
            <Text
              size='sm'
              c='dimmed'
              className='self-center text-center sm:text-left'
            >
              Website copyright © 2019-{year} EssentialsX Team, 2015-{year}{' '}
              EssentialsX wiki contributors except where otherwise noted.
            </Text>
            <Anchor
              size='sm'
              onClick={() => showBetaBanner()}
              className='cursor-pointer self-center sm:self-start'
              c='dimmed'
            >
              ✨ Beta Site
            </Anchor>
          </div>
          <SegmentedControl
            value={themeMode}
            onChange={handleThemeChange}
            size='sm'
            aria-label='Color scheme selector'
            className='flex-shrink-0 self-center'
            data={themeControlData}
          />
        </div>
      </Container>
    </footer>
  );
}
