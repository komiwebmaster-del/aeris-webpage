# Section — Solutions

> **목적:** 4개 솔루션 라인업(SHAT/DRDH/RADM/ARMS)을 탭으로 전환하며, 각 솔루션의 이미지·사양·CTA 노출. **가장 복잡한 섹션**.

---

## 시안 참조
- 모바일·데스크탑 모두 라이트 블루 배경 영역
- 탭 4개 + 캐러셀 + 사양 패널

## 앵커
- `#solutions`

---

## 레이아웃

### 모바일 (세로 스택)
```
─ SOLUTIONS
[헤드라인]

[Tab1][Tab2][Tab3][Tab4]   ← 가로 스크롤

[ Image 1/3 ]              ← 캐러셀

[┃ 통합 공조 시스템 ]       ← navy left bar
[설명]
• 환기율 향상 85% 이상
• PM2.5 센서 내장
• BMS·앱 연동
• 18 dB 정숙 운영
[통합공조 상담 신청 →]
```

### 데스크탑 (좌우 split)
```
─ SOLUTIONS
[헤드라인 좌][설명 우]
[Tab1] [Tab2] [Tab3] [Tab4]
┌─────────────────┬─────────────────────────┐
│                 │  ┃ 통합 공조 시스템     │
│  [Image 1/3]    │   설명                  │
│                 │   • 사양 1              │
│                 │   • 사양 2              │
│                 │   • 사양 3              │
│                 │   • 사양 4              │
│                 │   [상담 신청 →]         │
└─────────────────┴─────────────────────────┘
```

- 배경: `--color-blue-100`
- 상하 패딩: 모바일 64px / 데스크탑 128px

---

## 콘텐츠 — 헤더

| 요소 | 한국어 | i18n key |
|---|---|---|
| Eyebrow | `SOLUTIONS` | `solutions.eyebrow` |
| Headline | `공간에 맞는`<br/>`AERIS 솔루션` | `solutions.headline` |

---

## 탭 데이터

```ts
export const solutionTabs = [
  { id: 'shat', code: 'SHAT', label: '통합 공조' },
  { id: 'drdh', code: 'DRDH', label: '빌트인 제습' },
  { id: 'radm', code: 'RADM', label: '창문형/모듈' },
  { id: 'arms', code: 'ARMS', label: '인증·근거' },
] as const;
```

탭 라벨 표시: `통합 공조(SHAT)` 형태로 합쳐서 표시.

---

## 솔루션별 콘텐츠

### SHAT — 통합 공조 시스템 (확정)

| 항목 | 값 |
|---|---|
| Title | `통합 공조 시스템` |
| Description | `환기·제습·정화·살균 4대 공기환경 통합 제어 시스템` |
| Spec 1 | `환기율 향상 85% 이상 → 에너지 손실 최소화` |
| Spec 2 | `PM2.5 센서 내장 → 실시간 공기질 측정·자동 제어` |
| Spec 3 | `BMS·앱 연동 → 원격 모니터링 및 스케줄 운영` |
| Spec 4 | `18 dB 정숙 운영 → 수면·집중 방해 없음` |
| CTA | `통합공조 상담 신청 →` |
| 이미지 | 캐러셀 3컷 |

### DRDH — 빌트인 제습 ⛔ 콘텐츠 미수령
- Title: TBD
- Description: TBD
- Spec 1~4: TBD
- 이미지 3컷: TBD

### RADM — 창문형/모듈 ⛔ 콘텐츠 미수령
- 동일

### ARMS — 인증·근거 ⛔ 콘텐츠 미수령
- 인증 로고·시험 성적표 등 다른 형태가 될 가능성 — **디자이너 / 사업측과 구조 협의 필요**

---

## 사양 패널 시각

```
┃ 통합 공조 시스템
```
좌측 세로 라인 = 4px width navy 막대 (시안 참조). Tailwind: `border-l-4 border-navy-900 pl-4`.

---

## 인터랙션

- **탭 전환:** URL hash 또는 query 동기화 권장 (`?tab=shat`) — 공유 가능
- **캐러셀:**
  - 좌우 화살표
  - 페이지 인디케이터 `1/3` 텍스트
  - 모바일 스와이프
- **상담 신청 CTA:** `#contact` 로 스크롤 (가능하면 query 로 솔루션 종류 prefill)

---

## 의존 컴포넌트

- `Section` (background=`lightBlue`)
- `Container`
- `Eyebrow`
- `Tab`
- `ImageCarousel`
- `Button` (Ghost / Primary)

---

## 콘텐츠 의존성

- [ ] **DRDH/RADM/ARMS 사양 텍스트** (사업측)
- [ ] **솔루션별 이미지 12컷** (탭 4 × 3컷, 디자이너)
- [ ] ARMS 탭 구조 결정 (인증서 갤러리? PDF 다운로드? 표?)
- [ ] 영문 사양 카피

---

## ✅ DoD

- [ ] 4개 탭 전환 시 콘텐츠 즉시 교체 (페이드 등 미세한 transition 권장)
- [ ] 모바일 탭 가로 스크롤 자연스럽게
- [ ] 캐러셀 1/3 인디케이터 정확히 동작
- [ ] 좌측 navy 막대(`┃`) 시각 일치
- [ ] 키보드 화살표로 탭 전환 가능
- [ ] 탭 상태가 URL 에 반영 (옵션이지만 권장)
