# Phase 05 — Polish

> **목표:** 사용자 경험 디테일·접근성·SEO·성능 마감.
> **선행:** Phase 4 / **후행:** Phase 6

---

## 1. 스크롤 등장 애니메이션 (절제)

원칙: 페이드 + 살짝 위로 이동. 그 외 금지.

### 옵션 A — `framer-motion` (권장)
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  {children}
</motion.div>
```

### 옵션 B — CSS only (`@starting-style` + `IntersectionObserver`)
프레임워크 의존성 줄이려면.

### 적용 대상
- 섹션 헤드라인·헤더 블록
- 카드 그리드 (stagger 50ms)
- ⛔ Hero 는 즉시 노출 (LCP 보호)

---

## 2. 인터랙션 디테일

- **버튼 호버:** 배경색 darken + transition 200ms
- **링크 호버:** underline 또는 color shift
- **포커스 링:** 모든 인터랙티브 요소에 `focus-visible:ring-2 ring-blue-500 ring-offset-2`
- **scroll-padding-top** — sticky 헤더 가림 방지:
  ```css
  html { scroll-padding-top: 80px; }
  ```

---

## 3. 접근성 (WCAG AA)

### 체크리스트
- [ ] 모든 이미지 `alt` 속성 (장식 이미지는 `alt=""`)
- [ ] 모든 인터랙티브 요소 키보드 접근 가능
- [ ] focus ring 명확히 보임 (2.5:1 대비)
- [ ] 텍스트·배경 대비 4.5:1 (Normal), 3:1 (Large)
  - **주의:** Hero 의 navy 배경 위 회색 본문 텍스트는 라이트 톤으로 조정 필요할 수 있음
- [ ] 헤딩 위계 정상 (h1 → h2 → h3, 건너뛰기 없음)
- [ ] 폼 레이블 모두 `<label>` 또는 `aria-label`
- [ ] 에러 메시지 `aria-describedby` 또는 `role="alert"`
- [ ] 모달·아코디언 `aria-expanded`, `aria-controls`
- [ ] 스크린리더 전용 텍스트 `sr-only` 클래스로 보강

### 도구
- Lighthouse 접근성 점수
- axe DevTools 브라우저 확장
- 키보드만으로 전체 페이지 통과 테스트

---

## 4. SEO

### 페이지 메타
Phase 3 에서 기본 작업 완료. 추가:
- `<link rel="canonical" href="..." />` 자동 생성 (Next.js)
- `<link rel="alternate" hreflang="ko" />`, `hreflang="en"`
- `robots.txt`, `sitemap.xml` (`next-sitemap` 패키지)

### JSON-LD
`src/app/[locale]/layout.tsx` 또는 page 에 주입:

```tsx
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AERIS',
  alternateName: '에리스',
  url: 'https://aeris.example.com',
  logo: 'https://aeris.example.com/logo/aeris-color.svg',
  parentOrganization: { '@type': 'Organization', name: '코리잡' },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+82-...',
    contactType: 'sales',
    areaServed: 'KR',
    availableLanguage: ['Korean', 'English'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};
```

`<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }} />`

---

## 5. 성능 — Lighthouse 90+

### LCP < 2.5s
- Hero 키 비주얼에 `priority` + `sizes` 정확
- Pretendard self-host + `next/font` 로 전환
- 외부 스크립트 최소화 (분석은 lazy)

### CLS < 0.1
- 모든 이미지에 `width`/`height` 또는 `aspect-ratio`
- 폰트 swap 시 폴백 차이 최소화 (`font-display: swap` + `size-adjust`)
- 광고·임베드 영역 사전 예약

### TBT 최소화
- 클라이언트 컴포넌트 최소화
- `framer-motion` 만 dynamic import
- 이미지 lazy (Hero 외)

### 번들 사이즈
- 사용 안 하는 lucide 아이콘은 import 시 named import 만 (트리쉐이킹)
- `pnpm add -D @next/bundle-analyzer` 로 측정

---

## 6. 자체 호스팅 폰트 (Pretendard)

Phase 0 의 CDN 방식에서 self-host 로 전환:

```bash
pnpm add pretendard
```

또는 `next/font/local` 로 `.woff2` 파일 임포트.

이유: LCP 개선 + 외부 의존성 제거.

---

## 7. PWA (옵션)

홍보 페이지엔 PWA 가 과한 경우가 많음. 제외 권장.
필요 시 `next-pwa` 사용.

---

## 8. 분석 도구 셋업 준비 (실제 키 주입은 Phase 6)

### GA4
```tsx
import Script from 'next/script';

<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
<Script id="ga" strategy="afterInteractive">
  {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
    gtag('js',new Date());gtag('config','${GA_ID}');`}
</Script>
```

### 이벤트 트래킹
- CTA 클릭 (Hero·Header·Solutions)
- 폼 제출 시작·완료·실패
- 솔루션 탭 전환
- FAQ 펼침

---

## 9. Cookie / PIPA 동의 배너

한국 PIPA 대응:
- 첫 방문 시 하단 고정 배너
- "필수만 / 모두 허용" 옵션
- 분석 쿠키는 동의 전 미발사

라이브러리: `react-cookie-consent` 또는 자체 구현.

---

## ✅ DoD

- [ ] Lighthouse 4개 카테고리 모두 90+ (모바일 기준)
- [ ] axe DevTools 에러 0건
- [ ] 키보드만으로 전체 페이지 통과 가능
- [ ] 모든 이미지 lazy + WebP/AVIF
- [ ] Pretendard self-host 적용
- [ ] JSON-LD (Organization + FAQPage) 주입
- [ ] sitemap.xml, robots.txt 생성
- [ ] hreflang 한·영 정확
- [ ] CLS 0.1 이하
- [ ] Cookie 동의 배너 동작

---

## 다음 단계

→ [`06-launch.md`](./06-launch.md)
