import { List, ListItem, Text } from '@mantine/core';

export default function DownloadInfo() {
  return (
    <div className='md:w-72 not-dark:bg-blue-50 border-blue-500 p-4 border-l-4'>
      <Text>
        EssentialsX officially supports the Spigot and <b>Paper</b>{' '}
        (recommended) server software running the following Minecraft versions:
      </Text>
      <List spacing='xs' size='sm' mt='sm'>
        <ListItem>
          <Text fw={700}>✅ 1.21.4 and 1.20.6</Text>
          <Text>
            EssentialsX actively develops against and supports these versions.
          </Text>
        </ListItem>
        <ListItem>
          <Text fw={700}>
            ⚠️ 1.8.8, 1.9.4, 1.10.2, 1.11.2, 1.12.2, 1.13.2, 1.14.4, 1.15.2,
            1.16.5, 1.17.1, 1.18.2, and 1.19.4
          </Text>
          <Text>
            These versions are still supported, but are not a priority for us,
            and may be dropped in a future release.
          </Text>
        </ListItem>
      </List>
    </div>
  );
}
