import { Box, Group } from "@mantine/core";

interface StatBadgeProps {
    label: string;
    value: string;
    valueColor: string;
}

export default function StatBadge({label, value, valueColor}: StatBadgeProps) {
    return (
        <Group gap={0} style={{overflow: "hidden", borderRadius: "4px"}}>
            <Box
                bg="#4A4A4A"
                fz="12px"
                fw={600}
                py="4px"
                px="12px"
                c="white"
            >
                {label}
            </Box>
            <Box
                bg={valueColor}
                fz="12px"
                fw={600}
                py="4px"
                px="12px"
                c="white"
            >
                {value}
            </Box>
        </Group>
    )
}