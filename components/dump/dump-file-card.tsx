import { CodeHighlight } from '@mantine/code-highlight';
import {
  ActionIcon,
  Card,
  CardSection,
  Collapse,
  ScrollArea,
  Text,
} from '@mantine/core';
import { IconChevronUp } from '@tabler/icons-react';
import { useState } from 'react';
import { VirtualizedText } from './virtualized-text';

interface DumpFileCardProps {
  title: string;
  content: string;
  language: string;
}

export default function DumpFileCard({
  title,
  content,
  language,
}: DumpFileCardProps) {
  const [sectionOpen, setSectionOpen] = useState(false);

  // Use virtualized text for large files that don't need syntax highlighting
  const shouldVirtualize =
    title === 'Latest Log' ||
    title === 'Command Map' ||
    title === 'Command Overrides';

  return (
    <Card padding={0} radius='sm' withBorder>
      <CardSection
        p='md'
        bg='#333'
        c='white'
        display='flex'
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={() => setSectionOpen(!sectionOpen)}
      >
        <Text size='lg' fw={500}>
          {title}
        </Text>
        <ActionIcon
          variant='transparent'
          color='white'
          onClick={() => setSectionOpen(!sectionOpen)}
        >
          <IconChevronUp
            size={20}
            style={{ transform: sectionOpen ? 'none' : 'rotate(180deg)' }}
          />
        </ActionIcon>
      </CardSection>

      <Collapse in={sectionOpen}>
        {shouldVirtualize ?
          <VirtualizedText content={content} maxHeight={400} />
        : <ScrollArea h={400} scrollbarSize={8}>
            <CodeHighlight code={content} language={language} />
          </ScrollArea>
        }
      </Collapse>
    </Card>
  );
}
