'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

const variantStyles = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-600',
  secondary:
    'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-900',
  ghost:
    'bg-transparent text-navy-900 hover:text-blue-600',
  outline:
    'bg-transparent text-navy-900 border border-gray-300 hover:border-navy-900',
} as const;

const sizeStyles = {
  sm: 'h-9 px-4 text-small gap-1.5',
  md: 'h-11 px-6 text-body gap-2',
  lg: 'h-[52px] px-8 text-body gap-2.5',
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center rounded-md font-medium',
          'transition-colors duration-fast ease-out',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </button>
    );
  },
);

Button.displayName = 'Button';
