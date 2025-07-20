import DumpCard from '@/components/dump/dump-card';
import DumpFileCard from '@/components/dump/dump-file-card';
import DumpPluginsCard from '@/components/dump/dump-plugins-card';
import { DumpData, DumpPaste } from '@/lib/dump-utils';
import { Card, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { useMemo } from 'react';

export default function Dump({
  id,
  dump,
  sourceType = 'bytebin',
}: {
  id: string;
  dump: DumpPaste;
  sourceType?: 'bytebin' | 'gist';
}) {
  const files = useMemo(() => dump.files, [dump.files]);

  const essRawData = useMemo(
    () => files.find(f => f.name === 'dump.json')?.content?.value,
    [files],
  );
  const essData = useMemo(
    () => (essRawData ? (JSON.parse(essRawData) as DumpData) : null),
    [essRawData],
  );

  const configData = useMemo(
    () => files.find(f => f.name === 'config.yml')?.content?.value,
    [files],
  );
  const kitsData = useMemo(
    () => files.find(f => f.name === 'kits.yml')?.content?.value,
    [files],
  );
  const discordData = useMemo(
    () => files.find(f => f.name === 'discord-config.yml')?.content?.value,
    [files],
  );
  const discordLinkData = files.find(f => f.name === 'discord-link-config.yml')
    ?.content?.value;
  const logData = useMemo(
    () => files.find(f => f.name === 'latest.log')?.content?.value,
    [files],
  );
  const worthData = useMemo(
    () => files.find(f => f.name === 'worth.yml')?.content?.value,
    [files],
  );
  const spawnData = useMemo(
    () => files.find(f => f.name === 'spawn.yml')?.content?.value,
    [files],
  );
  const commandsData = useMemo(
    () => files.find(f => f.name === 'commands.yml')?.content?.value,
    [files],
  );
  const commandMapData = useMemo(
    () => files.find(f => f.name === 'commandmap.json')?.content?.value,
    [files],
  );
  const commandOverrideData = useMemo(
    () => files.find(f => f.name === 'commandoverride.json')?.content?.value,
    [files],
  );
  const tprData = useMemo(
    () => files.find(f => f.name === 'tpr.yml')?.content?.value,
    [files],
  );

  if (!essData) {
    return <div />;
  }

  return (
    <div>
      <Stack gap={10} p={20}>
        <DumpCard
          title='Essentials Version'
          color='#d9534f'
          data={[
            { label: 'Version', value: essData['ess-data'].version },
            {
              label: 'Branch',
              value: essData['ess-data']['update-data'].branch,
            },
            {
              label: 'Economy Layer',
              value:
                essData['ess-data']['economy-layer'].enabled ?
                  essData['ess-data']['economy-layer'].name === 'null' ?
                    'None'
                  : essData['ess-data']['economy-layer'].name
                : 'Disabled',
            },
            {
              label: 'Layer Backend',
              value:
                (
                  essData['ess-data']['economy-layer']['backend-name'] ===
                  'null'
                ) ?
                  'N/A'
                : essData['ess-data']['economy-layer']['backend-name'],
            },
          ]}
        />

        <DumpCard
          title='Server Version'
          color='#5cb85c'
          data={[
            { label: 'Brand', value: essData['server-data']['server-brand'] },
            {
              label: 'Server Version',
              value: essData['server-data']['server-version'],
            },
            {
              label: 'Bukkit Version',
              value: essData['server-data']['bukkit-version'],
            },
            {
              label: 'Online Mode',
              value: essData['server-data']['online-mode'] || 'Not Provided',
            },
            {
              label: 'Support Status',
              value:
                essData['server-data']['support-status'].status +
                ' (' +
                (essData['server-data']['support-status'].supported ?
                  'Supported'
                : 'Unsupported') +
                ')',
            },
            {
              label: 'Support Trigger',
              value: essData['server-data']['support-status'].trigger ?? 'N/A',
            },
          ]}
        />

        <DumpCard
          title='Environment'
          color='#5bc0de'
          data={[
            {
              label: 'Java Version',
              value: essData.environment['java-version'],
            },
            {
              label: 'Operating System',
              value: essData.environment['operating-system'],
            },
            { label: 'Uptime', value: essData.environment['uptime'] },
            {
              label: 'Allocated Memory',
              value: essData.environment['allocated-memory'],
            },
          ]}
        />

        <DumpPluginsCard title='Addons' plugins={essData['ess-data'].addons} />

        <DumpPluginsCard title='Plugins' plugins={essData.plugins} />

        {configData !== undefined && (
          <DumpFileCard title='Config' content={configData} language='yml' />
        )}

        {kitsData !== undefined && (
          <DumpFileCard title='Kits' content={kitsData} language='yml' />
        )}

        {worthData !== undefined && (
          <DumpFileCard
            title='Item Worth Config'
            content={worthData}
            language='yml'
          />
        )}

        {tprData !== undefined && (
          <DumpFileCard title='TPR Config' content={tprData} language='yml' />
        )}

        {spawnData !== undefined && (
          <DumpFileCard
            title='Spawn Locations'
            content={spawnData}
            language='yml'
          />
        )}

        {commandsData !== undefined && (
          <DumpFileCard
            title='Command Aliases'
            content={commandsData}
            language='yml'
          />
        )}

        {commandMapData !== undefined && (
          <DumpFileCard
            title='Command Map'
            content={commandMapData}
            language='json'
          />
        )}

        {commandOverrideData !== undefined && (
          <DumpFileCard
            title='Command Overrides'
            content={commandOverrideData}
            language='json'
          />
        )}

        {logData !== undefined && (
          <DumpFileCard title='Latest Log' content={logData} language='log' />
        )}

        {discordData !== undefined && (
          <DumpFileCard
            title='Discord Config'
            content={discordData}
            language='yml'
          />
        )}

        {discordLinkData !== undefined && (
          <DumpFileCard
            title='Discord Link Config'
            content={discordLinkData}
            language='yml'
          />
        )}

        <Card bg='#333' c='white' mt={12} p={20}>
          <Text>
            Generated by{' '}
            {essData.meta.senderUuid ?
              <span>
                <Image
                  width={16}
                  height={16}
                  unoptimized
                  alt='Player Head'
                  className='me-1 mb-1 inline'
                  src={`https://crafthead.net/helm/${essData.meta.senderUuid}/16`}
                />
              </span>
            : null}
            <b>{essData.meta.sender}</b> at{' '}
            {new Date(essData.meta.timestamp).toLocaleString()}.{' '}
            <a
              className='underline'
              href={
                sourceType === 'gist' ?
                  `https://gist.github.com/${id}`
                : `https://pastes.dev/${id}`
              }
            >
              Click here
            </a>{' '}
            for the original {sourceType === 'gist' ? 'gist' : 'paste'}.
          </Text>
        </Card>
      </Stack>
    </div>
  );
}
