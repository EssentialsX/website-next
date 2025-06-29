import { Button, Container, rem, Stack, Text, Title } from '@mantine/core';
import { IconCheck, IconTools, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section
        style={{ backgroundColor: '#D11920', minHeight: rem(400) }}
        className='flex items-center'
      >
        <Container size='xl' py={80}>
          <div className='max-w-2xl mx-auto text-center'>
            <Title order={1} size='h1' c='white' mb='md'>
              It&apos;s in the name.
            </Title>
            <Text c='white' size='lg'>
              EssentialsX is the essential plugin suite for Minecraft servers,
              with over 160 commands for servers of all size and scale.
            </Text>
          </div>
        </Container>
      </section>

      <Container size='xl'>
        <Stack gap={40} className='py-10 md:py-20'>
          <div className='grid md:grid-cols-[300px_1fr] gap-8 md:gap-16 items-center'>
            <div className='flex justify-center'>
              <IconTools
                size={120}
                className='text-gray-600 md:w-[180px] md:h-[180px]'
                stroke={1}
              />
            </div>
            <div className='text-center md:text-left'>
              <Title order={2} size='h2' mb='md'>
                All you can eat, and then some.
              </Title>
              <Text mb='md'>
                With over{' '}
                <Link href='/commands' className='link hover:underline'>
                  160 commands
                </Link>
                , EssentialsX provides one of the most comprehensive feature
                sets out there, providing teleportation, moderation tools,
                gameplay enhancements and more.
              </Text>
              <Text mb='md'>
                Just want the homes and warps? Great. Need a sign shop? Done.
                Want complex and rich kits with enchantments, custom books and
                lore? Sorted.
              </Text>
              <Text mb='xl'>
                Whether you&apos;re a small group of friends or a huge server
                with hundreds of players, we&apos;ve got the basics covered.
              </Text>
              <Button
                component={Link}
                href='/wiki/introduction'
                variant='filled'
                color='red'
                size='md'
                className='w-full md:w-auto'
              >
                Visit the wiki
              </Button>
            </div>
          </div>

          <div className='grid md:grid-cols-[300px_1fr] gap-8 md:gap-16 items-center'>
            <div className='flex justify-center'>
              <IconUsers
                size={120}
                className='text-gray-600 md:w-[180px] md:h-[180px]'
                stroke={1}
              />
            </div>
            <div className='text-center md:text-left'>
              <Title order={2} size='h2' mb='md'>
                Free, for everyone, forever.
              </Title>
              <Text mb='md'>
                Developed by the community as an open source project for over 8
                years, EssentialsX is completely free to use - as in free beer{' '}
                <em>and</em> free speech.
              </Text>
              <Text mb='md'>
                We&apos;re supported through community donations on{' '}
                <a
                  href='https://patreon.com/essentialsx'
                  className='link hover:underline'
                >
                  our Patreon page
                </a>
                . No corporate sponsors, no intrusive advertisements, no
                paywalls.
              </Text>
              <Text mb='xl'>
                Not only is EssentialsX free, but the source code is available
                for anyone to modify and improve, and we accept improvements to
                code on{' '}
                <a
                  href='https://github.com/EssentialsX/Essentials'
                  className='link hover:underline'
                >
                  GitHub
                </a>
                , and new translations on{' '}
                <a
                  href='https://crowdin.com/project/essentialsx-official'
                  className='link hover:underline'
                >
                  Crowdin
                </a>
                .
              </Text>
              <Button
                component={Link}
                href='/community'
                variant='filled'
                color='red'
                size='md'
                className='w-full md:w-auto'
              >
                Join the community
              </Button>
            </div>
          </div>

          <div className='grid md:grid-cols-[300px_1fr] gap-8 md:gap-16 items-center'>
            <div className='flex justify-center'>
              <IconCheck
                size={120}
                className='text-gray-600 md:w-[180px] md:h-[180px]'
                stroke={1}
              />
            </div>
            <div className='text-center md:text-left'>
              <Title order={2} size='h2' mb='md'>
                Compatible with just about <em>everything</em>.
              </Title>
              <Text mb='md'>
                Built for the Paper and Spigot platforms with compatibility in
                mind, EssentialsX works seamlessly alongside thousands of other
                plugins.
              </Text>
              <Text mb='md'>
                Plus, many plugins hook into EssentialsX&apos;s various features
                like economy, ignores, mutes and vanish through our API.
              </Text>
              <Text mb='xl'>
                With support for the latest rich text features, you can
                customise EssentialsX to your liking, with clickable links,
                hover text and RGB colours!
              </Text>
              <Button
                component={Link}
                href='/wiki/installing'
                variant='filled'
                color='red'
                size='md'
                className='w-full md:w-auto'
              >
                Get started with EssentialsX
              </Button>
            </div>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
