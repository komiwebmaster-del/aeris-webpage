'use client';

import { useState } from 'react';
import { ArrowRight, Wind, Droplets, Shield, Volume2 } from 'lucide-react';

import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form-field';
import { Checkbox } from '@/components/ui/checkbox';
import { Tab } from '@/components/ui/tab';
import { Accordion } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Carousel } from '@/components/ui/carousel';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';

const faqItems = [
  {
    question: 'AERIS 솔루션은 어떤 공간에 적용할 수 있나요?',
    answer:
      '주거(발코니, 욕실, 드레스룸), 상업 시설, 오피스 등 다양한 실내 공간에 적용 가능합니다. 공간 특성에 맞춘 맞춤형 설계를 제공합니다.',
  },
  {
    question: 'SHAT 시스템의 에너지 효율은 어떤가요?',
    answer:
      '환기율 향상 85% 이상으로 에너지 손실을 최소화합니다. PM2.5 센서 내장으로 실시간 공기질 측정 및 자동 제어가 가능합니다.',
  },
  {
    question: '설치 후 유지보수는 어떻게 되나요?',
    answer:
      'BMS 및 앱 연동을 통한 원격 모니터링과 스케줄 운영이 가능하며, 정기 점검 프로그램을 제공합니다.',
    defaultOpen: true,
  },
];

const tabItems = [
  { value: 'shat', label: 'SHAT' },
  { value: 'drdh', label: 'DRDH' },
  { value: 'radm', label: 'RADM' },
  { value: 'arms', label: 'ARMS' },
];

const placeholderImages = [
  { src: '/images/placeholder-shat.svg', alt: 'SHAT 통합 공조 시스템' },
  { src: '/images/placeholder-drdh.svg', alt: 'DRDH 빌트인 제습' },
  { src: '/images/placeholder-radm.svg', alt: 'RADM 창문형 모듈' },
];

