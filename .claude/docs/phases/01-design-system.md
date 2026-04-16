# Phase 01 — Design System (UI Components)

> **목표:** 모든 Atom + Molecule 컴포넌트를 토큰만으로 구현하고, `/dev` 라우트에서 시안과 비교 검수.
> **선행:** Phase 0 / **후행:** Phase 2

---

## 작업 원칙

1. 모든 컴포넌트는 **CSS 변수 토큰**으로만 스타일링. 인라인 색상·픽셀값 금지.
2. `'use client'` 는 **인터랙션이 필요한 경우에만**.
3. props 는 인터페이스로 명시, named export.
4. 모든 인터랙티브 요소에 `aria-*` 속성, focus ring 명확.
5. 각 컴포넌트는 `src/components/ui/[name].tsx` 에 단일 파일.

---

## 검수용 `/dev` 라우트

`src/app/[locale]/dev/page.tsx` 를 만들어 모든 컴포넌트를 한 페이지에 노출. 시안과 나란히 비교.

```tsx
export default function DevPage() {
  return (
    <main className="space-y-12 p-12">
      <section>
        <h2>Buttons</h2>
        <Button variant="primary">지금 문의하기</Button>
        <Button variant="ghost">솔루션 보기 →</Button>
      </section>
      {/* ...all components... */}
    </main>
  );
}
```

---

## 컴포넌트 명세

### 1. Button — `src/components/ui/button.tsx`

**Variants:**
- `primary` — Blue 배경, 화이트 텍스트 (예: "지금 문의하기")
- `secondary` — Navy 배경, 화이트 텍스트
- `ghost` — 투명 배경, Navy 텍스트, 화살표 아이콘 (예: "솔루션 보기 →")
- `outline` — Light 보더, Navy 텍스트

**Sizes:** `sm` / `md` (default) / `lg`

**Props:**
```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;  // <Link> 로 렌더할 때
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}
```

**스타일 키:**
- radius: `--radius-md`
- height md: 44px (mobile 친화)
- focus ring: 2px solid `var(--color-blue-500)`, offset 2px

---

### 2. Badge / Tag (Pill) — `src/components/ui/badge.tsx`

**용도:**
- Hero 의 `ENGINEERED` `CLEAN` `RELIABLE`
- Use Case 카드의 태그칩 (`환기` `제습` 등)
- Why 카드의 하단 태그 (`습도 제어 필요` 등)

**Variants:**
- `solid` — Light Blue 배경 + Navy 텍스트
- `outline` — 보더만 (Use Case 칩)
- `dark` — Navy 배경 + Blue 텍스트 (Hero 다크 배경 대응)

**Props:**
```ts
interface BadgeProps {
  variant?: 'solid' | 'outline' | 'dark';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}
```

**스타일 키:**
- radius: `--radius-pill`
- 텍스트: uppercase 옵션 가능 (Hero용)

---

### 3. Eyebrow Label — `src/components/ui/eyebrow.tsx`

시안에 반복적으로 등장하는 `─ TEXT` 형태의 섹션 상단 라벨. (예: `─ 왜 AERIS인가?`, `─ SOLUTIONS`)

**Props:**
```ts
interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}
```

**구현:**
```tsx
<div className="flex items-center gap-2 text-blue-500">
  <span className="h-px w-6 bg-current" />
  <span className="text-caption uppercase tracking-wider font-medium">
    {children}
  </span>
</div>
```

---

### 4. Input / Textarea — `src/components/ui/input.tsx`, `textarea.tsx`

**공통 스타일:**
- 보더: `--color-gray-300`
- focus 시 보더 `--color-blue-500` + outline ring
- radius: `--radius-md`
- 패딩: 12px 16px
- placeholder 색상: `--color-gray-500`

**Props:** native `input` / `textarea` 속성 그대로 + `error?: string`

---

### 5. FormField — `src/components/ui/form-field.tsx`

Label + Input + Error message 를 묶은 분자.

```ts
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;  // Input/Textarea/Select
}
```

레이아웃: Label (위) → children → error/hint (아래, 빨강/회색)

---

