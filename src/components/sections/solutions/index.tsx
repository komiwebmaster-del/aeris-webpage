'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FadeUp } from '@/components/ui/fade-up';
import { Tab } from '@/components/ui/tab';
import { Carousel } from '@/components/ui/carousel';

const solutionIds = ['drdh', 'shat', 'radm', 'arms'] as const;
type SolutionId = (typeof solutionIds)[number];

type Metric = { label: string; value: string };
type ProductImage = { src: string; alt: string };

export function SolutionsSection() {
  const t = useTranslations('solutions');
  const [activeTab, setActiveTab] = useState<SolutionId>('drdh');

  const tabs = solutionIds.map((id) => ({
    value: id,
    label: t(`tabs.${id}`),
  }));

  const features = t.raw(`${activeTab}.features`) as string[];
  const characteristics = t.raw(`${activeTab}.characteristics`) as string[];
  const metrics = t.raw(`${activeTab}.metrics`) as Metric[];
  const images = t.raw(`${activeTab}.images`) as ProductImage[];

  return (
    <Section background="lightBlue" id="solutions">
      <Container>
        <FadeUp delay={0} className="mb-10 lg:mb-12">
          <div className="space-y-3">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="whitespace-pre-line text-h1 font-bold text-navy-900">
              {t('headline')}
            </h2>
          </div>
        </FadeUp>

        <FadeUp
          delay={0.1}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:p-10"
        >
          <Tab
            tabs={tabs}
            value={activeTab}
            onChange={(v) => setActiveTab(v as SolutionId)}
          />

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            <div className="flex items-center">
              <Carousel key={activeTab} images={images} className="w-full" />
            </div>

            <div className="flex flex-col">
              <div className="border-l-4 border-blue-500 pl-3">
                <h3 className="text-h2 font-bold text-navy-900">
                  {t(`${activeTab}.title`)}
                </h3>
              </div>

              <p className="mt-4 text-body leading-relaxed text-gray-700">
                {t.rich(`${activeTab}.description`, {
                  em: (chunks) => (
                    <strong className="font-bold text-blue-500">{chunks}</strong>
                  ),
                })}
              </p>

              <div className="mt-8 flex flex-col gap-6 md:flex-row md:gap-10">
                <div className="md:shrink-0">
                  <div className="mb-2 text-body font-bold text-navy-900">
                    {t('groupLabels.features')}
                  </div>
                  <ul className="space-y-1 text-small text-gray-700">
                    {features.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1">
                  <div className="mb-2 text-body font-bold text-navy-900">
                    {t('groupLabels.characteristics')}
                  </div>
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-1 text-small text-gray-700 sm:grid-cols-2">
                    {characteristics.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {metrics.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-gray-200 bg-white px-4 py-1.5 text-small text-gray-700"
                  >
                    {m.label}
                    <strong className="font-bold text-blue-500">{m.value}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
