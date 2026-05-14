import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FadeUp } from '@/components/ui/fade-up';
import { HugeiconsHome07 } from '@/components/icons/hugeicons-home-07';

export function BrandConceptSection() {
  const t = useTranslations('brandConcept');
  const tc = useTranslations('common');

  return (
    <Section background="navy" id="brand-concept">
      <Container>
        <FadeUp delay={0}>
          <Eyebrow className="text-blue-300 [&>span:last-child]:text-blue-300 [&>span:last-child]:normal-case">
            {t('eyebrow')}
          </Eyebrow>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 md:gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — Logo */}
          <FadeUp delay={0.1} className="flex items-center justify-center">
            <Image
              src="/images/logo/luvair-logo-white.png"
              alt={tc('logoAlt')}
              width={1483}
              height={600}
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 240px"
              className="h-auto w-full max-w-[240px] sm:max-w-xs lg:max-w-sm"
            />
          </FadeUp>

          {/* Right — Concept items */}
          <ul className="flex flex-col divide-y divide-white/10">
            {/* Luv + Air — heart icon (no built-in frame → CSS circle wrapper) */}
            <FadeUp as="li" delay={0.15} className="flex items-start gap-5 pb-10">
              <div className="flex h-[63px] w-[63px] shrink-0 items-center justify-center rounded-full border border-blue-300/40">
                <HugeiconsHome07 variant="home-07" width={40} height={40} />
              </div>
              <div>
                <h3 className="text-h2 font-bold leading-tight text-blue-300">
                  {t('c1.title')}
                </h3>
                <p className="mt-3 break-keep whitespace-pre-line text-body leading-relaxed text-gray-300">
                  {t('c1.description')}
                </p>
              </div>
            </FadeUp>

            {/* Air as Experience — wind icon (frame built into SVG) */}
            <FadeUp as="li" delay={0.25} className="flex items-start gap-5 py-10">
              <HugeiconsHome07 variant="home-07-2" className="shrink-0" />
              <div>
                <h3 className="text-h2 font-bold leading-tight">
                  <span className="text-blue-300">{t('c2.titlePrefix')}</span>
                  <span className="text-blue-100">{t('c2.titleHighlight')}</span>
                </h3>
                <p className="mt-3 break-keep whitespace-pre-line text-body leading-relaxed text-gray-300">
                  {t('c2.description')}
                </p>
              </div>
            </FadeUp>

            {/* Designed for Your Space — home icon (frame built into SVG) */}
            <FadeUp as="li" delay={0.35} className="flex items-start gap-5 pt-10">
              <HugeiconsHome07 variant="home-07-1" className="shrink-0" />
              <div>
                <h3 className="text-h2 font-bold leading-tight">
                  <span className="text-blue-300">{t('c3.titlePrefix')}</span>
                  <span className="text-blue-100">{t('c3.titleHighlight')}</span>
                </h3>
                <p className="mt-3 break-keep whitespace-pre-line text-body leading-relaxed text-gray-300">
                  {t('c3.description')}
                </p>
              </div>
            </FadeUp>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
