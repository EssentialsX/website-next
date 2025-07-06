import { List, ListItem, Text } from '@mantine/core';

export default function DownloadInfo() {
  return (
    <div className='border-l-4 border-blue-500 p-4 not-dark:bg-blue-50 md:w-72'>
      <Text>
        EssentialsX officially supports the <b>Paper</b> server software running
        the following Minecraft versions:
      </Text>
      <List spacing='xs' size='sm' mt='sm'>
        <ListItem>
          <Text>
            <b>✅ 1.21.7</b> - EssentialsX actively develops against and
            supports these versions.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            <b>
              ⚠️ 1.8.8, 1.9.4, 1.10.2, 1.11.2, 1.12.2, 1.13.2, 1.14.4, 1.15.2,
              1.16.5, 1.17.1, 1.18.2, 1.19.4, and 1.20.6
            </b>{' '}
            - These versions are still supported, but are not a priority for us,
            and may be dropped in a future release.
          </Text>
        </ListItem>
      </List>
    </div>
  );
}
