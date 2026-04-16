# Phase 02 — Sections 공통 규칙

> 9개 섹션을 시안과 픽셀 매칭하며 구현. 각 섹션은 독립 가능 (병렬 작업 OK).

---

## 작업 순서 권장

상→하 순서가 가장 안전하지만, 병렬도 가능:

```
1. Footer        ← 가장 단순, 워밍업
2. Header        ← 다른 섹션의 sticky 기준
3. Hero          ← 가장 임팩트 큼, 토큰 검증 핵심
4. Why AERIS     ← 4 카드 그리드 패턴 확립
5. Use Cases     ← Why 와 비슷한 패턴
6. Process       ← 자체 구현, 의존성 적음
7. FAQ           ← Accordion 컴포넌트 검증
8. Solutions     ← 가장 복잡 (Tab + Carousel + 사양 패널)
9. Contact       ← 폼 (Phase 4 백엔드와 분리하여 UI만 우선)
```

---

## 섹션 구현 공통 패턴

### 파일 구조
각 섹션은 `src/components/sections/[name]/` 폴더로:

```
src/components/sections/hero/
├── index.tsx           # 메인 컴포넌트 (named export)
├── data.ts             # 섹션 내부 정적 데이터 (있다면)
└── parts/              # 하위 분리 컴포넌트 (있다면)
```

### 섹션 컴포넌트 템플릿
```tsx
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';

export const HeroSection = () => {
  const t = useTranslations('hero');
  return (
    <Section background="navy" id="hero">
      <Container>
        {/* ... */}
      </Container>
    </Section>
  );
};
```

---

## 모든 섹션 README 의 공통 항목

각 섹션 명세서는 다음 구조를 따른다:

1. **목적** — 한 줄
2. **시안 참조** — 어느 이미지의 어느 부분
3. **앵커 ID** — `#hero` 등
4. **레이아웃** — 모바일·데스크탑 차이
5. **콘텐츠** — 카피·라벨 (i18n 키 포함)
6. **데이터** — 카드 4개, 5단계 등 정적 데이터 구조
7. **인터랙션** — hover, click, expand 등
8. **의존 컴포넌트** — Phase 1 의 어떤 atom·molecule
9. **콘텐츠 의존성** — 사업측·디자이너에게 받아야 할 것
10. **DoD** — 완료 기준

---

## i18n 네임스페이스 규칙

```json
// messages/ko.json
{
  "header": { ... },
  "hero": { ... },
  "why": { ... },
  "solutions": {
    "shat": { ... },
    "drdh": { ... },
    "radm": { ... },
    "arms": { ... }
  },
  "useCases": { ... },
  "process": { ... },
  "faq": { ... },
  "contact": { ... },
  "footer": { ... },
  "common": { ... }
}
```

영문 키 구조는 동일, 값만 다름.

---

## 반응형 브레이크포인트 적용 규칙

- Mobile-first 작성 (`base` → `md` → `lg` → `xl`)
- 시안의 모바일 = `~767px`, 데스크탑 = `lg:` (`1024px+`) 기준
- 태블릿(`md:`)은 모바일 레이아웃 + 약간의 spacing 조정

```tsx
// Good
<div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">

// Bad — desktop-first
<div className="grid grid-cols-4 max-lg:grid-cols-2">
```

---

## 섹션 명세 파일 목록

- [`header.md`](./header.md)
- [`hero.md`](./hero.md)
- [`why-aeris.md`](./why-aeris.md)
- [`solutions.md`](./solutions.md)
- [`use-cases.md`](./use-cases.md)
- [`process.md`](./process.md)
- [`faq.md`](./faq.md)
- [`contact.md`](./contact.md)
- [`footer.md`](./footer.md)
