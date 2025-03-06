import { Card, CardSection, SimpleGrid, Text, Title } from "@mantine/core";

interface DumpCardProps {
    title: string
    color: string
    data: { label: string; value: string }[]
}

export default function DumpCard({title, color, data}: DumpCardProps) {
    return (
        <Card padding={0} radius="md" withBorder>
            <CardSection p="sm" style={{backgroundColor: color}}>
                <Title ms={4} order={4} c="white">
                    {title}
                </Title>
            </CardSection>

            <div className="p-4">
                <SimpleGrid cols={{base: 1, sm: 2, md: data.length > 4 ? 4 : data.length}} spacing="md">
                    {data.map((item, index) => (
                        <div key={index} style={{textAlign: "center"}}>
                            <Text size="sm" fw={500} c="dimmed">
                                {item.label}
                            </Text>
                            <Text size="sm" fw={700}>
                                {item.value}
                            </Text>
                        </div>
                    ))}
                </SimpleGrid>
            </div>
        </Card>
    );
}