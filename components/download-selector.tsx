import DownloadCard from "@/components/download-card";
import { useSharedData } from "@/contexts/shared-data";
import { moduleNames, ModuleType } from "@/lib/build-utils";
import { modules } from "@/lib/modules-data";
import { Button, Group, Loader, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function DownloadSelector() {
    const [selectedModules, setSelectedModules] = useState<string[]>(["core"]);
    const [buildType, setBuildType] = useState("stable");

    const { stableBuild, devBuild } = useSharedData();
    if (!stableBuild || !devBuild) {
        return (
            <div className="flex justify-center mt-12">
                <Loader type="bars" />
            </div>
        );
    }

    const version = buildType === 'stable' ? stableBuild.version : devBuild.version;

    const stableChanges = 'https://github.com/EssentialsX/Essentials/releases';
    const devChanges = 'https://github.com/EssentialsX/Essentials/commits/2.x';

    const downloadSelected = () => {
        // todo figure out how to download multiple files with cors existing
    }

    const downloadSingle = (module: ModuleType) => {
        const link = buildType === 'stable' ?
            stableBuild.downloads[module] : devBuild.downloads[module];

        const element = document.createElement('a');
        element.setAttribute('href', link);
        element.setAttribute('download', `${moduleNames[module]}-${version}.jar`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const selectAllModules = () => {
        setSelectedModules(modules.map((module) => module.id));
    }

    const deselectAllModules = () => {
        setSelectedModules(["core"]); // Keep core module selected
    }

    const displayVersion = buildType === 'stable' ? <b>{version}</b> :
        <span><b>{version}</b> (build {devBuild.build}, commit{" "}
            <a href={`https://github.com/EssentialsX/Essentials/commit/${devBuild.commit}`} className="link">
                {devBuild.commit?.slice(0, 7)}
            </a>)
        </span>;

    const toggleModule = (moduleId: string) => {
        setSelectedModules((prev) =>
            (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId])
        );
    }

    return (
        <>
            <SegmentedControl
                value={buildType}
                onChange={setBuildType}
                data={[{value: 'stable', label: 'Stable Release'}, {
                    value: 'dev',
                    label: 'Development Build'
                }]}
            />

            <Text size="sm">
                The latest <b>{buildType}</b> version of EssentialsX is {displayVersion}. You can view the
                changelog{" "}
                <a className="link" href={buildType === 'stable' ? stableChanges : devChanges}>here</a>.
            </Text>

            <div className="flex justify-between items-center mb-6 mt-4">
                <Title order={2}>
                    Core
                </Title>

                <div className="space-x-2">
                    <Button onClick={selectAllModules}>
                        Select All
                    </Button>
                    <Button onClick={deselectAllModules}>
                        Deselect All
                    </Button>
                    <Button
                        onClick={downloadSelected}
                        disabled={selectedModules.length <= 1}
                    >
                        Download Selected ({selectedModules.length})
                    </Button>
                </div>
            </div>

            <DownloadCard
                module={modules.find(mod => mod.id === 'core')!}
                download={() => downloadSingle('core')}
                toggle={undefined}
                isSelecting={true}
                version={version}
            />

            <Title order={2} mt="xl">
                Recommended add-ons
            </Title>
            <Group grow style={{alignItems: 'stretch'}}>
                {modules
                    .filter((m) => m.recommended)
                    .map((module) => (
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

            <Title order={2} mt="xl">
                Discord add-ons
            </Title>
            <Group grow style={{alignItems: 'stretch'}}>
                {modules
                    .filter((m) => m.id.includes('discord'))
                    .map((module) => (
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

            <Title order={2} mt="xl">
                More add-ons
            </Title>
            <Stack>
                {modules
                    .filter((m) => !m.recommended && !m.id.includes("discord") && m.id !== "core")
                    .map((module) => (
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