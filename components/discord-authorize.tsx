import React, { useState } from 'react';
import { TextInput, Button, Group, Box, Text } from '@mantine/core';

const authorizeUrl = 'https://discord.com/api/oauth2/authorize?permissions=1006652432&scope=bot%20applications.commands&client_id='

export default function DiscordAuthorize() {
    const [clientId, setClientId] = useState('');
    const [charCount, setCharCount] = useState(0);
    const maxLength = 19;

    const handleInputChange = (event: { target: { value: string; }; }) => {
        const value = event.target.value.replace(/[^0-9]/g, "");
        setClientId(value);
        setCharCount(value.length);
    };

    return (
        <Box mx="auto" style={{ maxWidth: 500 }}>
            <Group justify="apart" gap={0} align="flex-start">
                <TextInput
                    placeholder="Client ID"
                    value={clientId}
                    maxLength={19}
                    onChange={handleInputChange}
                    style={{
                        flex: 1,
                        'input': {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderRight: 'none',
                        }
                    }}
                />
                <Button
                    component="a"
                    href={`${authorizeUrl}${clientId}`}
                    color="red"
                    radius="md"
                    disabled={charCount < 18}
                    style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        height: 36
                    }}
                >
                    Authorize
                </Button>
            </Group>
            <Text
                size="sm"
                mt={5}
                c="dimmed"
                me={6}
                style={{ textAlign: 'right' }}
            >
                {charCount} / {maxLength}
            </Text>
        </Box>
    );
}