### 6. Checkbox / Radio — `src/components/ui/checkbox.tsx`

폼의 동의 항목·문의 유형 선택용. 네이티브 `<input>` + 커스텀 디자인.

- 체크 시: Blue 배경 + 화이트 체크 아이콘
- focus ring 명확

---

### 7. Tab — `src/components/ui/tab.tsx`

Solutions 섹션의 4개 탭 (SHAT / DRDH / RADM / ARMS).

**Props:**
```ts
interface TabProps {
  tabs: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}
```

**시안 스타일:**
- 활성 탭: Navy 텍스트 + 하단 Navy underline (2px)
- 비활성: `--color-gray-500` 텍스트
- 데스크탑: 가로 균등 배치
- 모바일: 가로 스크롤 (`overflow-x-auto`, scrollbar 숨김)

**접근성:**
- `role="tablist"`, `role="tab"`, `aria-selected`
- 키보드 화살표 좌우로 이동 가능

---

### 8. Accordion — `src/components/ui/accordion.tsx`

FAQ 섹션용. 단일/다중 펼침 모드 지원.

**Props:**
```ts
interface AccordionItemProps {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  mode?: 'single' | 'multiple';
}
```

**시안 스타일:**
- 닫힌 상태: 질문 + chevron-down (오른쪽)
- 펼친 상태: chevron-up + 본문 노출
- 항목 사이 보더 라인 (`--color-gray-200`)
- 패딩: 좌우 0, 상하 20px

**접근성:** `aria-expanded`, `aria-controls`, 키보드 Enter/Space

---

### 9. ImageCarousel — `src/components/ui/carousel.tsx`

Solutions 섹션의 이미지 캐러셀 (1/3 페이지 인디케이터).

**구현:** `embla-carousel-react` 사용.

**Props:**
```ts
interface CarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
}
```

**시안 스타일:**
- 좌우 화살표 버튼 (이미지 위 또는 옆)
- 우측 상단 또는 하단에 `1/3` 텍스트 인디케이터
- 스와이프 지원 (mobile)

---

### 10. Card — `src/components/ui/card.tsx`

범용 카드 컨테이너. Why·UseCase·Solution Spec 패널에 사용.

**Props:**
```ts
interface CardProps {
  variant?: 'bordered' | 'filled';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}
```

**스타일:**
- bordered: 보더 `--color-gray-300`, 배경 white
- filled: 배경 `--color-gray-100` 또는 `--color-blue-100`
- radius: `--radius-md`

---

### 11. Section / Container — `src/components/layout/section.tsx`, `container.tsx`

페이지 전체에서 반복되는 레이아웃 래퍼.

```tsx
// Section: 위아래 padding + 옵션 배경
<Section background="white" id="why">
  <Container>{children}</Container>
</Section>

// Container: max-width + 좌우 padding
```

**Props:**
```ts
interface SectionProps {
  background?: 'white' | 'navy' | 'lightBlue' | 'gray';
  id?: string;       // anchor 용
  children: React.ReactNode;
}

interface ContainerProps {
  size?: 'default' | 'narrow';
  children: React.ReactNode;
}
```

---

### 12. LocaleSwitcher — `src/components/layout/locale-switcher.tsx`

헤더 우상단의 한/a 토글.

**시안 스타일:**
- 활성 언어: Navy 굵은 텍스트
- 비활성: 회색 텍스트
- 구분자 `/`

**구현:** next-intl 의 `useLocale` + `Link` 로 라우트 전환.

---

## ✅ Definition of Done (Phase 1)

- [x] 11개 컴포넌트 모두 구현 + named export
- [x] `/dev` 페이지에서 모든 컴포넌트가 시안과 시각적으로 일치
- [x] 각 컴포넌트가 토큰(CSS 변수)만 사용 — 매직 넘버·하드코딩 색상 없음
- [x] 키보드로 모든 인터랙티브 요소 조작 가능
- [x] focus ring 모든 컴포넌트에서 명확하게 보임
- [x] TypeScript strict 무에러 / `pnpm build` 무에러

---

## 다음 단계

→ [`02-sections/README.md`](./02-sections/README.md) 으로 이동.
