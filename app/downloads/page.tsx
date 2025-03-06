"use client"

import DownloadSelector from "@/components/download-selector";
import { Alert, Container, Group, Stack, Text, Title, } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"
import DownloadWarnings from "@/components/download-warnings";
import DownloadInfo from "@/components/download-info";
import { Suspense } from "react";

export default function Downloads() {
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

                        <Suspense>
                            <DownloadSelector />
                        </Suspense>
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

