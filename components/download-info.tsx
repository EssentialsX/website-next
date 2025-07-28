import { useSharedData } from '@/contexts/shared-data';
import { List, ListItem, Text } from '@mantine/core';
import { useMemo } from 'react';

export default function DownloadInfo() {
  const { activeVersion, legacyVersions } = useSharedData();

  const legacyVersionString = useMemo(() => {
    const formatter = new Intl.ListFormat('en', {
      style: 'long',
      type: 'conjunction',
    });

    return formatter.format(legacyVersions);
  }, [legacyVersions]);

  return (
    <div className='dark:bg-dark-600 border-l-4 border-blue-500 p-4 not-dark:bg-blue-50 md:w-72'>
      <Text>
        EssentialsX officially supports the <b>Paper</b> server software running
        the following Minecraft versions:
      </Text>
      <List spacing='xs' size='sm' mt='sm'>
        <ListItem>
          <Text>
            <b>✅ {activeVersion}</b> - EssentialsX actively develops against
            and supports these versions.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            <b>⚠️ {legacyVersionString}</b> - These versions are still
            supported, but are not a priority for us, and may be dropped in a
            future release.
          </Text>
        </ListItem>
      </List>
    </div>
  );
}
