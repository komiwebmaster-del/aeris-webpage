'use client';

import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label
        className={cn(
          'group inline-flex cursor-pointer items-center gap-2.5 text-body text-gray-900',
          props.disabled && 'pointer-events-none opacity-50',
          className,
        )}
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              'absolute inset-0 rounded-sm border border-gray-300',
              'transition-colors duration-fast ease-out',
              'peer-checked:border-blue-600 peer-checked:bg-blue-600',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/20 peer-focus-visible:ring-offset-1',
            )}
          />
          <Check
            className="relative z-10 hidden h-3.5 w-3.5 text-white peer-checked:block"
            strokeWidth={2.5}
          />
        </span>
        <span className="text-small">{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
