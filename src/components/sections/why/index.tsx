import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Badge } from '@/components/ui/badge';
import { FadeUp } from '@/components/ui/fade-up';

const cardIds = ['mold', 'humidity', 'common', 'odor'] as const;

function HeadlineLine({ line }: { line: string }) {
  if (!line.includes('AERIS')) return <>{line}</>;
  const parts = line.split('AERIS');
  return (
    <>
      {parts.map((chunk, i) => (
        <span key={i}>
          {chunk}
          {i < parts.length - 1 && (
            <span className="text-blue-500">AERIS</span>
          )}
        </span>
      ))}
    </>
  );
}

export function WhySection() {
  const t = useTranslations('why');
  const headlineLines = t('headline').split('\n');

  return (
    <Section background="white" id="why">
      <Container>
        <FadeUp delay={0} className="mb-12 flex flex-col gap-4 md:mb-14 md:items-start lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="break-keep text-display font-bold leading-tight text-navy-900 max-w-[min(100%,720px)]">
              {headlineLines.map((line, idx) => (
                <span key={idx} className="block">
                  <HeadlineLine line={line} />
                </span>
              ))}
            </h2>
          </div>
          <p className="break-keep max-w-sm whitespace-pre-line text-body leading-relaxed text-gray-700 lg:text-right">
            {t('description')}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {cardIds.map((id, idx) => (
            <FadeUp key={id} delay={0.1 + idx * 0.08}>
              <div className="group flex flex-col gap-4">
                <div
                  role="img"
                  aria-label={`${t(`cards.${id}.title`)} 관련 이미지 (에셋 수령 예정)`}
                  className="flex aspect-square items-center justify-center rounded-md border border-gray-300 bg-white"
                >
                  <span className="text-small text-gray-500">Image 혹은 일러스트</span>
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
