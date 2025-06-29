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
      className={`
                w-full 
                shadow-lg 
                rounded-lg 
                p-4 sm:p-4 
                flex 
                flex-col sm:flex-row
                sm:items-center 
                gap-4 sm:gap-0
                sm:justify-between 
                transition-all 
                duration-300 
                ease-in-out
                dark:bg-black
                not-dark:bg-white
                ${isSelecting ? 'scale-[1.02]' : ''}
            `}
    >
      <div className='flex flex-col flex-1'>
        <div className='flex items-center gap-2 flex-wrap'>
          <Group gap='sm'>
            <Checkbox
              me={-8}
              checked={isSelecting}
              disabled={toggle === undefined}
              onChange={() => toggle!()}
              c='red'
              className={`
                                transition-transform 
                                duration-300 
                                ease-in-out
                                ${
                                  isSelecting ?
                                    'scale-110 rotate-6 shadow-lg'
                                  : ''
                                }
                            `}
            />
            <h2
              className={`
                            text-lg 
                            font-semibold 
                            transition-colors 
                            duration-300 
                            ease-in-out
                            ${isSelecting ? 'dark:text-blue-400 not-dark:text-blue-800' : ''}
                        `}
            >
              {module.name}
            </h2>
          </Group>
          {module.beta === true && (
            <Badge
              color='gray'
              variant='light'
              size='xs'
              className={`
                                    transition-all 
                                    duration-300 
                                    ease-in-out
                                    ${isSelecting ? 'scale-110' : ''}
                                `}
            >
              BETA
            </Badge>
          )}
          {module.required ?
            <Badge
              color='red'
              variant='light'
              size='xs'
              className={`
                                    transition-all 
                                    duration-300 
                                    ease-in-out
                                    ${isSelecting ? 'scale-110' : ''}
                                `}
            >
              REQUIRED
            </Badge>
          : <Badge
              color='gray'
              variant='light'
              size='xs'
              className={`
                                    transition-all 
                                    duration-300 
                                    ease-in-out
                                    ${isSelecting ? 'scale-110' : ''}
                                `}
            >
              OPTIONAL
            </Badge>
          }
        </div>
        {module.discord === true && (
          <div className='flex items-center gap-2 mt-2'>
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
          className={`
                    text-sm 
                    not-dark:text-gray-600 
                    mt-3 
                    leading-relaxed
                    transition-colors 
                    duration-300 
                    ease-in-out
                `}
        >
          {module.description}
        </p>
        <p
          className={`
                    mt-2 
                    text-xs 
                    ease-in-out
                    duration-300 
                    transition-colors 
                    not-dark:text-gray-500
                `}
        >
          {version}
        </p>
      </div>
      <Button
        color='red'
        variant='filled'
        size='sm'
        className={`
                    font-semibold 
                    transition-all 
                    duration-300 
                    ease-in-out
                    w-full sm:w-auto
                    ${isSelecting ? 'scale-110 shadow-lg' : ''}
                `}
        onClick={() => download()}
      >
        <IconDownload className='sm:mr-0 mr-2' />
        <span className='sm:hidden'>Download</span>
      </Button>
    </div>
  );
}
