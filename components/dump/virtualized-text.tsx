'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';

interface VirtualizedTextProps {
  content: string;
  maxHeight?: number;
  lineHeight?: number;
}

export function VirtualizedText({
  content,
  maxHeight = 400,
  lineHeight = 18,
}: VirtualizedTextProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => content.split('\n'), [content]);

  const virtualizer = useVirtualizer({
    count: lines.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => lineHeight,
    overscan: 10,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: maxHeight,
        overflow: 'auto',
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Menlo, "Liberation Mono", "Courier New", monospace',
        fontSize: '13px',
        lineHeight: `${lineHeight}px`,
        border: '1px solid #e9ecef',
        borderRadius: '4px',
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: 'max-content',
          minWidth: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              minWidth: '100%',
              width: 'max-content',
              height: lineHeight,
              transform: `translateY(${virtualItem.start}px)`,
              padding: '2px 12px',
              whiteSpace: 'pre',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {lines[virtualItem.index] || ''}
          </div>
        ))}
      </div>
    </div>
  );
}
