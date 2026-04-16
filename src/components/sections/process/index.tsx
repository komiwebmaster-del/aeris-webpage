import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';

const stepNumbers = ['1', '2', '3', '4', '5'] as const;

export function ProcessSection() {
  const t = useTranslations('process');

  return (
    <Section background="gray" id="process">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-24">
          {/* Left — Headline with vertical bar */}
          <div className="flex items-start gap-4 lg:w-64 lg:shrink-0">
            <div className="h-full min-h-[2rem] w-1 rounded-full bg-navy-900" />
            <h2 className="text-h1 font-bold text-navy-900">
              {t('headline')}
            </h2>
          </div>

          {/* Right — Steps */}
          <div className="flex flex-1 flex-col divide-y divide-gray-200">
            {stepNumbers.map((n) => (
              <div key={n} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                {/* Number bubble */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 text-caption font-bold text-white">
                  {n}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <p className="text-body font-semibold text-navy-900">
                    {t(`steps.${n}.title`)}
                  </p>
                  <p className="text-small text-gray-700">
                    {t(`steps.${n}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
