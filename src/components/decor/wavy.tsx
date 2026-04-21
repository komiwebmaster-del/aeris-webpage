import { cn } from '@/lib/cn';

export interface WavyProps {
  className?: string;
  fullBleed?: boolean;
  opacity?: number;
  animate?: boolean;
}

export function Wavy({
  className,
  fullBleed = false,
  opacity,
  animate = true,
}: WavyProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        ...(fullBleed ? { zIndex: 0 } : null),
        ...(opacity !== undefined ? { opacity } : null),
      }}
      className={cn(
        'pointer-events-none select-none',
        fullBleed ? 'absolute inset-0 overflow-hidden' : 'relative h-full w-full',
        className,
      )}
    >
      <img
        src="/images/decor/wavy.svg"
        alt=""
        decoding="async"
        loading="lazy"
        className={cn(
          'h-full w-full object-cover object-center',
          animate && 'animate-wavy-drift',
        )}
      />
    </div>
  );
}
