"use client"

import { ActionIcon, Container, Group, Text, useMantineColorScheme } from "@mantine/core"
import { IconMoon, IconSun } from "@tabler/icons-react"

export default function Footer() {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();

    const year = new Date().getFullYear();

    return (
        <footer className="mt-2">
            <Container size="xl" py="md">
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

