# Phase 00 — Setup

> **목표:** Next.js 15 프로젝트를 만들고, 디자인 토큰·i18n·폴더 구조까지 골격을 완성한다.
> **선행:** 없음 / **후행:** Phase 1

---

## 1. 사전 준비

```bash
node -v   # >= 20
pnpm -v   # >= 9
```

---

## 2. 프로젝트 생성

```bash
pnpm create next-app@latest aeris-promo \
  --ts --tailwind --app --eslint \
  --src-dir --import-alias "@/*"

cd aeris-promo
```

---

## 3. 추가 의존성 설치

```bash
# 핵심
pnpm add next-intl lucide-react clsx tailwind-merge

# 폼
pnpm add react-hook-form zod @hookform/resolvers

# 캐러셀 (Solutions 섹션)
pnpm add embla-carousel-react

# 애니메이션 (Phase 5)
pnpm add framer-motion

# 개발 도구
pnpm add -D prettier prettier-plugin-tailwindcss @types/node
```

---

## 4. 폴더 구조 생성

`CLAUDE.md` 의 §5 디렉토리 구조를 그대로 따른다. 빈 폴더 생성:

```bash
mkdir -p src/components/{ui,sections,layout}
mkdir -p src/lib/validators
mkdir -p src/content/{ko,en}
mkdir -p src/styles
mkdir -p messages
```

---

## 5. 디자인 토큰 정의

### `src/styles/globals.css`

`docs/03-design-system.md` 의 모든 CSS 변수를 그대로 옮겨 적는다. 구조:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* === Color === */
    --color-navy-950: #0A1738;   /* TODO: 디자이너 확정 */
    --color-navy-900: #0E1F45;
    /* ...전체 색상 토큰... */

    /* === Typography === */
    --font-sans: 'Pretendard Variable', 'Pretendard', -apple-system, system-ui, sans-serif;
    /* ...전체 타이포 토큰... */

    /* === Spacing === */
    --space-1: 4px;
    /* ...전체 spacing... */

    /* === Layout === */
    --container-max: 1200px;
    /* ... */

    /* === Radius === */
    /* === Shadow === */
    /* === Motion === */
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-sans);
    color: var(--color-gray-900);
    background: var(--color-white);
    -webkit-font-smoothing: antialiased;
  }
}
```

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: 'var(--color-navy-950)',
          900: 'var(--color-navy-900)',
          // ...
        },
        brand: {
          primary: 'var(--color-blue-600)',
          accent: 'var(--color-blue-500)',
          surface: 'var(--color-blue-100)',
        },
        // ...
      },
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
    },
  },
} satisfies Config;
```

---

## 6. Pretendard 폰트 로드

`src/app/[locale]/layout.tsx` 에서 CDN 또는 self-host. CDN 간단 버전:

```tsx
import './globals.css';

export default function RootLayout({
  children,
  params: { locale },
}: { children: React.ReactNode; params: { locale: string } }) {
  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

> Phase 5 에서 self-host + `next/font` 로 전환 (성능 최적화).

---

## 7. next-intl 셋업

### 라우트 구조
```
src/app/
├── [locale]/
│   ├── layout.tsx
│   └── page.tsx
└── api/
```

### `src/i18n.ts`
```ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['ko', 'en'] as const;
export const defaultLocale = 'ko';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  return { messages: (await import(`../messages/${locale}.json`)).default };
});
```

### `middleware.ts`
```ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({ locales, defaultLocale });

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
```

### `messages/ko.json`, `messages/en.json`
초기엔 빈 객체로 시작:
```json
{}
```

---

## 8. 유틸리티 — `cn()`

`src/lib/cn.ts`:
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

---

## 9. 빈 page.tsx 골격

`src/app/[locale]/page.tsx`:
```tsx
export default function HomePage() {
  return (
    <main>
      {/* sections will be added in Phase 2 */}
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold text-navy-900">AERIS</h1>
        <p className="mt-4 text-gray-600">Air, Engineered.</p>
      </div>
    </main>
  );
}
```

---

## 10. 검증

```bash
pnpm dev
```

- [ ] `http://localhost:3000/ko` 접근 시 "AERIS" 표시
- [ ] `http://localhost:3000/en` 접근 가능
- [ ] Pretendard 폰트 적용 확인 (개발자 도구)
- [ ] CSS 변수가 `:root` 에 정의됨 (개발자 도구)

---

## ✅ Definition of Done

- [ ] 프로젝트 생성·의존성 설치 완료
- [ ] 폴더 구조가 `CLAUDE.md` §5 와 정확히 일치
- [ ] `globals.css` 에 모든 토큰 변수 정의 (TODO 주석으로 미확정 값 표시)
- [ ] `tailwind.config.ts` 매핑 완료
- [ ] next-intl 셋업, 한/영 라우트 동작
- [ ] 빈 페이지 정상 렌더 + Pretendard 적용
- [ ] `pnpm build` 무에러
- [ ] git init + 첫 커밋

---

## 다음 단계

→ [`01-design-system.md`](./01-design-system.md) 으로 이동, UI 컴포넌트 구현 시작.
