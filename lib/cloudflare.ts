import { CommandData, PermissionData } from '@/lib/types';
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
  'XXMPP',
];

async function getData<T>(
  type: 'commands' | 'permissions',
): Promise<Record<string, T>> {
  const bucket = await getR2Bucket();
  if (!bucket) {
    throw new Error('R2 bucket not found');
  }

  const data = {} as Record<string, T>;

  for (const mod of MODULES) {
    const fileName = `EssentialX${mod.replace(' ', '')}-${type}.json`;
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
