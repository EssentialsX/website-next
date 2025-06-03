import { Box, Group } from '@mantine/core';

interface StatBadgeProps {
  label: string;
  href: string;
  value: string;
  valueColor: string;
}

export default function StatBadge({
  label,
  href,
  value,
  valueColor,
}: StatBadgeProps) {
  return (
    <Group gap={0} style={{ overflow: 'hidden', borderRadius: '6px' }}>
      <Box
        className='hover:underline'
        component='a'
        href={href}
        bg='#4A4A4A'
        fz='12px'
        fw={600}
        py='4px'
        px='12px'
        c='white'
      >
        {label}
      </Box>
      <Box
        className='hover:underline'
        component='a'
        href={href}
        bg={valueColor}
        fz='12px'
        fw={600}
        py='4px'
        px='12px'
        c='white'
      >
        {value}
      </Box>
    </Group>
  );
}