export default function DevPage() {
  const [activeTab, setActiveTab] = useState('shat');

  return (
    <main>
      {/* Header bar */}
      <Section background="white" className="border-b border-gray-200 !py-4">
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="text-h2 font-bold text-navy-900">
              AERIS Dev — Component Library
            </h1>
            <LocaleSwitcher />
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section background="white">
        <Container>
          <Eyebrow>Buttons</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">Button</h2>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-small font-medium text-gray-500">
                Variants
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">지금 문의하기</Button>
                <Button variant="secondary">자세히 보기</Button>
                <Button variant="outline">다운로드</Button>
                <Button variant="ghost" iconRight={<ArrowRight className="h-4 w-4" />}>
                  솔루션 보기
                </Button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-small font-medium text-gray-500">
                Sizes
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-small font-medium text-gray-500">
                States
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button iconLeft={<Wind className="h-4 w-4" />}>
                  With Icon
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Badge */}
      <Section background="gray">
        <Container>
          <Eyebrow>Badge / Tag</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">Badge</h2>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-small font-medium text-gray-500">
                Solid (Light BG)
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="solid">ENGINEERED</Badge>
                <Badge variant="solid">CLEAN</Badge>
                <Badge variant="solid">RELIABLE</Badge>
              </div>
            </div>

            <div>
              <p className="mb-3 text-small font-medium text-gray-500">
                Outline
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">환기</Badge>
                <Badge variant="outline">제습</Badge>
                <Badge variant="outline">정화</Badge>
                <Badge variant="outline">살균</Badge>
              </div>
            </div>

            <div className="rounded-md bg-navy-950 p-6">
              <p className="mb-3 text-small font-medium text-gray-300">
                Dark (Navy BG)
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="dark">ENGINEERED</Badge>
                <Badge variant="dark">CLEAN</Badge>
                <Badge variant="dark">RELIABLE</Badge>
              </div>
            </div>

            <div>
              <p className="mb-3 text-small font-medium text-gray-500">
                Size comparison
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Eyebrow */}
      <Section background="white">
        <Container>
          <Eyebrow>Eyebrow Label</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">Eyebrow</h2>

          <div className="mt-8 space-y-4">
            <Eyebrow>왜 AERIS인가?</Eyebrow>
            <Eyebrow>SOLUTIONS</Eyebrow>
            <Eyebrow>적용 사례</Eyebrow>
            <Eyebrow>PROCESS</Eyebrow>
          </div>
        </Container>
      </Section>

      {/* Card */}
      <Section background="gray">
        <Container>
          <Eyebrow>Card</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">Card</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card variant="bordered" padding="md">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <Droplets className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-h3 font-semibold text-navy-900">
                습도 관리 문제
              </h3>
              <p className="mt-2 text-body text-gray-700">
                발코니 결로, 욕실 곰팡이 등 습도 관련 문제가 반복됩니다.
              </p>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline" size="sm">습도 제어 필요</Badge>
              </div>
            </Card>

            <Card variant="bordered" padding="md">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <Shield className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-h3 font-semibold text-navy-900">
                공기질 저하
              </h3>
              <p className="mt-2 text-body text-gray-700">
                미세먼지, 유해 물질 등 실내 공기 품질이 떨어집니다.
              </p>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline" size="sm">정화 필요</Badge>
              </div>
            </Card>

            <Card variant="filled" padding="lg">
              <h3 className="text-h3 font-semibold text-navy-900">
                Filled Card (Large Padding)
              </h3>
              <p className="mt-2 text-body text-gray-700">
                배경이 채워진 카드 스타일입니다.
              </p>
            </Card>

            <Card variant="bordered" padding="sm">
              <h3 className="text-h3 font-semibold text-navy-900">
                Small Padding
              </h3>
              <p className="mt-2 text-small text-gray-700">
                작은 패딩의 카드입니다.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Tab */}
      <Section background="white">
        <Container>
          <Eyebrow>Tab</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">Tab</h2>

          <div className="mt-8">
            <Tab tabs={tabItems} value={activeTab} onChange={setActiveTab} />
            <div className="mt-6 rounded-md border border-gray-200 p-6">
              <p className="text-body text-gray-700">
                현재 선택된 탭: <strong className="text-navy-900">{activeTab.toUpperCase()}</strong>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Carousel */}
      <Section background="gray">
        <Container>
          <Eyebrow>Carousel</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">
            Image Carousel
          </h2>

          <div className="mt-8 max-w-[600px]">
            <Carousel images={placeholderImages} />
          </div>
        </Container>
      </Section>

      {/* Accordion */}
      <Section background="white">
        <Container size="narrow">
          <Eyebrow>Accordion</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">Accordion</h2>

          <div className="mt-8">
            <Accordion items={faqItems} mode="single" />
          </div>
        </Container>
      </Section>

      {/* Form Elements */}
      <Section background="gray">
        <Container size="narrow">
          <Eyebrow>Form Elements</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">
            Input / Textarea / FormField / Checkbox
          </h2>

          <div className="mt-8 space-y-6">
            <FormField label="이름" required>
              <Input placeholder="홍길동" />
            </FormField>

            <FormField label="이메일" required error="유효한 이메일 주소를 입력해주세요.">
              <Input type="email" placeholder="example@email.com" error="유효한 이메일 주소를 입력해주세요." />
            </FormField>

            <FormField label="연락처" hint="'-' 없이 입력해주세요.">
              <Input type="tel" placeholder="01012345678" />
            </FormField>

            <FormField label="문의 내용" required>
              <Textarea placeholder="문의 내용을 입력해주세요." />
            </FormField>

            <div className="space-y-3">
              <Checkbox label="개인정보 수집 및 이용에 동의합니다." />
              <Checkbox label="마케팅 정보 수신에 동의합니다. (선택)" />
              <Checkbox label="비활성 상태" disabled />
            </div>

            <Button variant="primary" className="w-full">
              문의하기
            </Button>
          </div>
        </Container>
      </Section>

      {/* Section Backgrounds */}
      <Section background="navy">
        <Container>
          <Eyebrow className="text-blue-300">Section Backgrounds</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-white">
            Navy Background
          </h2>
          <p className="mt-4 text-body text-gray-300">
            Hero 섹션 등에 사용되는 다크 배경입니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge variant="dark">ENGINEERED</Badge>
            <Badge variant="dark">CLEAN</Badge>
            <Badge variant="dark">RELIABLE</Badge>
          </div>
        </Container>
      </Section>

      <Section background="lightBlue">
        <Container>
          <Eyebrow>Section Backgrounds</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">
            Light Blue Background
          </h2>
          <p className="mt-4 text-body text-gray-700">
            Solutions 섹션 등에 사용되는 밝은 블루 배경입니다.
          </p>
        </Container>
      </Section>

      {/* Spec Bullet preview */}
      <Section background="white">
        <Container>
          <Eyebrow>Spec Bullet (Molecule)</Eyebrow>
          <h2 className="mt-3 text-h1 font-bold text-navy-900">
            SHAT 핵심 사양
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Wind, text: '환기율 향상 85% 이상', sub: '에너지 손실 최소화' },
              { icon: Shield, text: 'PM2.5 센서 내장', sub: '실시간 공기질 측정·자동 제어' },
              { icon: Droplets, text: 'BMS·앱 연동', sub: '원격 모니터링 및 스케줄 운영' },
              { icon: Volume2, text: '18 dB 정숙 운영', sub: '수면·집중 방해 없음' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-body font-medium text-navy-900">{text}</p>
                  <p className="text-small text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <Section background="white" className="border-t border-gray-200 !py-6">
        <Container>
          <p className="text-center text-small text-gray-500">
            AERIS Design System — Dev Preview
          </p>
        </Container>
      </Section>
    </main>
  );
}
