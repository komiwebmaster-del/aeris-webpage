import { cn } from '@/lib/cn';

interface ContainerProps {
  size?: 'default' | 'narrow';
  className?: string;
  children: React.ReactNode;
}

export function Container({
  size = 'default',
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]',
        size === 'default' ? 'max-w-container' : 'max-w-[800px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
