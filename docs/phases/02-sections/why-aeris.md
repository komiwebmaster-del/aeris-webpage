# Section — Why AERIS

> **목적:** 발코니부터 실내까지 사용자가 매일 겪는 4가지 문제를 카드로 시각화하여, AERIS 솔루션의 필요성을 설득.

---

## 시안 참조
- 모바일·데스크탑 모두 Hero 바로 아래
- 4개 카드 그리드

## 앵커
- `#why`

---

## 레이아웃

### 모바일
```
─ 왜 AERIS인가?
[헤드라인]
[설명]
[Card 1] [Card 2]
[Card 3] [Card 4]
```
2x2 그리드, gap 12~16px

### 데스크탑
```
─ 왜 AERIS인가?
[헤드라인]                                [설명]
[Card 1] [Card 2] [Card 3] [Card 4]
```
1x4 그리드, gap 24px

- 배경: white
- 상하 패딩: 모바일 64px / 데스크탑 128px

---

## 콘텐츠

### 헤더
| 요소 | 한국어 | i18n key |
|---|---|---|
| Eyebrow | `왜 AERIS인가?` | `why.eyebrow` |
| Headline | `발코니부터 실내 곳곳에서`<br/>`매일 겪는 문제들` | `why.headline` |
| Description | `더 이상 방치할 수 없는 문제들, AERIS가 근본적으로 해결해 드립니다.` | `why.description` |

### 카드 데이터 — `data.ts`

```ts
export const problemCards = [
  {
    id: 'mold',
    icon: 'mold',
    title: '곰팡이·결로',
    tag: '습도 제어 필요',
  },
  {
    id: 'odor',
    icon: 'odor',
    title: '악취·환기 부족',
    tag: '환기 설계 필요',
  },
  {
    id: 'humidity',
    icon: 'humidity',
    title: '습도 불균형',
    tag: '제습 솔루션 필요',
  },
  {
    id: 'common',
    icon: 'common',
    title: '공용부 관리 한계',
    tag: '개별 시스템 필요',
  },
] as const;
```

i18n: 카드 제목·태그는 `why.cards.[id].title`, `why.cards.[id].tag` 형태로.

---

## 카드 레이아웃 (개별)

```
┌───────────────────┐
│                   │
│    [일러스트]     │   ← 정사각 영역, 라이트 그레이 보더
│                   │
├───────────────────┤
│   카드 제목        │   ← Body 사이즈, weight semibold, navy
│   카드 태그        │   ← Caption 사이즈, blue 텍스트
└───────────────────┘
```

- 카드 보더: `--color-gray-300`
- 카드 radius: `--radius-md`
- 패딩: 16px (모바일) / 20px (데스크탑)

---

## 인터랙션

- 호버: 보더 색상이 Blue 로 변경 (`--color-blue-300`)
- 클릭 동작 없음 (정보 카드)

---

## 의존 컴포넌트

- `Section`, `Container`
- `Eyebrow`
- `Card` (variant=`bordered`)
- `Badge` (variant=`solid`, size=`sm`) — 카드 하단 태그용

---

## 콘텐츠 의존성

- [ ] **4개 카드 일러스트/아이콘 에셋** (디자이너) — 라이트한 라인 일러스트 추정, 통일된 스타일 필수
- [ ] 영문 카드 제목·태그

---

## ✅ DoD

- [ ] 모바일 2x2 / 데스크탑 1x4 정확히 배치
- [ ] 카드 높이가 콘텐츠 길이에 따라 깨지지 않음 (등분)
- [ ] 일러스트 정사각 영역에 정렬
- [ ] 태그가 카드 하단에 일관되게 정렬 (flex-end)
- [ ] 호버 인터랙션 부드럽게 동작
