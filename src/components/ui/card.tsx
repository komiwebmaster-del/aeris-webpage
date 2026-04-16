import { cn } from '@/lib/cn';

const variantStyles = {
  bordered: 'border border-gray-300 bg-white',
  filled: 'bg-gray-100',
} as const;

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const;

interface CardProps {
  variant?: keyof typeof variantStyles;
  padding?: keyof typeof paddingStyles;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = 'bordered',
  padding = 'md',
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
