import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { FadeUp } from '@/components/ui/fade-up';
import { Wavy } from '@/components/decor/wavy';

const keyVisualItems = ['wordmark', 'flow', 'color'] as const;

const palette = [
  { hex: '#002D56', shadow: '#001a33' },
  { hex: '#154974', shadow: '#0a2b46' },
  { hex: '#4B8CBC', shadow: '#2e6791' },
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
    <div className="group mb-8 mt-4 [perspective:900px]">
      <div
        className="flex animate-swatch-float transition-transform duration-700 ease-out group-hover:[animation-play-state:paused] group-hover:[transform:rotateX(6deg)_rotateY(-10deg)_translateY(-6px)]"
        style={{ transformOrigin: 'center center' }}
      >
        {palette.map(({ hex, shadow }, i) => {
          const extrusion = Array.from({ length: 8 }, (_, d) => `0 ${d + 1}px 0 ${shadow}`).join(', ');
          return (
            <div
              key={hex}
              style={{
                backgroundColor: hex,
                boxShadow: `inset 0 2px 0 rgba(255, 255, 255, 0.18), ${extrusion}, 0 14px 20px -4px rgba(0, 20, 40, 0.3)`,
                transitionDelay: `${i * 60}ms`,
              }}
              className={`flex h-12 flex-1 items-center justify-center transition-transform duration-500 ease-out group-hover:-translate-y-1 ${
                i === 0 ? 'rounded-l-md' : ''
              } ${i === palette.length - 1 ? 'rounded-r-md' : ''}`}
            >
              <span className="text-small font-medium tracking-wider text-white">
                {hex}
              </span>
            </div>
          );
        })}
      </div>
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
      <Wavy fullBleed />
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
