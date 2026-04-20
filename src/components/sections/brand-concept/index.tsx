import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';

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
        <Eyebrow className="text-blue-300 [&>span:last-child]:text-blue-300">
          {t('eyebrow')}
        </Eyebrow>

        <div className="mt-12 grid grid-cols-1 items-center gap-16 lg:mt-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex items-center justify-center">
            <Image
              src="/images/logo/aeris-logo-white.png"
              alt={tc('logoAlt')}
              width={2270}
              height={668}
              className="h-auto w-full max-w-xs lg:max-w-sm"
            />
          </div>

          <ul className="flex flex-col gap-6 lg:gap-8">
            {acronym.map(({ id, first, rest }) => (
              <li
                key={id}
                className="grid grid-cols-1 gap-1 md:grid-cols-[minmax(0,auto),minmax(0,1fr)] md:items-baseline md:gap-12"
              >
                <span className="text-h1 font-bold leading-tight tracking-tight">
                  <span className="text-blue-300">{first}</span>
                  <span className="text-white">{rest}</span>
                </span>
                <span className="text-body leading-relaxed text-gray-300">
                  {t(`items.${id}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
