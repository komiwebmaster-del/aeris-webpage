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

  // 헤드라인에서 "매일 겪는 문제" 부분을 블루로 강조
  const headlineParts = t('headline').split('\n');

  return (
    <Section background="white" id="why">
      <Container>
        {/* Section Header — 시안: eyebrow + headline 좌측, description 우하단 */}
        <div className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="text-display font-bold leading-tight text-navy-900">
              {headlineParts[0]}
              <br />
              <span className="text-blue-500">{headlineParts[1]}</span>
            </h2>
          </div>
          <p className="max-w-xs whitespace-pre-line text-body leading-relaxed text-gray-700 lg:text-right">
            {t('description')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {cardIds.map((id) => {
            const Icon = cardIcons[id];
            return (
              <div key={id} className="group flex flex-col gap-4">
                {/* Image/Icon area — 보더는 이 영역만 감쌈 */}
                <div className="flex aspect-square items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors duration-base group-hover:border-blue-300">
                  <Icon
                    className="h-12 w-12 text-gray-300 transition-colors duration-base group-hover:text-blue-400 lg:h-14 lg:w-14"
                    strokeWidth={1}
                  />
                </div>

                {/* Title + Tag — 카드 바깥, 가운데 정렬 */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-body font-bold text-navy-900">
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
