import { List, ListItem, Text } from '@mantine/core';

export default function DownloadWarnings() {
  return (
    <div className='border-l-4 border-red-500 p-4 not-dark:bg-red-100 md:w-72'>
      <Text fw={700}>EssentialsX does not support</Text>
      <List spacing='xs' size='sm' mt='sm'>
        <ListItem>
          <Text fw={700}>ℹ️ Folia is not supported yet.</Text>
          <Text>
            We are working on proper Folia support. Do not attempt to use
            current versions of EssentialsX on Folia or forks of it - you may
            lose userdata.
          </Text>
        </ListItem>
        <ListItem>
          <Text fw={700}>🛑 Do not use Mohist.</Text>
          <Text>
            Do not use Mohist. Mohist tricks users into deleting official
            EssentialsX jars and installing unofficial modified software.{' '}
            <a className='underline' href='#'>
              Click here for more information.
            </a>
          </Text>
        </ListItem>
        <ListItem>
          <Text fw={700}>🛑 Other Forge/Fabric hybrid server software</Text>
          <Text>
            including Cauldron, Thermos, CatServer etc. - the Bukkit API does
            not properly support mods, and using Bukkit plugins on modded
            Forge/Fabric servers will cause significant problems. For Forge
            servers, use{' '}
            <a
              className='underline'
              href='https://www.spongepowered.org/downloads/spongeforge'
            >
              SpongeForge
            </a>{' '}
            with{' '}
            <a className='underline' href='https://nucleuspowered.org/'>
              Nucleus
            </a>{' '}
            for plugin support and a complete Essentials replacement, or
            consider a mod designed for Forge such as{' '}
            <a
              className='underline'
              href='https://www.curseforge.com/minecraft/mc-mods/ftb-essentials'
            >
              FTB Essentials.
            </a>
          </Text>
        </ListItem>
        <ListItem>
          <Text fw={700}>🛑 1.7.10 or below</Text>
          <Text>
            You should use the original{' '}
            <a
              className='underline'
              href='https://dev.bukkit.org/projects/essentials'
            >
              Essentials.
            </a>
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            We will not be able to provide support if you use any of the
            software or versions listed above.
          </Text>
        </ListItem>
      </List>
    </div>
  );
}
