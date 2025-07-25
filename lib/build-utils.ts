const moduleRegex = /EssentialsX([A-Za-z]+)/;
const versionRegex =
  /EssentialsX[a-zA-Z]*-([0-9.]+?(?:-(?:dev|rc|beta|alpha)\+[0-9]+)?(?:-([0-9a-fA-F]+?))?)\.jar/;

export function getVersionFromArtifact(name: string): string | undefined {
  const match = versionRegex.exec(name);
  return match ? match[1] : undefined;
}

export type ModuleType =
  | 'core'
  | 'chat'
  | 'spawn'
  | 'protect'
  | 'discord'
  | 'discordlink'
  | 'geoip'
  | 'antibuild'
  | 'xmpp';

export const moduleNames: Record<ModuleType, string> = {
  core: 'EssentialsX',
  chat: 'EssentialsXChat',
  spawn: 'EssentialsXSpawn',
  protect: 'EssentialsXProtect',
  discord: 'EssentialsXDiscord',
  discordlink: 'EssentialsXDiscordLink',
  geoip: 'EssentialsXGeoIP',
  antibuild: 'EssentialsXAntiBuild',
  xmpp: 'EssentialsXXMPP',
};

export function getModuleIdFromArtifact(name: string): ModuleType {
  const match = moduleRegex.exec(name);
  return match ? (match[1].toLowerCase() as ModuleType) : 'core';
}

export function getCommitIdFromArtifact(name: string): string | undefined {
  const match = versionRegex.exec(name);
  return match && match[2] ? match[2] : undefined;
}

export function extractBuildNumber(version: string): number | null {
  const match = version.match(/-dev\+(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

export function extractBaseVersion(version: string): string {
  const match = version.match(/^([0-9.]+)/);
  return match ? match[1] : version;
}

export function isDevBuild(version: string): boolean {
  return version.includes('-dev+');
}
