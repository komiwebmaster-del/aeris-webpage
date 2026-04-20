import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { WaveBackground } from '@/components/decor/wave-background';

const cardIds = ['system', 'engineering'] as const;

export function BrandOverviewSection() {
  const t = useTranslations('brandOverview');

  return (
    <Section background="white" id="brand-overview" className="relative overflow-hidden">
      <WaveBackground fullBleed />
      <Container className="relative z-10">
        <Eyebrow>{t('eyebrow')}</Eyebrow>

        <div className="mt-12 flex flex-col items-center gap-6 text-center lg:mt-16">
          <h2 className="text-display font-bold leading-tight text-navy-900">
            Air, <span className="text-blue-500">Engineered.</span>
            <br />
            {t('headlineKo')}
          </h2>
          <span className="h-px w-10 bg-blue-500" aria-hidden="true" />
          <p className="mx-auto max-w-2xl whitespace-pre-line text-body leading-relaxed text-gray-700">
            {t.rich('description', {
              brand: (chunks) => (
                <strong className="font-bold text-blue-500">{chunks}</strong>
              ),
            })}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {cardIds.map((id) => (
            <article
              key={id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
            >
              <h3 className="text-h3 font-bold text-navy-900">
                {t(`cards.${id}.title`)}
              </h3>
              <p className="mt-4 whitespace-pre-line text-body leading-relaxed text-gray-700">
                {t.rich(`cards.${id}.body`, {
                  em: (chunks) => (
                    <strong className="font-bold text-navy-900">{chunks}</strong>
                  ),
                })}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
