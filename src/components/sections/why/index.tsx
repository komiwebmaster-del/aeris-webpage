import { useTranslations } from 'next-intl';
import { Droplets, Wind, Thermometer, Building2 } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Badge } from '@/components/ui/badge';

const cardIcons = {
  mold: Droplets,
  odor: Wind,
  humidity: Thermometer,
  common: Building2,
} as const;

const cardIds = ['mold', 'odor', 'humidity', 'common'] as const;

export function WhySection() {
  const t = useTranslations('why');

  return (
    <Section background="white" id="why">
      <Container>
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="whitespace-pre-line text-h1 font-bold text-navy-900">
              {t('headline')}
            </h2>
          </div>
          <p className="max-w-sm text-body text-gray-700 lg:text-right">
            {t('description')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {cardIds.map((id) => {
            const Icon = cardIcons[id];
            return (
              <div
                key={id}
                className="group flex flex-col overflow-hidden rounded-md border border-gray-300 bg-white transition-colors duration-base hover:border-blue-300"
              >
                {/* Icon area */}
                <div className="flex aspect-square items-center justify-center border-b border-gray-200 bg-gray-50 transition-colors duration-base group-hover:bg-blue-50">
                  <Icon
                    className="h-10 w-10 text-gray-400 transition-colors duration-base group-hover:text-blue-500 lg:h-12 lg:w-12"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between gap-3 p-4 lg:p-5">
                  <p className="text-body font-semibold text-navy-900">
                    {t(`cards.${id}.title`)}
                  </p>
                  <Badge variant="solid" size="sm">
                    {t(`cards.${id}.tag`)}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
