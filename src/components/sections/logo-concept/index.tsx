import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { FadeUp } from '@/components/ui/fade-up';
import { WaveBackground } from '@/components/decor/wave-background';

const keyVisualItems = ['wordmark', 'flow', 'color'] as const;

const palette = [
  { hex: '#002D56' },
  { hex: '#154974' },
  { hex: '#4B8CBC' },
] as const;

function LogoArtwork({ alt }: { alt: string }) {
  return (
    <div
      className="relative inline-block px-8 py-10 lg:px-10 lg:py-12"
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--color-gray-200) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-gray-200) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    >
      <Image
        src="/images/logo/aeris-logo-navy.png"
        alt={alt}
        width={2270}
        height={668}
        sizes="(min-width: 1024px) 260px, 220px"
        className="h-auto w-[220px] lg:w-[260px]"
      />
    </div>
  );
}

function ColorSwatchBar() {
  return (
    <div className="mt-3 flex overflow-hidden rounded-md">
      {palette.map(({ hex }) => (
        <div
          key={hex}
          style={{ backgroundColor: hex }}
          className="flex h-10 flex-1 items-center justify-center"
        >
          <span className="text-small font-medium tracking-wider text-white">
            {hex}
          </span>
        </div>
      ))}
    </div>
  );
}

export function LogoConceptSection() {
  const t = useTranslations('logoConcept');
  const tkv = useTranslations('keyVisual');
  const tc = useTranslations('common');

  return (
    <Section
      background="white"
      id="logo-concept"
      className="relative overflow-hidden"
    >
      <WaveBackground fullBleed />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[2fr_3fr] md:gap-14 lg:gap-20">
          {/* Left — Logo Artwork */}
          <FadeUp
            delay={0}
            className="md:sticky md:top-[calc(var(--header-h)+var(--space-6))]"
          >
            <LogoArtwork alt={tc('logoAlt')} />
          </FadeUp>

          {/* Right — Content blocks */}
          <div>
            <FadeUp delay={0.1}>
              <section>
                <h2 className="text-h3 font-bold uppercase tracking-wider text-navy-900">
                  {t('title')}
                </h2>
                <p className="mt-4 whitespace-pre-line text-body leading-relaxed text-gray-700">
                  {t('body')}
                </p>
              </section>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-12 lg:mt-16">
              <section>
                <h2 className="text-h3 font-bold uppercase tracking-wider text-navy-900">
                  {tkv('title')}
                </h2>

                <ul className="mt-6 space-y-6 lg:space-y-8">
                  {keyVisualItems.map((id) => (
                    <li key={id}>
                      <h3 className="text-body font-bold text-blue-500">
                        {tkv(`items.${id}.title`)}
                      </h3>
                      {id === 'color' && <ColorSwatchBar />}
                      <p className="mt-2 text-small leading-relaxed text-gray-700">
                        {tkv(`items.${id}.body`)}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}
