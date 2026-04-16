# Section — Hero

> **목적:** 진입 메시지 "발코니부터 시작하는 완전한 실내 공기환경 설계" 를 강하게 전달하고, 즉시 문의/솔루션 보기로 유도.

---

## 시안 참조
- 모바일: 전체 페이지 최상단 Navy 영역
- 데스크탑: 좌(텍스트) + 우(이미지) split

## 앵커
- `#hero` (또는 자동 진입 시 anchor 불필요)

---

## 레이아웃

### 모바일
```
─ 발코니 · 실내 공기환경 솔루션
[Image placeholder]
[Headline 3줄]
[설명 본문]
[ENGINEERED] [CLEAN] [RELIABLE]
[지금 문의하기 — Primary]
[솔루션 보기 → — Ghost]
```

### 데스크탑 (좌 50% : 우 50%)
```
[좌측 — 텍스트]                         [우측 — 키 비주얼]
─ 발코니 · 실내 공기환경 솔루션
발코니부터 시작하는
완전한 실내
공기환경 설계
[설명]
[태그 3개]
[CTA 2개]
```

- 배경: `--color-navy-950` (Hero 전용 Deep Navy)
- 텍스트: white / 라이트 블루
- 좌우 패딩: `--container-pad-desktop` 기준
- 상하 패딩: 모바일 80px / 데스크탑 120px

---

## 콘텐츠

| 요소 | 한국어 | i18n key |
|---|---|---|
| Eyebrow | `발코니 · 실내 공기환경 솔루션` | `hero.eyebrow` |
| Headline (3줄) | `발코니부터 시작하는`<br/>`완전한 실내`<br/>`공기환경 설계` | `hero.headline` |
| Description | `공기의 흐름·역류·환기 부족을 한 번에. AERIS가 공간을 분석하고 시스템을 설계합니다.` | `hero.description` |
| Tag 1 | `ENGINEERED` | `hero.tags.engineered` |
| Tag 2 | `CLEAN` | `hero.tags.clean` |
| Tag 3 | `RELIABLE` | `hero.tags.reliable` |
| CTA Primary | `지금 문의하기` | `hero.ctaPrimary` |
| CTA Ghost | `솔루션 보기 →` | `hero.ctaSecondary` |

> 영문 카피는 Phase 3 에서 작성. *Air, Engineered.* 문구를 함께 노출할지 디자이너와 합의 필요.

---

## 인터랙션

- **CTA Primary 클릭:** `#contact` 로 스크롤
- **CTA Ghost 클릭:** `#solutions` 로 스크롤
- **태그:** 시각적 요소만, 클릭 동작 없음

---

## 타이포 적용

- Headline: `--text-display`, `--leading-display`, weight 700, color white
- Eyebrow: `Eyebrow` 컴포넌트, color `var(--color-blue-300)`
- Description: `--text-body`, color `var(--color-gray-300)` 또는 white-80%

---

## 의존 컴포넌트

- `Section` (background=`navy`)
- `Container`
- `Eyebrow`
- `Badge` (variant=`dark`)
- `Button` (Primary + Ghost)

---

## 콘텐츠 의존성

- [ ] **Hero 키 비주얼 이미지** (디자이너 → 가능하면 정사각 또는 4:3, 모바일·데스크탑 둘 다 대응)
- [ ] 영문 헤드라인·본문 카피

---

## ✅ DoD

- [ ] 데스크탑 좌우 split 정확
- [ ] 모바일에서 이미지가 헤드라인 위 또는 아래로 자연스럽게 재배치
- [ ] 헤드라인 줄바꿈이 시안과 동일 (3줄)
- [ ] 태그 3개 가로 배치, 줄바꿈 없음
- [ ] CTA 클릭 시 anchor 스크롤 동작
- [ ] LCP 후보로 키 비주얼에 `priority` 적용
- [ ] 텍스트 contrast WCAG AA 통과
