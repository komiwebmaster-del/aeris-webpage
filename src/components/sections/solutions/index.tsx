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
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-10 lg:p-12"
        >
          <Tab
            tabs={tabs}
            value={activeTab}
            onChange={(v) => setActiveTab(v as SolutionId)}
          />

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-2 lg:gap-12">
            <div className="flex items-center">
              <Carousel key={activeTab} images={images} className="w-full" />
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="border-l-4 border-blue-500 pl-3">
                <h3 className="break-keep text-h2 font-bold text-navy-900">
                  {t(`${activeTab}.title`)}
                </h3>
              </div>

              <p className="break-keep mt-4 text-body leading-relaxed text-gray-700">
                {t.rich(`${activeTab}.description`, {
                  em: (chunks) => (
                    <strong className="font-bold text-blue-500">{chunks}</strong>
                  ),
                })}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:mt-8 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-5 md:p-6">
                  <div className="mb-3 text-body font-bold text-blue-600">
                    {t('groupLabels.features')}
                  </div>
                  <ul className="space-y-2 text-small text-gray-700">
                    {features.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span aria-hidden="true">•</span>
                        <span className="break-keep">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-blue-50 p-5 md:p-6">
                  <div className="mb-3 text-body font-bold text-blue-600">
                    {t('groupLabels.characteristics')}
                  </div>
                  <ul className="space-y-2 text-small text-gray-700">
                    {characteristics.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span aria-hidden="true">•</span>
                        <span className="break-keep">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 md:mt-8 md:justify-end">
                {metrics.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-pill bg-blue-50 px-4 py-1.5 text-small text-gray-700"
                  >
                    {m.label}
                    <strong className="font-bold text-blue-600">{m.value}</strong>
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
