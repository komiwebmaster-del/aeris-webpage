import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FadeUp } from '@/components/ui/fade-up';
import { WaveBackground } from '@/components/decor/wave-background';

const valueIds = ['engineered', 'clean', 'quiet', 'reliable', 'premium'] as const;

// 지그재그 V-shape 오프셋 — md(태블릿): 절반, lg(데스크톱): 전체
const desktopOffsets: Record<(typeof valueIds)[number], string> = {
  engineered: 'md:pt-0 lg:pt-0',
  clean: 'md:pt-12 lg:pt-24',
  quiet: 'md:pt-24 lg:pt-48',
  reliable: 'md:pt-12 lg:pt-24',
  premium: 'md:pt-0 lg:pt-0',
};

export function BrandCoreSection() {
  const t = useTranslations('brandCore');
  const headlineParts = t('headline').split('\n');

  return (
    <Section background="white" id="brand-core" className="relative overflow-hidden">
      <WaveBackground fullBleed />
      <Container className="relative z-10">
        <FadeUp delay={0}>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="break-keep mx-auto mt-10 max-w-3xl text-center text-display font-bold leading-tight text-navy-900 md:mt-12">
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
        </FadeUp>

        {/* 중앙 비주얼 placeholder — 에셋 수령 예정 */}
        <FadeUp delay={0.18} className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-3xl md:mt-12">
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-blue-50">
            <p className="text-caption font-medium uppercase tracking-wider text-blue-500">
              3D Isometric Visual — 에셋 수령 예정
            </p>
          </div>
        </FadeUp>

        {/* 5-포인트 가치 */}
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 md:grid-cols-5 md:gap-6 lg:mt-8 lg:gap-8">
          {valueIds.map((id, idx) => (
            <FadeUp
              key={id}
              as="li"
              delay={0.1 + idx * 0.07}
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
            </FadeUp>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
