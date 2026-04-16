# Section — Use Cases (공간별 적용 사례)

> **목적:** AERIS 솔루션이 적용 가능한 4개 대표 공간(발코니/욕실/드레스룸/창문형)을 사례 카드로 제시.

---

## 시안 참조
- 모바일·데스크탑 모두 Solutions 바로 아래
- 비대칭 그리드

## 앵커
- `#use-cases`

---

## 레이아웃

### 모바일
```
─ 시나리오
[헤드라인]
[Card 발코니]
[Card 욕실]
[Card 드레스룸]
[Card 창문형]
```
세로 1열 또는 2x2 — 시안 재확인 필요.

### 데스크탑 — 비대칭 2x2
시안에서 발코니가 좌상, 드레스룸이 우상에서 더 작거나 다른 위치, 욕실/창문형이 하단에 비대칭으로 배치된 모습. 정확히는:

```
┌─────────────┐  ┌──────────┐
│  발코니      │  │ 드레스룸  │ ← 욕실 카드는 좌하 좀 작게
│  (큰 카드)   │  │           │
└─────────────┘  └──────────┘
   ┌──────────┐   ┌──────────┐
   │   욕실    │   │  창문형   │
   └──────────┘   └──────────┘
```

> 정확한 그리드 비율은 시안 픽셀 측정 후 결정. CSS Grid `grid-template-areas` 또는 명시적 `col-span` 권장.

- 배경: white
- 상하 패딩: 모바일 64px / 데스크탑 128px

---

## 콘텐츠 — 헤더

| 요소 | 한국어 | i18n key |
|---|---|---|
| Eyebrow | `시나리오` | `useCases.eyebrow` |
| Headline | `공간별 적용 사례` | `useCases.headline` |

---

## 카드 데이터

```ts
export const useCases = [
  {
    id: 'balcony',
    space: '발코니',
    tags: ['환기', '제습', '결로 방지'],
    image: '/images/use-cases/balcony.jpg',
  },
  {
    id: 'bathroom',
    space: '욕실',
    tags: ['환기', '살균', '악취 제거'],
    image: '/images/use-cases/bathroom.jpg',
  },
  {
    id: 'dressroom',
    space: '드레스룸',
    tags: ['제습', '정화', '의류 보호'],
    image: '/images/use-cases/dressroom.jpg',
  },
  {
    id: 'window',
    space: '창문형',
    tags: ['자유 설치', '환기'],
    image: '/images/use-cases/window.jpg',
  },
] as const;
```

> 태그는 시안에서 일부만 보였음 — **사업측에 각 공간별 정확한 태그 확인 필요**.

---

## 카드 레이아웃 (개별)

```
┌───────────────────┐
│                   │
│      [Image]      │   ← 큰 비주얼
│                   │
├───────────────────┤
│   공간명           │   ← Body, weight semibold
│   [태그] [태그]    │   ← Pill outline 스타일
└───────────────────┘
```

---

## 인터랙션

- 호버: 이미지 살짝 확대 (`scale-105`, transform-origin 중앙) 또는 보더 변화
- 클릭: 동작 없음 (Phase 3에서 추가 콘텐츠 페이지로 연결할지 결정)

---

## 의존 컴포넌트

- `Section`, `Container`
- `Eyebrow`
- `Card`
- `Badge` (variant=`outline`, size=`sm`)
- `next/image`

---

## 콘텐츠 의존성

- [ ] **4개 공간 이미지** (디자이너) — 동일 톤·앵글 권장
- [ ] 각 공간별 정확한 태그 라벨 (사업측)
- [ ] 영문 공간명·태그

---

## ✅ DoD

- [ ] 데스크탑 비대칭 그리드 시안과 동일 배치
- [ ] 모바일에서 자연스럽게 세로 정렬로 재배치
- [ ] 이미지 비율 일관성 유지 (`aspect-ratio` 사용)
- [ ] 호버 인터랙션 부드러움 (`transition-transform duration-300`)
- [ ] 이미지에 적절한 alt 텍스트
