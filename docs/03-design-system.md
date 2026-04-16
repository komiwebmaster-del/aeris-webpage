# 03. Design System

> 시안(모바일/데스크탑) 기반으로 작성. **컬러 HEX·폰트·정확한 수치는 디자이너 확정 필요** (TODO 표시).
> 모든 컴포넌트·페이지 구현은 본 문서에 정의된 **CSS 변수 토큰**만을 사용.

---

## 1. Color Tokens

### Primary — Navy
> ⚠️ 시안 픽셀에서 추정한 값. 디자이너 확정 필요.
```css
--color-navy-950: #0A1738;   /* TODO: confirm — Hero 배경 */
--color-navy-900: #0E1F45;   /* TODO: confirm — 헤드라인·핵심 텍스트 */
--color-navy-800: #182952;
--color-navy-700: #2A3A6B;
```

### Accent — Blue
```css
--color-blue-600: #2E6FB8;   /* TODO: confirm — Primary CTA 배경 */
--color-blue-500: #4A8AC4;   /* 강조 텍스트, 링크 */
--color-blue-300: #8FB8DD;
--color-blue-100: #DCE9F4;   /* TODO: confirm — SOLUTIONS 섹션 배경 */
--color-blue-50:  #EEF4FA;   /* 태그 배경 */
```

### Neutral
```css
--color-gray-900: #1A1F2E;   /* 본문 텍스트 (메인) */
--color-gray-700: #4B5563;   /* 본문 텍스트 (보조) */
--color-gray-500: #6B7785;   /* 캡션·메타 */
--color-gray-300: #D1D7DE;   /* 보더 */
--color-gray-200: #E5E9EE;   /* 구분선 */
--color-gray-100: #F4F6F8;   /* 카드/섹션 배경 */
--color-gray-50:  #FAFBFC;
--color-white:    #FFFFFF;
```

### Semantic
```css
--color-success: #2E9E60;
--color-warning: #D89B2A;
--color-danger:  #C8344E;
```

### Tailwind 매핑 (예시)
`tailwind.config.ts` 의 `theme.extend.colors` 에서 위 변수들을 그대로 매핑:
```ts
navy: { 950: 'var(--color-navy-950)', ... }
brand: { primary: 'var(--color-blue-600)', ... }
```

---

## 2. Typography

### Font Family
> ⚠️ 시안 폰트 미확정. 한글 산세리프 — Pretendard 추정. 디자이너 확정 필요.
```css
--font-sans: 'Pretendard Variable', 'Pretendard', -apple-system, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'D2Coding', monospace;
```

### Type Scale (시안 추정)
> 시안에서 측정한 대략적 비율. 디자이너 확정 후 정확한 값 갱신 필요.
```css
/* Display — Hero 헤드라인 */
--text-display:    clamp(2rem, 5.5vw, 3.5rem);   /* mobile 32px → desktop 56px */
--leading-display: 1.25;
--tracking-display: -0.02em;

/* H1 — 섹션 메인 헤드라인 */
--text-h1:        clamp(1.75rem, 3.5vw, 2.25rem);
--leading-h1:     1.3;

/* H2 — 서브 헤드라인 */
--text-h2:        clamp(1.25rem, 2.5vw, 1.5rem);
--leading-h2:     1.4;

/* H3 — 카드 제목 */
--text-h3:        1.125rem;   /* 18px */
--leading-h3:     1.5;

/* Body */
--text-body:      1rem;       /* 16px */
--leading-body:   1.6;

/* Small */
--text-small:     0.875rem;   /* 14px */
--leading-small:  1.5;

/* Caption — Eyebrow 라벨 등 */
--text-caption:   0.75rem;    /* 12px */
--tracking-caption: 0.12em;   /* 대문자 라벨 */
```

### Weight
```css
--weight-regular:  400;
--weight-medium:   500;
--weight-semibold: 600;
--weight-bold:     700;   /* 헤드라인 */
```

---

