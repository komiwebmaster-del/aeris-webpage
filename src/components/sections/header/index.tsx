'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { cn } from '@/lib/cn';

export function HeaderSection() {
  const t = useTranslations('header');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-16 bg-white transition-shadow duration-base lg:h-[72px]',
        scrolled && 'shadow-sm',
      )}
    >
      <div className="mx-auto flex h-full max-w-container items-center justify-between px-[var(--container-pad-mobile)] lg:px-[var(--container-pad-desktop)]">
        {/* Logo */}
        <Link href="/" aria-label={t('logoAlt')} className="flex items-center">
          <Image
            src="/images/logo/aeris-logo-navy.png"
            alt={t('logoAlt')}
            width={2270}
            height={668}
            priority
            className="h-7 w-auto lg:h-8"
          />
        </Link>

        {/* Right */}
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('ctaInquiry')}
          </Button>
        </div>
      </div>
    </header>
  );
}
