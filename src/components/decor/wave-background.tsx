import Image from 'next/image';
import { cn } from '@/lib/cn';

interface WaveBackgroundProps {
  className?: string;
  fullBleed?: boolean;
}

export function WaveBackground({ className, fullBleed = false }: WaveBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      style={fullBleed ? { zIndex: 0 } : undefined}
      className={cn(
        'pointer-events-none select-none',
        fullBleed ? 'absolute inset-0 overflow-hidden' : 'relative h-full w-full',
        className,
      )}
    >
      <Image
        src="/images/decor/wave-bg.png"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="object-cover object-center opacity-60"
      />
    </div>
  );
}
