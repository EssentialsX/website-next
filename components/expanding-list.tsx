import React, { useState } from 'react';
import { Box, Group, Collapse, Text, Button } from '@mantine/core';
import {  IconChevronUp, IconSelector } from '@tabler/icons-react';

export default function ExpandingList({ items }: { items: string[] }) {
    const [opened, setOpened] = useState(false);

    const toggle = () => setOpened((o) => !o);

    return (
        <Box w="100%" p={0} m={0}>
            <Group
                gap={0}
                wrap="nowrap"
                align="center"
                onClick={toggle}
                className="prose dark:prose-invert"
            >
                <code>
                    {items.length > 0 ? items[0] : 'None'}
                </code>
                <Button disabled={items.length < 2} size="xs" px={2}>
                    {opened ? <IconChevronUp size={14} /> : <IconSelector size={14} />}
                </Button>
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
