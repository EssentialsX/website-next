import React, { useState } from 'react';
import { Box, Group, Collapse, ActionIcon, Text } from '@mantine/core';
import {  IconChevronUp, IconSelector } from '@tabler/icons-react';

export default function ExpandingList({ items }: { items: string[] }) {
    const [opened, setOpened] = useState(false);

    const toggle = () => setOpened((o) => !o);

    return (
        <Box w="100%" p={0} m={0}>
            <Group
                p={4}
                gap="xs"
                wrap="nowrap"
                align="center"
                justify="apart"
                onClick={toggle}
                className="cursor-pointer"
            >
                <Text size="sm" lineClamp={1}>
                    {items.length > 0 ? items[0] : 'None'}
                </Text>
                <ActionIcon disabled={items.length < 2} size="xs" style={{ flexShrink: 0 }}>
                    {opened ? <IconChevronUp size={14} /> : <IconSelector size={14} />}
                </ActionIcon>
            </Group>

            <Collapse in={opened}>
                <Box
                    pl={4}
                    pt={4}
                    style={{
                        borderTop: opened ? '1px solid #eee' : 'none',
                    }}
                >
                    {items.slice(1).map((item, index) => (
                        <Text key={index} size="sm" py={4}>
                            {item}
                        </Text>
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
}