## 3. Spacing Scale

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;     /* 섹션 사이 (모바일) */
--space-32: 128px;    /* 섹션 사이 (데스크탑) */
```

### Section Padding (시안 기준)
```css
--section-py-mobile:  var(--space-16);   /* 64px */
--section-py-desktop: var(--space-32);   /* 128px */
```

---

## 4. Layout

### Breakpoints (Tailwind 기본 + 1280)
```css
--bp-sm:  640px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1280px;     /* 데스크탑 시안 기준 */
--bp-2xl: 1536px;
```

### Container
```css
--container-max: 1200px;
--container-pad-mobile:  20px;
--container-pad-desktop: 80px;
```

### Grid
- **데스크탑:** Why 섹션 = 4컬럼 등분 / Solutions = 좌우 2컬럼 (40:60) / 적용 사례 = 비대칭 2x2
- **모바일:** Why = 2x2 / Solutions = 세로 스택 / 적용 사례 = 1x4 세로 스택

---

## 5. Radius

```css
--radius-sm:   4px;    /* 태그/배지 */
--radius-md:   8px;    /* 카드, 인풋 */
--radius-lg:   12px;   /* 큰 카드, 버튼 */
--radius-xl:   16px;
--radius-pill: 9999px; /* 라운드 버튼/태그 */
```

> 시안의 카드는 `--radius-md` 추정, 버튼은 `--radius-md`~`--radius-lg`. 확정 필요.

---

## 6. Elevation / Shadow

```css
--shadow-sm:  0 1px 2px rgba(14, 31, 69, 0.06);
--shadow-md:  0 4px 12px rgba(14, 31, 69, 0.08);
--shadow-lg:  0 12px 32px rgba(14, 31, 69, 0.12);
```

> 시안에서는 그림자가 거의 없음 — 보더 위주 디자인. 카드는 `--color-gray-300` 보더만 사용 권장.

---

## 7. Motion

```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 600ms;
```

**원칙:**
- 페이드·서브틀 슬라이드 외 금지
- 스크롤 등장 시 `opacity 0 → 1, translateY 16px → 0` 정도
- 호버: 색상·보더만 변화, 크기 변화 금지

---

## 8. Component Inventory (시안 기반 확정)

### 8.1 Atoms
- [ ] **Button** — Primary (Blue 배경), Secondary (Navy 배경), Ghost (보더만)
- [ ] **Badge / Tag (Pill)** — Light Blue 배경 + Navy 텍스트 (예: ENGINEERED, 환기)
- [ ] **Eyebrow Label** — `─ TEXT` 형태, 대문자 + tracking-wide
- [ ] **Input / Textarea** — 보더 라이트 그레이, focus 시 Blue
- [ ] **Checkbox / Radio** — 커스텀 스타일, Blue accent
- [ ] **Icon** — lucide-react, stroke 1.5

### 8.2 Molecules
- [ ] **ProblemCard** (Why 섹션) — 일러스트 + 제목 + 태그
- [ ] **UseCaseCard** (적용 사례) — 이미지 + 공간명 + 태그칩들
- [ ] **SpecBullet** (SHAT 사양) — 아이콘 + 텍스트
- [ ] **ProcessStep** — 번호 원형 + 제목 + 설명
- [ ] **FaqItem** — 아코디언 (제목 + chevron + 펼친 본문)
- [ ] **FormField** — Label + Input + Error message

### 8.3 Organisms
- [ ] **Header** — 로고 + LocaleSwitcher + Primary CTA, sticky
- [ ] **Footer** — 회사 정보 + 법적 링크 + 카피라이트
- [ ] **HeroSection** — Navy 배경, split layout
- [ ] **WhyAerisSection** — 4 카드 그리드
- [ ] **SolutionsSection** — 탭 + 캐러셀 + 사양 패널
- [ ] **TabBar** — 4개 탭 (active/inactive 상태)
- [ ] **ImageCarousel** — 화살표 네비, 페이지 인디케이터 (1/3)
- [ ] **UseCasesSection** — 비대칭 그리드
- [ ] **ProcessSection** — 5단계 리스트
- [ ] **FaqSection** — 아코디언 그룹
- [ ] **ContactSection** — 폼

### 8.4 Layout
- [ ] **Section** — 공통 padding·max-width 래퍼
- [ ] **Container** — 좌우 패딩 적용
- [ ] **LocaleSwitcher** — 한/a 토글

---

## 9. Iconography

- 세트: **lucide-react**
- Stroke: 1.5
- 컬러: `currentColor` 기본
- 사이즈: 16 / 20 / 24px 단위로 통일

> 시안의 4개 문제 카드 일러스트는 lucide 아이콘이 아닌 **커스텀 일러스트**일 가능성이 높음 — 디자이너 에셋 수령 필요.

---

## 10. CSS 변수 구현 위치

`src/styles/globals.css`:
```css
@import "tailwindcss";

@layer base {
  :root {
    /* 위 모든 토큰 변수 정의 */
  }

  body {
    font-family: var(--font-sans);
    color: var(--color-gray-900);
    background: var(--color-white);
  }
}
```

`tailwind.config.ts` 의 `theme.extend` 에서 변수 매핑.

---

## 11. 디자이너 확정 대기 항목

- [ ] **컬러 5종 정확한 HEX** (Navy 950, Blue 600, Blue 100, Gray 300, Background)
- [ ] **폰트 패밀리·웨이트** (한글·영문)
- [ ] **Type scale 정확값** (Hero 헤드라인 등)
- [ ] **카드/버튼 border-radius**
- [ ] **섹션 간 간격** (모바일·데스크탑)
- [ ] **컨테이너 max-width 와 좌우 padding**
- [ ] **4개 문제 카드 일러스트 에셋**
- [ ] **로고 SVG**
