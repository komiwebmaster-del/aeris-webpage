import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Badge } from '@/components/ui/badge';

const caseIds = ['balcony', 'bathroom', 'dressroom', 'window'] as const;

const imagePlaceholders: Record<string, string> = {
  balcony: '/images/placeholder-shat.svg',
  bathroom: '/images/placeholder-drdh.svg',
  dressroom: '/images/placeholder-radm.svg',
  window: '/images/placeholder-shat.svg',
};

export function UseCasesSection() {
  const t = useTranslations('useCases');

  return (
    <Section background="white" id="use-cases">
      <Container>
        {/* Header */}
        <div className="mb-10 space-y-3 lg:mb-16">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="text-h1 font-bold text-navy-900">{t('headline')}</h2>
        </div>

        {/* Mobile: 1 col / Desktop: 4 col zigzag */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {caseIds.map((id, index) => {
            const tags = t.raw(`cards.${id}.tags`) as string[];
            // 짝수(0,2) = 위쪽, 홀수(1,3) = 아래쪽 (지그재그)
            const isOffset = index % 2 === 1;

            return (
              <div
                key={id}
                className={`group flex flex-col gap-4 ${
                  isOffset ? 'lg:mt-24' : ''
                }`}
              >
                {/* Image area — 보더는 이미지만 감쌈 */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-gray-300 bg-white">
                  <Image
                    src={imagePlaceholders[id]}
                    alt={t(`cards.${id}.space`)}
                    fill
                    className="object-cover transition-transform duration-slow ease-out group-hover:scale-105"
                  />
                </div>

                {/* Title + Tags — 카드 바깥 아래, 가운데 정렬 */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-body font-bold text-navy-900">
                    {t(`cards.${id}.space`)}
                  </span>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="solid" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
