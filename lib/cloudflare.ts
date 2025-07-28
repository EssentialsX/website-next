import { CommandData, PermissionData, VersionData } from '@/lib/types';
import { getCloudflareContext } from '@opennextjs/cloudflare';

async function getR2Bucket() {
  const context = await getCloudflareContext({ async: true });
  return context.env.COMMAND_DATA_BUCKET;
}

const MODULES = [
  '',
  'AntiBuild',
  'Chat',
  'Discord',
  'Discord Link',
  'GeoIP',
  'Protect',
  'Spawn',
  'XMPP',
];

export async function getVersionData() {
  if (process.env.NODE_ENV === 'development') {
    return {
      supportedVersions: [
        '1.8.8-R0.1-SNAPSHOT',
        '1.12.2-R0.1-SNAPSHOT',
        '1.20.6-R0.1-SNAPSHOT',
        '1.21.8-R0.1-SNAPSHOT',
      ],
    } satisfies VersionData;
  }

  const bucket = await getR2Bucket();
  if (!bucket) {
    throw new Error('R2 bucket not found');
  }

  const file = await bucket.get('version-data.json');
  if (!file) {
    throw new Error('Version data file not found');
  }

  return (await file.json()) satisfies VersionData;
}

async function getData<T>(
  type: 'commands' | 'permissions',
): Promise<Record<string, T>> {
  if (process.env.NODE_ENV === 'development') {
    // In development, return local data from the data folder
    const data = {} as Record<string, T>;
    for (const mod of MODULES) {
      const fileName = `EssentialsX${mod.replace(' ', '')}-${type}.json`;
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        data[mod.length ? mod : 'Essentials'] = require(`../data/${fileName}`);
      } catch {
        // Skip modules that don't have data files
      }
    }

    return data;
  }

  const bucket = await getR2Bucket();
  if (!bucket) {
    throw new Error('R2 bucket not found');
  }

  const data = {} as Record<string, T>;

  for (const mod of MODULES) {
    const fileName = `EssentialsX${mod.replace(' ', '')}-${type}.json`;
    const file = await bucket.get(fileName);
    if (file) {
      data[mod.length ? mod : 'Essentials'] = await file.json();
    }
  }

  return data;
}

export async function getCommands() {
  return getData<CommandData>('commands');
}

export async function getPermissions() {
  return getData<PermissionData>('permissions');
}
