'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={cn('flex items-center gap-1 text-small', className)}>
      <Link
        href={pathname}
        locale="ko"
        className={cn(
          'transition-colors duration-fast',
          locale === 'ko'
            ? 'font-bold text-navy-900'
            : 'text-gray-500 hover:text-gray-700',
        )}
      >
        한
      </Link>
      <span className="text-gray-300">/</span>
      <Link
        href={pathname}
        locale="en"
        className={cn(
          'transition-colors duration-fast',
          locale === 'en'
            ? 'font-bold text-navy-900'
            : 'text-gray-500 hover:text-gray-700',
        )}
      >
        EN
      </Link>
    </div>
  );
}
