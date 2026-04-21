'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FadeUp } from '@/components/ui/fade-up';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');

  const tags = [
    t('tags.engineered'),
    t('tags.clean'),
    t('tags.reliable'),
  ] as const;

  return (
    <Section
      background="navy"
      id="hero"
      className="relative overflow-hidden pt-[calc(var(--header-h)+var(--section-py-mobile))] md:pt-[calc(var(--header-h)+var(--section-py-md))] lg:pt-[calc(var(--header-h)+var(--section-py-desktop))]"
    >
      <Image
        src="/images/visual/visual-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 select-none object-cover opacity-20 mix-blend-screen"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-navy-950/40 via-transparent to-navy-950/80"
      />
      <Container className="relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Text — Left */}
          <div className="flex flex-col items-start gap-6 lg:flex-1">
            <FadeUp delay={0}>
              <Eyebrow className="text-blue-300 [&>span:last-child]:text-blue-300">
                {t('eyebrow')}
              </Eyebrow>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1 className="whitespace-pre-line break-keep text-display font-bold text-white max-w-[min(100%,640px)]">
                {t('headline')}
              </h1>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="break-keep text-body-lg text-gray-300 max-w-[min(90vw,560px)]">
                {t('description')}
              </p>
            </FadeUp>

            {/* Tags */}
            <FadeUp delay={0.22} className="flex flex-wrap gap-2 min-w-0">
              {tags.map((tag) => (
                <Badge key={tag} variant="dark">
                  {tag}
                </Badge>
              ))}
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.28} className="flex flex-wrap gap-x-3 gap-y-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('ctaPrimary')}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                iconRight={<ArrowRight className="h-4 w-4" />}
                className="text-white hover:text-blue-300"
                onClick={() => {
                  document
                    .getElementById('solutions')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('ctaSecondary')}
              </Button>
            </FadeUp>
          </div>

          {/* Image — Right */}
          {/* <div className="lg:flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-navy-800 lg:aspect-square">
              Placeholder until hero image asset received
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-caption font-medium uppercase tracking-wider text-blue-300">
                  Hero Image — 에셋 수령 예정
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </Container>
    </Section>
  );
}
