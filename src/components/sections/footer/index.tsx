import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/container';

export function FooterSection() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-300 bg-gray-50 py-8 lg:py-16">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
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
          <div className="flex gap-6 text-small text-gray-500 lg:flex-col lg:items-end lg:gap-2">
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
        </div>

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
