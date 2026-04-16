# Section — FAQ

> **목적:** B2B/B2C 자주 묻는 질문 5개를 아코디언으로 노출하여 문의 전 의사결정 보조.

---

## 시안 참조
- 모바일·데스크탑 모두 Process 바로 아래
- 5개 질문 아코디언

## 앵커
- `#faq`

---

## 레이아웃

### 모바일·데스크탑 공통
좌측 라벨(`| FAQ`) + 우측 5개 아코디언 항목.

```
| FAQ
                    Q. 질문 1                          ⌄
                    Q. 질문 2                          ⌄
                    Q. 질문 3                          ⌄
                    Q. 질문 4                          ⌄
                    Q. 질문 5                          ⌄
```

- 데스크탑: Process와 동일한 좌우 split 레이아웃
- 모바일: 헤더 위, 아코디언 아래 세로 스택
- 항목 사이 보더 라인 (`--color-gray-200`)
- 배경: white
- 상하 패딩: 모바일 64px / 데스크탑 128px

---

## 콘텐츠

### 헤더
| 요소 | 한국어 | i18n key |
|---|---|---|
| Headline | `FAQ` | `faq.headline` |

### 아코디언 데이터 (⛔ Placeholder — 사업측 콘텐츠 필요)

```ts
export const faqItems = [
  { id: 'q1', question: '⛔ 질문 1', answer: '⛔ 답변 1' },
  { id: 'q2', question: '⛔ 질문 2', answer: '⛔ 답변 2' },
  { id: 'q3', question: '⛔ 질문 3', answer: '⛔ 답변 3' },
  { id: 'q4', question: '⛔ 질문 4', answer: '⛔ 답변 4' },
  { id: 'q5', question: '⛔ 질문 5', answer: '⛔ 답변 5' },
] as const;
```

i18n: `faq.items.[q1~q5].question`, `faq.items.[q1~q5].answer`

### 예상 질문 카테고리 (사업측에 제안)
B2B 와 B2C 가 혼합될 가능성. 다음 카테고리 중 5개 선정 권장:
- 시공 기간·비용 범위
- 사후 A/S 보장 기간
- 기존 환기 시설 호환 여부
- 소음·전력 소비
- B2B 단가표·견적 절차
- B2C 가정용 설치 가능 여부

---

## 인터랙션

- 모드: `multiple` (여러 항목 동시에 펼침 가능)
- 기본 상태: 모두 닫힘
- 클릭/Enter/Space 로 펼침·접힘
- chevron 아이콘 회전 (`transition-transform`)

---

## 의존 컴포넌트

- `Section`, `Container`
- `Accordion` (Phase 1 컴포넌트)

---

## 콘텐츠 의존성

- [ ] **5개 Q&A 본문** (사업측 — 가장 시급)
- [ ] 영문 Q&A 번역

---

## SEO 보너스

Phase 5 에서 `FAQPage` JSON-LD 를 head 에 주입:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Q1", "acceptedAnswer": { "@type": "Answer", "text": "A1" } }
  ]
}
```
구글 검색 결과에 FAQ rich snippet 노출.

---

## ✅ DoD

- [ ] 5개 항목 아코디언 정상 동작
- [ ] 키보드 접근 가능 (Tab → Enter)
- [ ] `aria-expanded` 정확히 토글
- [ ] chevron 회전 애니메이션 부드러움
- [ ] 데스크탑 좌우 split 레이아웃
- [ ] 모바일 세로 스택
- [ ] 항목 사이 구분선 깔끔
