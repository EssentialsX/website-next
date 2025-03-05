"use client"

import { useState } from "react"
import { Alert, Button, Container, Group, SegmentedControl, Stack, Text, Title, } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"
import { modules } from "@/lib/modules-data"
import DownloadWarnings from "@/components/download-warnings";
import DownloadInfo from "@/components/download-info";
import DownloadCard from "@/components/download-card";

export default function Downloads() {
    const [selectedModules, setSelectedModules] = useState<string[]>(["core"]);
    const [buildType, setBuildType] = useState("stable");

    const toggleModule = (moduleId: string) => {
        setSelectedModules((prev) =>
            (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId])
        );
    }

    const downloadSelected = () => {
        alert(`Downloading ${selectedModules.length} modules as a zip file: ${selectedModules.join(", ")}`)
    }

    const selectAllModules = () => {
        setSelectedModules(modules.map((module) => module.id));
    }

    const deselectAllModules = () => {
        setSelectedModules(["core"]); // Keep core module selected
    }

    const version = "2.20.1-dev+184-1531c4";
    const stable = "2.21.0";

    const stableChanges = 'https://github.com/EssentialsX/Essentials/releases';
    const devChanges = 'https://github.com/EssentialsX/Essentials/commits/2.x';

    const displayVersion = buildType === "stable" ? <b>{stable}</b> :
        <span><b>{version}</b> (build 1647, commit <a href="#" className="link">5bf158c</a>)</span>;

    return (
        <div>
            <section style={{backgroundColor: "var(--mantine-color-red-filled)"}} className="py-12 px-12">
                <Container size="xl">
                    <Title order={1} c="white">
                        Download EssentialsX
                    </Title>
                    <Text size="lg" c="white" mt="sm">
                        Get bleeding edge builds of EssentialsX and add-ons, including the latest features and bug
                        fixes.
                    </Text>
                </Container>
            </section>

            <Container size="xl" mt="md">
                <Group align="flex-start">
                    <Stack style={{flex: 1}}>
                        {/*<Alert icon={<IconInfoCircle size="1.1rem" />} title="PSA" color="red">*/}
                        {/*    Do not use Mohist. It includes dangerous and potentially malicious behaviour.{" "}*/}
                        {/*    <a className="underline" href="#">*/}
                        {/*        Click here for more information.*/}
                        {/*    </a>*/}
                        {/*</Alert>*/}

                        <Alert icon={<IconInfoCircle size="1.1rem"/>} title="Support Us" color="yellow">
                            EssentialsX is developed by volunteers in our free time. If you&apos;d like to support the
                            development of
                            EssentialsX, please consider supporting us on{" "}
                            <a className="underline" href="https://www.patreon.com/essentialsx">
                                Patreon
                            </a>
                            ,{" "}
                            <a className="underline" href="https://github.com/sponsors/EssentialsX/">
                                GitHub Sponsors
                            </a>{" "}
                            or{" "}
                            <a className="underline" href="https://ko-fi.com/essentialsx">
                                Ko-fi.
                            </a>
                        </Alert>

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
                            download={downloadSelected}
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
                                        download={downloadSelected}
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
                                        download={downloadSelected}
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
                                        download={downloadSelected}
                                        toggle={() => toggleModule(module.id)}
                                        isSelecting={selectedModules.includes(module.id)}
                                        version={version}
                                    />
                                ))}
                        </Stack>
                    </Stack>

                    <div className="grid gap-2">
                        <DownloadWarnings/>
                        <DownloadInfo/>
                    </div>
                </Group>
            </Container>
        </div>
    )
}

