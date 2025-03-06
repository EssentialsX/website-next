"use client"

import StatBadge from "@/components/stat-badge";
import { useSharedData } from "@/contexts/shared-data";
import { ActionIcon, Container, Group, Text, useMantineColorScheme } from "@mantine/core"
import { IconMoon, IconSun } from "@tabler/icons-react"

export default function Footer() {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const { downloads, discord, github, stableBuild, devBuild } = useSharedData();

    const year = new Date().getFullYear();

    return (
        <footer className="mt-2">
            <Container size="xl" py="md" px="xl">
                <Group mb="md" justify="center">
                    <StatBadge label="Downloads" value={`${(downloads / 1000000).toFixed(2)}m`} valueColor="#ee8a18" />
                    <StatBadge label="Latest Release" value={stableBuild?.version ?? '??'} valueColor="#E93B38FF" />
                    <StatBadge label="Jenkins" value={`b${devBuild?.build ?? '??'}`} valueColor="#1fab52" />
                    <StatBadge label="Discord" value={`${(discord.members / 1000).toFixed(1)}k online`} valueColor="#7289DA" />
                    <StatBadge label="GitHub" value={`${github.stars} stars`} valueColor="#000" />
                </Group>
                <Group justify="space-between" align="center">
                    <Text size="sm" c="dimmed">
                        Website copyright © 2019-{year} EssentialsX Team, 2015-{year} EssentialsX wiki contributors
                        except where
                        otherwise noted.
                    </Text>
                    <ActionIcon suppressHydrationWarning onClick={() => toggleColorScheme()} variant="default" size="lg"
                                aria-label="Toggle color scheme">
                        {colorScheme === "dark" ? <IconSun size="1.1rem"/> : <IconMoon size="1.1rem"/>}
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    )
}

