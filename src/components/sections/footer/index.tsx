import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/container';
import { FadeUp } from '@/components/ui/fade-up';

export function FooterSection() {
  const t = useTranslations('footer');
  const tc = useTranslations('common');
  const year = new Date().getFullYear();

  const email = t('emailValue');

  return (
    <footer className="bg-navy-950 py-10 text-white md:py-12 lg:py-16">
      <Container>
        <FadeUp delay={0} className="flex flex-col gap-10 md:gap-14">
          {/* Top row — brand line / privacy link */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <p className="text-small text-white/90">{t('brandLine')}</p>
            <Link
              href="/legal/privacy"
              className="text-small text-white/80 transition-colors hover:text-white"
            >
              {t('legal.privacy')}
            </Link>
          </div>

          {/* Bottom row — company details / logo */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2 text-small text-white/70">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 break-keep">
                <span>{t('companyName')}</span>
                <span aria-hidden className="text-white/30">|</span>
                <span>
                  {t('labels.address')} {t('addressValue')}
                </span>
                <span aria-hidden className="text-white/30">|</span>
                <span>
                  {t('labels.tel')} {t('telValue')}
                </span>
                <span aria-hidden className="text-white/30">|</span>
                <span>
                  {t('labels.email')}{' '}
                  <a
                    href={`mailto:${email}`}
                    className="underline underline-offset-4 transition-colors hover:text-white"
                  >
                    {email}
                  </a>
                </span>
              </p>
              <p className="text-white/60">{t('copyright', { year })}</p>
            </div>

            <Link href="/" aria-label={tc('logoAlt')} className="shrink-0">
              <Image
                src="/images/logo/aeris-logo-white.png"
                alt={tc('logoAlt')}
                width={2270}
                height={668}
                sizes="(min-width: 1024px) 160px, 120px"
                className="h-auto w-[120px] lg:w-[160px]"
              />
            </Link>
          </div>
        </FadeUp>
      </Container>
    </footer>
  );
}
