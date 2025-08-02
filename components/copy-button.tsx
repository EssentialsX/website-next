import {
  ActionIcon,
  CopyButton as MantineCopyButton,
  Tooltip,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  value: string;
  size: number;
}

export function CopyButton({ value, size, children }: Props) {
  return (
    <MantineCopyButton value={value}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied!' : 'Copy to clipboard'} withArrow>
          <ActionIcon
            variant='transparent'
            color={copied ? 'green' : '#228be6'}
            onClick={copy}
            title='Copy to clipboard'
          >
            {copied ?
              <IconCheck size={size} />
            : children}
          </ActionIcon>
        </Tooltip>
      )}
    </MantineCopyButton>
  );
}
