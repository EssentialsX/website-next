'use client';

import { Burger, Button, Container, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container bg='#2C2E33' h='100%' fluid>
      <Group justify='space-between' h='100%' px='xl'>
        <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Image
            width={196}
            height={32}
            src='/logo-navbar.png'
            alt='EssentialsX Logo'
            className='object-contain'
          />
        </Link>

        {/* Desktop Navigation */}
        <Group visibleFrom='md'>
          <Button component={Link} c='white' href='/community' variant='subtle'>
            Community
          </Button>
          <Button component={Link} c='white' href='/commands' variant='subtle'>
            Commands
          </Button>
          <Button
            component={Link}
            c='white'
            href='/permissions'
            variant='subtle'
          >
            Permissions
          </Button>
          <Button component={Link} c='white' href='/wiki' variant='subtle'>
            Wiki
          </Button>
          <Button component={Link} c='white' href='/downloads'>
            Downloads
          </Button>
        </Group>

        {/* Mobile Navigation */}
        <Burger
          opened={opened}
          onClick={open}
          hiddenFrom='md'
          color='white'
          size='sm'
        />

        <Drawer
          opened={opened}
          onClose={close}
          position='right'
          size='xs'
          withCloseButton={false}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
          <Stack gap='md' p='md'>
            <Button
              component={Link}
              href='/'
              variant={path === '/' ? 'filled' : 'subtle'}
              fullWidth
              onClick={close}
            >
              Home
            </Button>
            <Button
              component={Link}
              href='/community'
              variant={path === '/community' ? 'filled' : 'subtle'}
              fullWidth
              onClick={close}
            >
              Community
            </Button>
            <Button
              component={Link}
              href='/wiki'
              variant={path.startsWith('/wiki') ? 'filled' : 'subtle'}
              fullWidth
              onClick={close}
            >
              Wiki
            </Button>
            <Button
              component={Link}
              href='/commands'
              variant={path.startsWith('/commands') ? 'filled' : 'subtle'}
              fullWidth
              onClick={close}
            >
              Commands
            </Button>
            <Button
              component={Link}
              href='/permissions'
              variant={path.startsWith('/permissions') ? 'filled' : 'subtle'}
              fullWidth
              onClick={close}
            >
              Permissions
            </Button>
            <Button
              component={Link}
              href='/downloads'
              variant={path.startsWith('/downloads') ? 'filled' : 'subtle'}
              fullWidth
              onClick={close}
            >
              Downloads
            </Button>
          </Stack>
        </Drawer>
      </Group>
    </Container>
  );
}
