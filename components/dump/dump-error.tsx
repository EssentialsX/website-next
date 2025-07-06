import { Text } from '@mantine/core';

export default function DumpError({ error }: { error: string }) {
  return (
    <div className='mx-20 mt-8 rounded-xl'>
      <div className='rounded-sm border-l-4 border-red-500 p-4 not-dark:bg-red-50'>
        <Text>Failed to load EssentialsX dump data!</Text>
        <Text>
          Double check you used the correct URL, and if that doesn&apos;t work,
          try generating a new dump with <b>/ess dump</b>.
        </Text>
        <Text mt='xl'>
          Error: <b>{error}</b>
        </Text>
      </div>
    </div>
  );
}
