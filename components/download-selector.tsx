import DownloadCard from '@/components/download-card';
import { useSharedData } from '@/contexts/shared-data';
import { moduleNames, ModuleType } from '@/lib/build-utils';
import { modules } from '@/lib/modules-data';
import {
  Button,
  Group,
  Loader,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ZIP_SMITH_WORKER = 'https://zip-smith.essentialsx.workers.dev';

export default function DownloadSelector() {
  const params = useSearchParams();
  const startBranch = params.get('branch') || 'dev';
  const [selectedModules, setSelectedModules] = useState<string[]>(['core']);
  const [buildType, setBuildType] = useState(startBranch);
  const [isDownloading, setIsDownloading] = useState(false);

  const { stableBuild, devBuild } = useSharedData();
  if (!stableBuild || !devBuild) {
    return (
      <div className='flex justify-center mt-12'>
        <Loader type='bars' />
      </div>
    );
  }

  const version =
    buildType === 'stable' ? stableBuild.version : devBuild.version;

  const stableChanges = 'https://github.com/EssentialsX/Essentials/releases';
  const devChanges = 'https://github.com/EssentialsX/Essentials/commits/2.x';

  const downloadSelected = async () => {
    if (selectedModules.length <= 1) return;

    setIsDownloading(true);

    try {
      const currentBuild = buildType === 'stable' ? stableBuild : devBuild;

      const files = selectedModules.map(moduleId => {
        const url = currentBuild.downloads[moduleId as ModuleType];
        const filename = `${moduleNames[moduleId as ModuleType]}-${version}`;
        return { url, filename };
      });

      const requestPayload = {
        files,
        zipFilename: `EssentialsX-${buildType}-${version}.zip`,
      };

      const response = await fetch(ZIP_SMITH_WORKER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(
          `Failed to create zip: ${response.status} ${response.statusText}`,
        );
      }

      const zipBlob = await response.blob();

      const downloadUrl = URL.createObjectURL(zipBlob);
      const element = document.createElement('a');
      element.setAttribute('href', downloadUrl);
      element.setAttribute(
        'download',
        `EssentialsX-${buildType}-${version}.zip`,
      );
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading selected files:', error);
      alert('Failed to download selected files. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadSingle = (module: ModuleType) => {
    const link =
      buildType === 'stable' ?
        stableBuild.downloads[module]
      : devBuild.downloads[module];

    const element = document.createElement('a');
    element.setAttribute('href', link);
    element.setAttribute('download', `${moduleNames[module]}-${version}.jar`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // const selectAllModules = () => {
  //   setSelectedModules(modules.map(module => module.id));
  // };

  const deselectAllModules = () => {
    setSelectedModules(['core']); // Keep core module selected
  };

  const displayVersion =
    buildType === 'stable' ?
      <b>{version}</b>
    : <span>
        <b>{version}</b> (build {devBuild.build}, commit{' '}
        <a
          href={`https://github.com/EssentialsX/Essentials/commit/${devBuild.commit}`}
          className='link'
        >
          {devBuild.commit?.slice(0, 7)}
        </a>
        )
      </span>;

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId) ?
        prev.filter(id => id !== moduleId)
      : [...prev, moduleId],
    );
  };

  return (
    <>
      <SegmentedControl
        value={buildType}
        onChange={setBuildType}
        data={[
          { value: 'stable', label: 'Stable Release' },
          {
            value: 'dev',
            label: 'Development Build',
          },
        ]}
      />

      <Text size='sm'>
        The latest <b>{buildType}</b> version of EssentialsX is {displayVersion}
        . You can view the changelog{' '}
        <a
          className='link'
          href={buildType === 'stable' ? stableChanges : devChanges}
        >
          here
        </a>
        .
      </Text>

      <div className='mb-6 mt-4'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0'>
          <Title order={2}>Core</Title>

          <div className='flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:gap-0 w-full sm:w-[500px]'>
            {/*<Button onClick={selectAllModules}>Select All</Button>*/}
            <Button
              onClick={deselectAllModules}
              disabled={selectedModules.length <= 1}
              fullWidth
              className='sm:w-auto'
            >
              Deselect All
            </Button>
            <Button
              onClick={downloadSelected}
              disabled={selectedModules.length <= 1 || isDownloading}
              loading={isDownloading}
              fullWidth
              className='sm:w-auto'
            >
              Download Selected ({selectedModules.length})
            </Button>
          </div>
        </div>
      </div>

      <DownloadCard
        module={modules.find(mod => mod.id === 'core')!}
        download={() => downloadSingle('core')}
        toggle={undefined}
        isSelecting={true}
        version={version}
      />

      <Title order={2} mt='xl'>
        Recommended add-ons
      </Title>
      <div className='block sm:hidden'>
        <Stack>
          {modules
            .filter(m => m.recommended)
            .map(module => (
              <DownloadCard
                key={module.id}
                module={module}
                download={() => downloadSingle(module.id as ModuleType)}
                toggle={() => toggleModule(module.id)}
                isSelecting={selectedModules.includes(module.id)}
                version={version}
              />
            ))}
        </Stack>
      </div>
      <div className='hidden sm:block'>
        <Group grow style={{ alignItems: 'stretch' }}>
          {modules
            .filter(m => m.recommended)
            .map(module => (
              <DownloadCard
                key={module.id}
                module={module}
                download={() => downloadSingle(module.id as ModuleType)}
                toggle={() => toggleModule(module.id)}
                isSelecting={selectedModules.includes(module.id)}
                version={version}
              />
            ))}
        </Group>
      </div>

      <Title order={2} mt='xl'>
        Discord add-ons
      </Title>
      <div className='block sm:hidden'>
        <Stack>
          {modules
            .filter(m => m.id.includes('discord'))
            .map(module => (
              <DownloadCard
                key={module.id}
                module={module}
                download={() => downloadSingle(module.id as ModuleType)}
                toggle={() => toggleModule(module.id)}
                isSelecting={selectedModules.includes(module.id)}
                version={version}
              />
            ))}
        </Stack>
      </div>
      <div className='hidden sm:block'>
        <Group grow style={{ alignItems: 'stretch' }}>
          {modules
            .filter(m => m.id.includes('discord'))
            .map(module => (
              <DownloadCard
                key={module.id}
                module={module}
                download={() => downloadSingle(module.id as ModuleType)}
                toggle={() => toggleModule(module.id)}
                isSelecting={selectedModules.includes(module.id)}
                version={version}
              />
            ))}
        </Group>
      </div>

      <Title order={2} mt='xl'>
        More add-ons
      </Title>
      <Stack>
        {modules
          .filter(
            m => !m.recommended && !m.id.includes('discord') && m.id !== 'core',
          )
          .map(module => (
            <DownloadCard
              key={module.id}
              module={module}
              download={() => downloadSingle(module.id as ModuleType)}
              toggle={() => toggleModule(module.id)}
              isSelecting={selectedModules.includes(module.id)}
              version={version}
            />
          ))}
      </Stack>
    </>
  );
}
