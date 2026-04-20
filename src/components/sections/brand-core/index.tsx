import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { WaveBackground } from '@/components/decor/wave-background';

const valueIds = ['engineered', 'clean', 'quiet', 'reliable', 'premium'] as const;

// 데스크톱 지그재그 V-shape 오프셋 — 1,5 상단 / 2,4 중단 / 3 하단
const desktopOffsets: Record<(typeof valueIds)[number], string> = {
  engineered: 'lg:pt-0',
  clean: 'lg:pt-24',
  quiet: 'lg:pt-48',
  reliable: 'lg:pt-24',
  premium: 'lg:pt-0',
};

export function BrandCoreSection() {
  const t = useTranslations('brandCore');
  const headlineParts = t('headline').split('\n');

  return (
    <Section background="white" id="brand-core" className="relative overflow-hidden">
      <WaveBackground fullBleed />
      <Container className="relative z-10">
        <Eyebrow>{t('eyebrow')}</Eyebrow>

        <h2 className="mx-auto mt-10 max-w-3xl text-center text-display font-bold leading-tight text-navy-900 lg:mt-12">
          {headlineParts.map((line, idx) => (
            <span key={idx} className="block">
              {line.split('AERIS').map((chunk, i, arr) => (
                <span key={i}>
                  {chunk}
                  {i < arr.length - 1 && (
                    <span className="text-blue-500">AERIS</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* 중앙 비주얼 placeholder — 에셋 수령 예정 */}
        <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-3xl lg:mt-12">
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-blue-50">
            <p className="text-caption font-medium uppercase tracking-wider text-blue-500">
              3D Isometric Visual — 에셋 수령 예정
            </p>
          </div>
        </div>

        {/* 5-포인트 가치 */}
        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6 lg:mt-8 lg:gap-8">
          {valueIds.map((id, idx) => (
            <li
              key={id}
              className={`flex flex-col items-start gap-1 md:items-center md:text-center ${desktopOffsets[id]}`}
            >
              <span className="text-h1 font-light leading-none text-blue-400">
                {idx + 1}
              </span>
              <p className="mt-2 text-body font-bold text-navy-900">
                {t(`values.${id}.ko`)}
              </p>
              <p className="text-small text-gray-500">
                {t(`values.${id}.en`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
