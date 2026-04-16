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
        <div className="mb-10 space-y-3 lg:mb-12">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="text-h1 font-bold text-navy-900">{t('headline')}</h2>
        </div>

        {/* Grid — mobile: 1 col / desktop: asymmetric 2x2 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
          {caseIds.map((id, index) => {
            const tags = t.raw(`cards.${id}.tags`) as string[];

            return (
              <div
                key={id}
                className={`group overflow-hidden rounded-md border border-gray-200 bg-white transition-shadow duration-base hover:shadow-md ${
                  index === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`relative w-full overflow-hidden bg-gray-100 ${
                    index === 0
                      ? 'aspect-[4/5] lg:aspect-auto lg:h-[calc(100%-80px)]'
                      : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={imagePlaceholders[id]}
                    alt={t(`cards.${id}.space`)}
                    fill
                    className="object-cover transition-transform duration-slow ease-out group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="flex items-center justify-between p-4">
                  <span className="text-body font-semibold text-navy-900">
                    {t(`cards.${id}.space`)}
                  </span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
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
