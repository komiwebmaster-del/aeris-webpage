import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Accordion } from '@/components/ui/accordion';

const questionIds = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

export function FaqSection() {
  const t = useTranslations('faq');

  const items = questionIds.map((id) => ({
    question: t(`items.${id}.question`),
    answer: t(`items.${id}.answer`),
  }));

  return (
    <Section background="white" id="faq">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-24">
          {/* Left — Headline */}
          <div className="flex items-start gap-4 lg:w-64 lg:shrink-0">
            <div className="h-full min-h-[2rem] w-1 rounded-full bg-navy-900" />
            <h2 className="text-h1 font-bold text-navy-900">{t('headline')}</h2>
          </div>

          {/* Right — Accordion */}
          <div className="flex-1">
            <Accordion items={items} mode="multiple" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
