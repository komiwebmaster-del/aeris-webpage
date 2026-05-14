import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FadeUp } from '@/components/ui/fade-up';
import { Wavy } from '@/components/decor/wavy';

const valueIds = ['engineered', 'clean', 'quiet', 'reliable', 'premium'] as const;

export function BrandCoreSection() {
  const t = useTranslations('brandCore');

  return (
    <Section background="white" id="brand-core" className="relative overflow-hidden">
      <Wavy fullBleed />
      <Container className="relative z-10">
        <FadeUp delay={0}>
          <Eyebrow className="[&>span:last-child]:normal-case">{t('eyebrow')}</Eyebrow>
        </FadeUp>

        {/* Top: headline left + 3D house image right */}
        <div className="mt-10 grid grid-cols-1 items-center gap-8 md:mt-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp delay={0.1}>
            <h2 className="break-keep text-display font-bold leading-tight text-navy-900">
              {t('headline').split('\n').map((line, idx) => (
                <span key={idx} className="block">
                  {line.split('Luvair').map((chunk, i, arr) => (
                    <span key={i}>
                      {chunk}
                      {i < arr.length - 1 && (
                        <span className="text-blue-500">Luvair</span>
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </FadeUp>

          <FadeUp delay={0.18} className="relative aspect-[4/3] w-full">
            <Image
              src="/images/3d-house.png"
              alt={t('visualAlt')}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </FadeUp>
        </div>

        {/* 5-value flat card row */}
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:mt-16 lg:grid-cols-5">
          {valueIds.map((id, idx) => (
            <FadeUp
              key={id}
              as="li"
              delay={0.1 + idx * 0.07}
              className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6"
            >
              <span className="text-h1 font-light leading-none text-blue-400">
                {idx + 1}
              </span>
              <p className="mt-3 text-h3 font-bold text-navy-900">
                {t(`values.${id}.ko`)}
              </p>
              <p className="text-small text-gray-500">
                {t(`values.${id}.en`)}
              </p>
              <p className="mt-4 text-small leading-relaxed text-gray-600">
                {t(`values.${id}.desc`)}
              </p>
            </FadeUp>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
