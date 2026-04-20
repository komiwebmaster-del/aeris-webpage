import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

// ImageResponse(satori) 는 CSS 변수/Tailwind 미지원이라 HEX 리터럴 사용.
// 값은 src/styles/globals.css 의 디자인 토큰과 동기화 유지할 것.
const COLOR = {
  navy950: '#0A1738',
  navy900: '#0E1F45',
  blue300: '#8FB8DD',
  blue100: '#DCE9F4',
  white: '#FFFFFF',
} as const;

export const alt = 'AERIS — Air, Engineered.';
export const size = { width: 1200, height: 630 } as const;
export const contentType = 'image/png';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = (routing.locales as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '72px 88px',
          background: `linear-gradient(135deg, ${COLOR.navy950} 0%, ${COLOR.navy900} 100%)`,
          color: COLOR.white,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 24,
            letterSpacing: 4,
            color: COLOR.blue300,
            textTransform: 'uppercase',
          }}
        >
          <span>{t('ogBadge')}</span>
          <span>{locale === 'ko' ? 'HVAC 통합 솔루션' : 'Integrated HVAC'}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 148,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            AERIS
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: COLOR.blue300,
              letterSpacing: -1,
            }}
          >
            Air, Engineered.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              maxWidth: 980,
              color: COLOR.blue100,
            }}
          >
            {t('ogTagline')}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 22,
            color: COLOR.blue300,
            letterSpacing: 2,
          }}
        >
          <span>SHAT</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>DRDH</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>RADM</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>ARMS</span>
        </div>
      </div>
    ),
    size,
  );
}
