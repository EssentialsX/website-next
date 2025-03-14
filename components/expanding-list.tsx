import React, { useState } from 'react';
import { Box, Collapse, Button, List, ListItem } from '@mantine/core';
import {  IconSelector } from '@tabler/icons-react';

export default function ExpandingList({ items }: { items: string[] }) {
    const [opened, setOpened] = useState(false);

    const toggle = () => setOpened((o) => !o);

    return (
        <Box w="100%" p={0} m={0}>
            <div className="prose dark:prose-invert flex">
                <code
                    className="text-xs flex items-center"
                    style={{ borderStartEndRadius: 0, borderBottomRightRadius: 0 }}
                >
                    {items.length > 0 ? items[0] : 'None'}
                </code>
                <Button
                    px={2}
                    h="inherit"
                    onClick={toggle}
                    disabled={items.length < 2}
                    style={{ borderStartStartRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <IconSelector size={14} />
                </Button>
            </div>

            <Collapse in={opened}>
                <Box
                    pl={4}
                    pt={4}
                    style={{
                        borderTop: opened ? '1px solid #eee' : 'none',
                    }}
                    className="prose dark:prose-invert"
                >
                    <List>
                        {items.slice(1).map((item, index) => (
                            <ListItem key={index}>
                                <code className="text-xs">
                                    {item}
                                </code>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Collapse>
        </Box>
    );
}
