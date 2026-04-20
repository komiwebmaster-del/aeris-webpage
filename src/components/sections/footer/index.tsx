import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/container';
import { FadeUp } from '@/components/ui/fade-up';

export function FooterSection() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-300 bg-gray-50 py-8 lg:py-16">
      <Container>
        <FadeUp delay={0} className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left — Brand & Contact */}
          <div className="space-y-4">
            <Link href="/" aria-label={t('brandLine')}>
              <span className="text-h3 font-bold tracking-tight text-navy-900">
                AERIS
              </span>
            </Link>
            <p className="text-small text-gray-700">{t('brandLine')}</p>
            <div className="space-y-1 text-small text-gray-500">
              <p>
                <span className="font-medium text-gray-700">
                  {t('labels.tel')}
                </span>{' '}
                {t('telValue')}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  {t('labels.sales')}
                </span>{' '}
                {t('salesValue')}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  {t('labels.bizNumber')}
                </span>{' '}
                {t('bizNumberValue')}
              </p>
            </div>
          </div>

          {/* Right — Legal Links */}
          <div className="flex gap-6 text-small text-gray-500 md:flex-col md:items-end md:gap-2">
            <Link
              href="/legal/privacy"
              className="transition-colors hover:text-navy-900"
            >
              {t('legal.privacy')}
            </Link>
            <Link
              href="/legal/terms"
              className="transition-colors hover:text-navy-900"
            >
              {t('legal.terms')}
            </Link>
          </div>
        </FadeUp>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-small text-gray-500">
            {t('copyright', { year })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
