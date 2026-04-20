'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Wind, Shield, Droplets, Volume2 } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FadeUp } from '@/components/ui/fade-up';
import { Tab } from '@/components/ui/tab';
import { Carousel } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const solutionIds = ['shat', 'drdh', 'radm', 'arms'] as const;
type SolutionId = (typeof solutionIds)[number];

const specIcons = [Wind, Shield, Droplets, Volume2];

const placeholderImages = [
  { src: '/images/placeholder-shat.svg', alt: 'Solution image 1' },
  { src: '/images/placeholder-drdh.svg', alt: 'Solution image 2' },
  { src: '/images/placeholder-radm.svg', alt: 'Solution image 3' },
];

export function SolutionsSection() {
  const t = useTranslations('solutions');
  const [activeTab, setActiveTab] = useState<SolutionId>('shat');

  const tabs = solutionIds.map((id) => ({
    value: id,
    label: t(`tabs.${id}`),
  }));

  const specs = t.raw(`${activeTab}.specs`) as string[];

  return (
    <Section background="lightBlue" id="solutions">
      <Container>
        {/* Section Header */}
        <FadeUp delay={0} className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="whitespace-pre-line text-h1 font-bold text-navy-900">
              {t('headline')}
            </h2>
          </div>
        </FadeUp>

        {/* Tabs */}
        <FadeUp delay={0.1}>
          <Tab
            tabs={tabs}
            value={activeTab}
            onChange={(v) => setActiveTab(v as SolutionId)}
            className="mb-8 rounded-t-md bg-white/60"
          />
        </FadeUp>

        {/* Content panel */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-8 lg:gap-12">
          {/* Carousel */}
          <div className="lg:flex-1">
            <Carousel images={placeholderImages} />
          </div>

          {/* Spec panel */}
          <div className="flex flex-col justify-center lg:flex-1">
            {/* Left navy bar */}
            <div className="border-l-4 border-navy-900 pl-4">
              <h3 className="text-h2 font-bold text-navy-900">
                {t(`${activeTab}.title`)}
              </h3>
            </div>

            <p className="mt-4 text-body text-gray-700">
              {t(`${activeTab}.description`)}
            </p>

            {/* Specs */}
            <ul className="mt-6 space-y-3">
              {specs.map((spec, i) => {
                const Icon = specIcons[i % specIcons.length];
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-blue-600">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <span className="text-small text-gray-700">{spec}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <Button
                variant="ghost"
                iconRight={<ArrowRight className="h-4 w-4" />}
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {t(`${activeTab}.cta`)}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
