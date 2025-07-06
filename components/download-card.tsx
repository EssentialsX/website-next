import { Module } from '@/lib/modules-data';
import { Badge, Button, Checkbox, Group } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

type CardProps = {
  module: Module;
  version: string;
  download: () => void;
  toggle: (() => void) | undefined;
  isSelecting: boolean;
};

export default function DownloadCard({
  module,
  version,
  download,
  toggle,
  isSelecting,
}: CardProps) {
  return (
    <div
      className={`flex w-full flex-col gap-4 rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out not-dark:bg-white sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:p-4 dark:bg-black ${isSelecting ? 'scale-[1.02]' : ''} `}
    >
      <div className='flex flex-1 flex-col'>
        <div className='flex flex-wrap items-center gap-2'>
          <Group gap='sm'>
            <Checkbox
              me={-4}
              c='red'
              checked={isSelecting}
              disabled={toggle === undefined}
              onChange={() => toggle!()}
              className={`transition-transform duration-300 ease-in-out ${isSelecting ? 'scale-110 rotate-6 shadow-lg' : ''} `}
            />
            <h2
              className={`text-lg font-semibold transition-colors duration-300 ease-in-out ${isSelecting ? 'not-dark:text-blue-800 dark:text-blue-400' : ''} `}
            >
              {module.name}
            </h2>
          </Group>
          {module.beta === true && (
            <Badge
              color='gray'
              variant='light'
              size='xs'
              className={`transition-all duration-300 ease-in-out ${isSelecting ? 'scale-110' : ''} `}
            >
              BETA
            </Badge>
          )}
          {module.required ?
            <Badge
              color='red'
              variant='light'
              size='xs'
              className={`transition-all duration-300 ease-in-out ${isSelecting ? 'scale-110' : ''} `}
            >
              REQUIRED
            </Badge>
          : <Badge
              color='gray'
              variant='light'
              size='xs'
              className={`transition-all duration-300 ease-in-out ${isSelecting ? 'scale-110' : ''} `}
            >
              OPTIONAL
            </Badge>
          }
        </div>
        {module.discord === true && (
          <div className='mt-2 flex items-center gap-2'>
            <Badge
              color='blue'
              variant='light'
              size='xs'
              className={`transition-all duration-300 ease-in-out ${isSelecting ? 'scale-110' : ''}`}
            >
              REQUIRES DISCORD ADDON
            </Badge>
          </div>
        )}
        <p
          className={`mt-3 text-sm leading-relaxed transition-colors duration-300 ease-in-out not-dark:text-gray-600`}
        >
          {module.description}
        </p>
        <p
          className={`mt-2 text-xs transition-colors duration-300 ease-in-out not-dark:text-gray-500`}
        >
          {version}
        </p>
      </div>
      <Button
        color='red'
        variant='filled'
        size='sm'
        className={`w-full font-semibold transition-all duration-300 ease-in-out sm:w-auto ${isSelecting ? 'scale-110 shadow-lg' : ''} `}
        onClick={() => download()}
      >
        <IconDownload className='mr-2 sm:mr-0' />
        <span className='sm:hidden'>Download</span>
      </Button>
    </div>
  );
}
