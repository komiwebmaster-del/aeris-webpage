import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={cn('flex items-center gap-2 text-blue-500', className)}>
      <span className="h-px w-6 bg-current" />
      <span className="text-caption font-medium uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
}
