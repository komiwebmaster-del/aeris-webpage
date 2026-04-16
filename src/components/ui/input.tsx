import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-md border bg-white px-4 py-3 text-body text-gray-900',
          'placeholder:text-gray-500',
          'transition-colors duration-fast ease-out',
          'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          error ? 'border-danger' : 'border-gray-300',
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
