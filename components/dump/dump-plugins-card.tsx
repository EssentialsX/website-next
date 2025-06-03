import { DumpPlugin } from '@/lib/dump-utils';
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  CardSection,
  Collapse,
  Table,
  TableTh,
  TableThead,
  TableTr,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function DumpPluginsCard({
  title,
  plugins,
}: {
  title: string;
  plugins: DumpPlugin[];
}) {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [expandedPlugin, setExpandedPlugin] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlugins = plugins.filter(plugin =>
    plugin.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          {title} ({plugins.length})
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
        <Table striped={false} highlightOnHover={false}>
          <TableThead>
            <TableTr>
              <TableTh style={{ width: '40%' }}>Name</TableTh>
              <TableTh style={{ width: '30%' }}>Version</TableTh>
              <TableTh style={{ width: '30%' }}>Status</TableTh>
            </TableTr>
          </TableThead>
        </Table>

        <Box p='sm' style={{ borderBottom: '1px solid #e9ecef' }}>
          <TextInput
            placeholder='Filter plugins by name'
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.currentTarget.value)}
          />
        </Box>

        <div>
          {filteredPlugins.map(plugin => (
            <div key={plugin.name}>
              <div
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #e9ecef',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  setExpandedPlugin(
                    expandedPlugin === plugin.name ? null : plugin.name,
                  )
                }
              >
                <ActionIcon
                  color='red'
                  variant='transparent'
                  style={{ marginRight: '8px' }}
                >
                  {expandedPlugin === plugin.name ?
                    <IconChevronDown size={16} />
                  : <IconChevronRight size={16} />}
                </ActionIcon>

                <div style={{ display: 'flex', width: '100%' }}>
                  <Text style={{ flex: '40%' }}>{plugin.name}</Text>
                  <Text style={{ flex: '30%' }}>{plugin.version}</Text>
                  <div style={{ flex: '30%' }}>
                    <Badge
                      color={plugin.enabled ? 'green' : 'red'}
                      variant='filled'
                      style={{
                        textTransform: 'uppercase',
                        fontWeight: 'normal',
                        fontSize: '0.75rem',
                      }}
                    >
                      {plugin.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>
              </div>

              <Collapse in={expandedPlugin === plugin.name}>
                <Box p='md' style={{ borderBottom: '1px solid #e9ecef' }}>
                  {plugin.description !== undefined && (
                    <div style={{ marginBottom: '10px' }}>
                      <Text fw={700} component='span'>
                        Description:{' '}
                      </Text>
                      <Text component='span'>{plugin.description}</Text>
                    </div>
                  )}

                  {plugin.authors !== undefined && (
                    <div style={{ marginBottom: '10px' }}>
                      <Text fw={700} component='span'>
                        Authors:{' '}
                      </Text>
                      <Text component='span'>{plugin.authors.join(', ')}</Text>
                    </div>
                  )}

                  {plugin.main !== undefined && (
                    <div>
                      <Text fw={700} component='span'>
                        Main class:{' '}
                      </Text>
                      <Text component='span'>{plugin.main}</Text>
                    </div>
                  )}
                </Box>
              </Collapse>
            </div>
          ))}
        </div>
      </Collapse>
    </Card>
  );
}
