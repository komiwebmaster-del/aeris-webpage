import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Badge } from '@/components/ui/badge';
import { FadeUp } from '@/components/ui/fade-up';
import { XeaLabFrame, type XeaLabFrameVariant } from '@/components/icons/xea-lab-frame';

const cards: { id: 'mold' | 'humidity' | 'common' | 'odor'; variant: XeaLabFrameVariant }[] = [
  { id: 'mold', variant: 'frame' },
  { id: 'humidity', variant: 'frame-1' },
  { id: 'common', variant: 'frame-2' },
  { id: 'odor', variant: 'frame-3' },
];

export function WhySection() {
  const t = useTranslations('why');
  const headlineLines = t('headline').split('\n');

  return (
    <Section background="white" id="why">
      <Container>
        <FadeUp delay={0} className="mb-12 flex flex-col md:mb-14 lg:mb-16">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <p className="mt-10 text-small font-medium text-gray-500">
            {t('subtitle')}
          </p>
          <h2 className="mt-3 max-w-[min(100%,720px)] break-keep text-display font-bold leading-tight text-navy-900">
            {headlineLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-3xl whitespace-pre-line break-keep text-body leading-relaxed text-gray-700">
            {t('description')}
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {cards.map(({ id, variant }, idx) => (
            <FadeUp key={id} delay={0.1 + idx * 0.08}>
              <div className="group flex flex-col items-center gap-5">
                <div
                  role="img"
                  aria-label={t(`cards.${id}.title`)}
                  className="flex aspect-square w-full items-center justify-center rounded-xl border border-blue-100 bg-white transition-colors group-hover:border-blue-200"
                >
                  <XeaLabFrame variant={variant} alt="" className="h-[55%] w-auto" />
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-body font-bold text-navy-900">
                    {t(`cards.${id}.title`)}
                  </p>
                  <Badge variant="solid" size="sm">
                    {t(`cards.${id}.tag`)}
                  </Badge>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
