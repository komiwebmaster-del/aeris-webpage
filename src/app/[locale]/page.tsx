import { BrandConceptSection } from '@/components/sections/brand-concept';
import { BrandCoreSection } from '@/components/sections/brand-core';
import { BrandOverviewSection } from '@/components/sections/brand-overview';
import { HeaderSection } from '@/components/sections/header';
import { HeroSection } from '@/components/sections/hero';
import { LogoConceptSection } from '@/components/sections/logo-concept';
import { WhySection } from '@/components/sections/why';
 
 
import { FooterSection } from '@/components/sections/footer';
import { ContactSection } from '../../components/sections/contact';
import { SolutionsSection } from '../../components/sections/solutions';

export default function HomePage() {
  return (
    <>
      <HeaderSection />
      <main>
        <HeroSection />
        <BrandOverviewSection />
        <BrandCoreSection />
        <BrandConceptSection />
        <LogoConceptSection />
        <WhySection />
        <SolutionsSection />
        <ContactSection />
        {/* 2026-04-20: 레이아웃 개정으로 임시 비활성화 — 복구 시 주석 해제
        <UseCasesSection />
        <ProcessSection />
        <FaqSection />
        */}
      </main>
      <FooterSection />
    </>
  );
}
