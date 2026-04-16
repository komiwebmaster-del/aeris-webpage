import { cn } from '@/lib/cn';

const backgrounds = {
  white: 'bg-white',
  navy: 'bg-navy-950 text-white',
  lightBlue: 'bg-blue-100',
  gray: 'bg-gray-100',
} as const;

interface SectionProps {
  background?: keyof typeof backgrounds;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  background = 'white',
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-[var(--section-py-mobile)] lg:py-[var(--section-py-desktop)]',
        backgrounds[background],
        className,
      )}
    >
      {children}
    </section>
  );
}
