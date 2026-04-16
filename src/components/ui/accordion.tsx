'use client';

import { useState, useCallback, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface AccordionItemData {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemData[];
  mode?: 'single' | 'multiple';
  className?: string;
}

export function Accordion({
  items,
  mode = 'single',
  className,
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    items.forEach((item, i) => {
      if (item.defaultOpen) initial.add(i);
    });
    return initial;
  });

  const toggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (mode === 'single') next.clear();
          next.add(index);
        }
        return next;
      });
    },
    [mode],
  );

  return (
    <div className={cn('divide-y divide-gray-200', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndices.has(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const headingId = `${id}-heading`;
  const panelId = `${id}-panel`;

  return (
    <div>
      <h3>
        <button
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between py-5 text-left text-body font-medium text-navy-900 transition-colors duration-fast ease-out hover:text-blue-600"
        >
          {question}
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-gray-500 transition-transform duration-base ease-out',
              isOpen && 'rotate-180',
            )}
            strokeWidth={1.5}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={cn(
          'grid transition-[grid-template-rows] duration-base ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-body leading-relaxed text-gray-700">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
