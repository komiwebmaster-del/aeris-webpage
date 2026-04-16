import { cn } from '@/lib/cn';

const variantStyles = {
  solid: 'bg-blue-50 text-navy-900',
  outline: 'border border-gray-300 text-navy-900',
  dark: 'bg-navy-800 text-blue-300',
} as const;

const sizeStyles = {
  sm: 'px-2 py-0.5 text-caption',
  md: 'px-3 py-1 text-small',
} as const;

interface BadgeProps {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'solid',
  size = 'sm',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
