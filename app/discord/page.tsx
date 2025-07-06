'use client';

import DiscordAuthorize from '@/components/discord-authorize';
import PageHeader from '@/components/page-header';
import { Stack, Title } from '@mantine/core';

export default function Discord() {
  return (
    <div className='flex flex-col'>
      <PageHeader
        title='Authorize EssentialsX Discord Bot'
        description='Enter the client ID from the Discord Developers site into the box below to add your bot to your Discord server.'
      />

      <div className='mx-auto max-w-6xl px-4 py-8'>
        <Stack>
          <Title order={2}>
            Authorize your EssentialsX Discord Bot with Discord
          </Title>
          <p>
            Enter your Client ID, which you should have copied from step two of
            the initial setup instructions, into the box below.
          </p>
          <p>
            Once you enter your Client ID into the box below, clicking
            &quot;Authorize&quot; will redirect you to Discord&apos;s website.
            On Discord&apos;s website, you&apos;ll be able to select from any
            server you have the &quot;Manage Server&quot; permission in to add
            it in. Once you&apos;ve added the bot to a server, you can continue
            the next step in the initial setup.
          </p>

          <div className='mt-10 flex items-center justify-center'>
            <DiscordAuthorize />
          </div>
        </Stack>
      </div>
    </div>
  );
}
