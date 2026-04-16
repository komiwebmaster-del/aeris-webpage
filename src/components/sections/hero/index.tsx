'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const t = useTranslations('hero');

  const tags = [
    t('tags.engineered'),
    t('tags.clean'),
    t('tags.reliable'),
  ] as const;

  return (
    <Section background="navy" id="hero" className="pt-[calc(64px+var(--section-py-mobile))] lg:pt-[calc(72px+var(--section-py-desktop))]">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Text — Left */}
          <div className="flex flex-col items-start gap-6 lg:flex-1">
            <Eyebrow className="text-blue-300 [&>span:last-child]:text-blue-300">
              {t('eyebrow')}
            </Eyebrow>

            <h1 className="whitespace-pre-line text-display font-bold text-white">
              {t('headline')}
            </h1>

            <p className="max-w-md text-body text-gray-300">
              {t('description')}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="dark">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
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
            </div>
          </div>

          {/* Image — Right */}
          <div className="lg:flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-navy-800 lg:aspect-square">
              {/* Placeholder until hero image asset received */}
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-caption font-medium uppercase tracking-wider text-blue-300">
                  Hero Image — 에셋 수령 예정
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
