import { ModuleType } from '@/lib/build-utils';

export interface Module {
  id: ModuleType;
  name: string;
  description: string;
  recommended?: boolean;
  required?: boolean;
  discord?: boolean;
  beta?: boolean;
  legacy?: boolean;
}

export const modules: Module[] = [
  {
    id: 'core',
    name: 'EssentialsX',
    description:
      'Core functionality: teleports, private messages, homes, warps and more',
    required: true,
  },
  {
    id: 'chat',
    name: 'EssentialsX Chat',
    description: 'Provides chat formatting and management features.',
    recommended: true,
  },
  {
    id: 'spawn',
    name: 'EssentialsX Spawn',
    description: 'Handles spawn points and player spawning.',
    recommended: true,
  },
  {
    id: 'protect',
    name: 'EssentialsX Protect',
    description: 'Offers basic world protection features.',
  },
  {
    id: 'discord',
    name: 'EssentialsX Discord',
    description: 'Integrates your Minecraft server with Discord.',
  },
  {
    id: 'discordlink',
    name: 'EssentialsX Discord Link',
    description: 'Allows players to link their Minecraft and Discord accounts.',
    discord: true,
  },
  {
    id: 'geoip',
    name: 'EssentialsX GeoIP',
    description: 'Provides geolocation information for players.',
  },
  {
    id: 'antibuild',
    name: 'EssentialsX AntiBuild',
    description: 'Provides building protection and control.',
  },
  {
    id: 'xmpp',
    name: 'EssentialsX XMPP',
    description: 'Allows for XMPP/Jabber integration.',
    legacy: true,
  },
];
