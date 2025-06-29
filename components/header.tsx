'use client';

import { Burger, Button, Container, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
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
        <Group visibleFrom='sm'>
          <Button component={Link} c='white' href='/community' variant='subtle'>
            Community
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
          hiddenFrom='sm'
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
              href='/community'
              variant='subtle'
              fullWidth
              onClick={close}
            >
              Community
            </Button>
            <Button
              component={Link}
              href='/wiki'
              variant='subtle'
              fullWidth
              onClick={close}
            >
              Wiki
            </Button>
            <Button
              component={Link}
              href='/downloads'
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
