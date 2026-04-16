import { HeaderSection } from '@/components/sections/header';
import { HeroSection } from '@/components/sections/hero';
import { WhySection } from '@/components/sections/why';
import { SolutionsSection } from '@/components/sections/solutions';
import { UseCasesSection } from '@/components/sections/use-cases';
import { ProcessSection } from '@/components/sections/process';
import { FaqSection } from '@/components/sections/faq';
import { ContactSection } from '@/components/sections/contact';
import { FooterSection } from '@/components/sections/footer';

export default function HomePage() {
  return (
    <>
      <HeaderSection />
      <main>
        <HeroSection />
        <WhySection />
        <SolutionsSection />
        <UseCasesSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
