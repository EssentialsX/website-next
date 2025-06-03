export type WikiNavigation = Record<
  string,
  { slug?: string; href?: string; title: string }[]
>;

export const wikiNavigation: Record<
  string,
  { slug?: string; href?: string; title: string }[]
> = {
  'Getting Started': [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'installing', title: 'Installing EssentialsX' },
    { slug: 'modules', title: 'Module Breakdown' },
    { slug: 'improvements', title: 'Improvements over Essentials' },
    { slug: 'translations', title: 'Translations and Custom Messages' },
    { slug: 'faq', title: 'Frequently Asked Questions' },
  ],
  'Configuring EssentialsX': [
    { slug: 'command-cooldowns', title: 'Command Cooldowns' },
    { slug: 'color-permissions', title: 'Color Permissions' },
    { href: 'https://wiki.mc-ess.net/wiki/List', title: 'Customising /list' },
    { slug: 'discord', title: 'Discord Module Setup Guide' },
    { slug: 'discord-link', title: 'Discord Link Module Setup Guide' },
  ],
  'Using EssentialsX': [
    { href: 'https://wiki.mc-ess.net/wiki/Sign_Tutorial', title: 'Signs' },
    { slug: 'banner-meta', title: 'Banner Meta' },
  ],
  Modules: [
    { href: 'https://wiki.mc-ess.net/wiki/AntiBuild', title: 'AntiBuild' },
    { slug: 'modules#essentialsx-chat', title: 'Chat' },
    { slug: 'modules#essentialsx-discord', title: 'Discord' },
    { slug: 'modules#essentialsx-discord-link', title: 'Discord Link' },
    { slug: 'geo-ip', title: 'GeoIP' },
    {
      href: 'https://wiki.mc-ess.net/wiki/Configuration_file#EssentialsProtect',
      title: 'Protect',
    },
    { slug: 'modules#essentialsx-spawn', title: 'Spawn' },
    { href: 'https://wiki.mc-ess.net/wiki/XMPP', title: 'XMPP' },
  ],
  Reference: [
    { slug: 'keywords', title: 'Placeholders' },
    { slug: 'text-commands', title: 'Text Commands' },
    {
      href: 'https://github.com/EssentialsX/Essentials/releases',
      title: 'Changelogs',
    },
  ],
};
