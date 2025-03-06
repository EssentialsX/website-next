import { CodeHighlight } from "@mantine/code-highlight";
import { ActionIcon, Card, CardSection, Collapse, Text } from "@mantine/core";
import { IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

interface DumpFileCardProps {
    title: string;
    content: string;
    language: string;
}

export default function DumpFileCard({title, content, language}: DumpFileCardProps) {
    const [sectionOpen, setSectionOpen] = useState(false);

    return (
        <Card padding={0} radius="sm" withBorder>
            <CardSection
                p="md"
                bg="#333"
                c="white"
                display="flex"
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                onClick={() => setSectionOpen(!sectionOpen)}
            >
                <Text size="lg" fw={500}>
                    {title}
                </Text>
                <ActionIcon variant="transparent" color="white" onClick={() => setSectionOpen(!sectionOpen)}>
                    <IconChevronUp size={20} style={{transform: sectionOpen ? "none" : "rotate(180deg)"}}/>
                </ActionIcon>
            </CardSection>

            <Collapse in={sectionOpen}>
                <CodeHighlight code={content} language={language}/>
            </Collapse>
        </Card>
    )
}