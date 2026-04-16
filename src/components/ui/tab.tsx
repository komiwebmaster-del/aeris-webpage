'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/cn';

interface TabItem {
  value: string;
  label: string;
}

interface TabProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tab({ tabs, value, onChange, className }: TabProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex = index;

      if (e.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else {
        return;
      }

      e.preventDefault();
      tabsRef.current[nextIndex]?.focus();
      onChange(tabs[nextIndex].value);
    },
    [tabs, onChange],
  );

  return (
    <div
      role="tablist"
      className={cn(
        'flex overflow-x-auto border-b border-gray-200 scrollbar-none',
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'relative flex-1 cursor-pointer whitespace-nowrap px-4 py-3 text-body font-medium',
              'transition-colors duration-fast ease-out',
              isActive
                ? 'text-navy-900'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-navy-900" />
            )}
          </button>
        );
      })}
    </div>
  );
}
