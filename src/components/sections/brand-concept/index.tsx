import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FadeUp } from '@/components/ui/fade-up';

// AERIS 아크로님 — 브랜드명 일부로 로케일 무관 상수
const acronym = [
  { id: 'air', first: 'A', rest: 'ir' },
  { id: 'engineered', first: 'E', rest: 'ngineered' },
  { id: 'reliable', first: 'R', rest: 'eliable' },
  { id: 'indoor', first: 'I', rest: 'ndoor' },
  { id: 'system', first: 'S', rest: 'ystem' },
] as const;

export function BrandConceptSection() {
  const t = useTranslations('brandConcept');
  const tc = useTranslations('common');

  return (
    <Section background="navy" id="brand-concept">
      <Container>
        <FadeUp delay={0}>
          <Eyebrow className="text-blue-300 [&>span:last-child]:text-blue-300">
            {t('eyebrow')}
          </Eyebrow>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 md:gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-24">
          <FadeUp delay={0.1} className="flex items-center justify-center">
            <Image
              src="/images/logo/aeris-logo-white.png"
              alt={tc('logoAlt')}
              width={2270}
              height={668}
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 240px"
              className="h-auto w-full max-w-[240px] sm:max-w-xs lg:max-w-sm"
            />
          </FadeUp>

          <ul className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            {acronym.map(({ id, first, rest }, idx) => (
              <FadeUp
                key={id}
                as="li"
                delay={0.15 + idx * 0.07}
                className="grid grid-cols-1 gap-y-1 text-center lg:grid-cols-[minmax(0,auto),minmax(0,1fr)] lg:items-center lg:gap-x-12 lg:text-left"
              >
                <span className="text-h1 font-bold leading-tight tracking-tight">
                  <span className="text-blue-300">{first}</span>
                  <span className="text-white">{rest}</span>
                </span>
                <span className="break-keep text-body leading-relaxed text-gray-300">
                  {t(`items.${id}`)}
                </span>
              </FadeUp>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
