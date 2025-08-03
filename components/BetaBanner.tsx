'use client';

import { Anchor, Button, CloseButton, Group, Paper, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

const BETA_BANNER_DISMISSED_KEY = 'betaBannerDismissed';

export const showBetaBanner = () => {
  window.dispatchEvent(new CustomEvent('showBetaBanner'));
};

export function BetaBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem(BETA_BANNER_DISMISSED_KEY);
    if (!isDismissed) {
      setIsVisible(true);
    }

    // Listen for custom event to show banner
    const handleShowBanner = () => {
      localStorage.removeItem(BETA_BANNER_DISMISSED_KEY);
      setIsVisible(true);
    };

    window.addEventListener('showBetaBanner', handleShowBanner);
    return () => window.removeEventListener('showBetaBanner', handleShowBanner);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(BETA_BANNER_DISMISSED_KEY, 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Paper
      withBorder
      p='lg'
      radius='md'
      shadow='xl'
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        maxWidth: '350px',
        zIndex: 1000,
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <Group justify='space-between' mb='xs'>
        <Text fz='md' fw={500}>
          Beta Site
        </Text>
        <CloseButton mr={-9} mt={-9} onClick={handleDismiss} />
      </Group>
      <Text c='dimmed' fz='xs'>
        ✨ You&apos;re testing out the new EssentialsX website! If you spot any
        bugs or have any feedback, let us know on{' '}
        <Anchor
          fz='xs'
          href='https://github.com/EssentialsX/website-next/issues'
          target='_blank'
          rel='noopener noreferrer'
          c='blue'
        >
          GitHub
        </Anchor>{' '}
        or on{' '}
        <Anchor
          fz='xs'
          href='https://discord.gg/h8CnPSw'
          target='_blank'
          rel='noopener noreferrer'
          c='blue'
        >
          Discord
        </Anchor>
        !
      </Text>
      <Group justify='flex-end' mt='md'>
        <Button variant='outline' size='xs' onClick={handleDismiss}>
          Got it
        </Button>
      </Group>
    </Paper>
  );
}
