'use client';

import { Kbd, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef, useState } from 'react';

interface VirtualizedTextProps {
  content: string;
  maxHeight?: number;
  lineHeight?: number;
}

export function VirtualizedText({
  content,
  maxHeight = 600,
  lineHeight = 18,
}: VirtualizedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const lines = useMemo(() => content.split('\n'), [content]);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const matchingLineIndexes = useMemo(() => {
    if (!normalizedSearchQuery) {
      return [];
    }

    return lines.reduce<number[]>((indexes, line, index) => {
      if (line.toLowerCase().includes(normalizedSearchQuery)) {
        indexes.push(index);
      }

      return indexes;
    }, []);
  }, [lines, normalizedSearchQuery]);
  const activeLineIndex =
    matchingLineIndexes.length > 0 ?
      matchingLineIndexes[activeMatchIndex] ?? matchingLineIndexes[0]
    : null;

  const virtualizer = useVirtualizer({
    count: lines.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => lineHeight,
    overscan: 10,
  });

  useEffect(() => {
    setActiveMatchIndex(0);
  }, [normalizedSearchQuery]);

  useEffect(() => {
    if (activeLineIndex === null) {
      return;
    }

    virtualizer.scrollToIndex(activeLineIndex, { align: 'center' });
  }, [activeLineIndex, virtualizer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'f') {
        return;
      }

      const activeElement = document.activeElement;
      const isViewerFocused = !!(
        activeElement && containerRef.current?.contains(activeElement)
      );

      if (!isHovered && !isViewerFocused) {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isHovered]);

  const goToMatch = (direction: 1 | -1) => {
    if (matchingLineIndexes.length === 0) {
      return;
    }

    setActiveMatchIndex(currentIndex => {
      const nextIndex =
        (currentIndex + direction + matchingLineIndexes.length) %
        matchingLineIndexes.length;
      return nextIndex;
    });
  };

  const renderLine = (line: string, isActiveMatch: boolean) => {
    if (!normalizedSearchQuery) {
      return line;
    }

    const renderedParts: React.ReactNode[] = [];
    const lowerCaseLine = line.toLowerCase();
    let searchIndex = 0;
    let key = 0;

    while (searchIndex < line.length) {
      const matchIndex = lowerCaseLine.indexOf(normalizedSearchQuery, searchIndex);

      if (matchIndex === -1) {
        renderedParts.push(
          <span key={`text-${key++}`}>{line.slice(searchIndex)}</span>,
        );
        break;
      }

      if (matchIndex > searchIndex) {
        renderedParts.push(
          <span key={`text-${key++}`}>{line.slice(searchIndex, matchIndex)}</span>,
        );
      }

      renderedParts.push(
        <span
          key={`match-${key++}`}
          style={{
            backgroundColor: isActiveMatch ? '#ffd43b' : '#fff3bf',
            color: '#212529',
          }}
        >
          {line.slice(matchIndex, matchIndex + normalizedSearchQuery.length)}
        </span>,
      );

      searchIndex = matchIndex + normalizedSearchQuery.length;
    }

    return renderedParts;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          borderBottom: '1px solid #e9ecef',
        }}
      >
        <TextInput
          ref={searchInputRef}
          placeholder='Search this file'
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={event => setSearchQuery(event.currentTarget.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              goToMatch(event.shiftKey ? -1 : 1);
            }
          }}
          style={{ flex: 1 }}
        />
        <Text size='sm' c='dimmed'>
          {matchingLineIndexes.length > 0 ?
            `${activeMatchIndex + 1} / ${matchingLineIndexes.length} matches`
          : normalizedSearchQuery ?
            'No matches'
          : <Kbd>Ctrl/Cmd + F</Kbd>}
        </Text>
      </div>

      <div
        ref={parentRef}
        tabIndex={0}
        style={{
          height: maxHeight,
          overflow: 'auto',
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Menlo, "Liberation Mono", "Courier New", monospace',
          fontSize: '13px',
          lineHeight: `${lineHeight}px`,
          border: '1px solid #e9ecef',
          borderTop: 'none',
          borderRadius: '0 0 4px 4px',
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
          {virtualizer.getVirtualItems().map(virtualItem => {
            const isActiveMatch = activeLineIndex === virtualItem.index;

            return (
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
                  backgroundColor: isActiveMatch ? '#fff9db' : undefined,
                }}
              >
                {renderLine(lines[virtualItem.index] || '', isActiveMatch)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
