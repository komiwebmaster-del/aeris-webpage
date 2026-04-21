# AERIS — Business Promo Page

> **Air, Engineered.** — HVAC 통합 솔루션 브랜드 AERIS 의 단일 랜딩 페이지.
> B2B(건설·설비·시설관리) + B2C(프리미엄 주거) 양 타겟.

---

## 🧭 빠른 시작

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm build
pnpm lint
pnpm tsc --noEmit
```

- **프레임워크**: Next.js 16 (App Router, Turbopack)
- **언어**: TypeScript (strict)
- **스타일**: Tailwind CSS v4 + CSS 변수 토큰 (`src/styles/globals.css`)
- **다국어**: next-intl (`ko` 기본, `en` 보조 / `messages/{ko,en}.json`)
- **패키지**: pnpm

---

## 📑 페이지 섹션 구성 현황

렌더 순서 (`src/app/[locale]/page.tsx`):

| # | 섹션 | 컴포넌트 파일 | 배경 | 상태 |
|---|---|---|---|---|
| 1 | Header | `src/components/sections/header/` | white | ✅ 실 로고(`aeris-logo-navy.png`) 적용 |
| 2 | Hero (=Visual) | `src/components/sections/hero/` | navy | ⚠️ 우측 이미지 영역 JSX 주석 처리 상태(텍스트만 노출) — 에셋 수령 후 복구 |
| 3 | Brand Overview | `src/components/sections/brand-overview/` | white | ✅ 2-카드 레이아웃, 웨이브 배경 |
| 4 | Brand Core | `src/components/sections/brand-core/` | white | ✅ 3D Isometric 비주얼(`3d-house.png`) 반영 |
| 5 | Brand Concept | `src/components/sections/brand-concept/` | navy | ✅ AERIS 아크로님 5행 + 화이트 로고 |
| 6 | Logo Concept | `src/components/sections/logo-concept/` | white | ✅ 블루프린트 그리드 + 네이비 로고, Color System 스와치 |
| 7 | Why AERIS? | `src/components/sections/why/` | white | ⚠️ 4카드 placeholder (`Image 혹은 일러스트`) — 드레스룸 중심 카피 |
| 8 | Solutions | `src/components/sections/solutions/` | — | 사용자가 활성화, 시안 매칭 별도 확인 필요 |
| 9 | Contact | `src/components/sections/contact/` | — | 사용자가 활성화 |
| 10 | Footer | `src/components/sections/footer/` | — | ✅ |

**현재 비활성** (JSX 블록 주석, import 는 유지, 필요 시 복구):
- `UseCasesSection`
- `ProcessSection`
- `FaqSection`

복구 시 `src/app/[locale]/page.tsx` 의 `{/* 2026-04-20: 레이아웃 개정… */}` 주석 블록 해제.

---

## 🖼 에셋 대기 목록 (Inventory)

| 위치 | 현재 상태 | 받아야 할 것 | 비고 |
|---|---|---|---|
| `hero/index.tsx` 우측 영역 | JSX 주석(블록 77–86) | Hero Key Visual 이미지 | 4:3 / lg: 정사각, navy 섹션에 얹힘 |
| `why/index.tsx:50–58` | 회색 보더 박스 × 4 + "Image 혹은 일러스트" | 카드별 이미지/일러스트 4장 | `aspect-square`, 카드 타이틀 순서 `mold→humidity→common→odor` |
| `decor/wave-background.tsx` | AI 생성 PNG(2048×3072, `public/images/decor/wave-bg.png`) | **진짜 벡터 SVG 웨이브** (로고 모티프와 동일 DNA) | 임시 방편. `<svg>` 인라인 교체 예정 |
| 로고 | 워드마크 2종 PNG (`public/images/logo/aeris-logo-{navy,white}.png`) 수령 완료 | SVG 버전 + 심볼 단독 + 파비콘 세트 + OG | 상세는 아래 "로고 에셋 요청 규격" |

### 로고 에셋 요청 규격 (디자이너용)

- **워드마크**: SVG(컬러/리버스) + PNG 960×240 @3x
- **심볼 단독**: 정사각 SVG (viewBox `64×64`) + PNG 512×512
- **파비콘**: `favicon.ico` 멀티사이즈, `icon-{192,512}.png`, `apple-touch-icon-180.png`
- **OG**: 1200×630 PNG (navy bg + reverse 로고)
- **가이드**: 안전영역 / 최소 사용 크기 1장

### 웨이브 배경 — 업그레이드 경로

현재 `wave-bg.png` 는 ChatGPT/GPT-4o 로 생성된 1024×1536 래스터를 추출·업스케일한 임시 에셋.

**최종 목표**: 디자이너가 **진짜 벡터 SVG** 로 재설계 → `<svg>` 인라인으로 교체.
- 장점: 무한 확대 선명, 파일 10KB 안쪽, CSS 컬러 토큰화, 애니메이션 확장 가능
- 요청 문구 예: "로고의 유선형 모티프와 DNA 가 같은 웨이브, `viewBox` 1440×600, path 3–5줄, `fill`/`stroke` 를 CSS 변수(`--color-blue-300/400/500`) 로 받을 수 있게"

---

## 🎨 디자인 토큰 & 최근 결정사항

### 토큰 위치
- CSS 변수: `src/styles/globals.css` (color / typography / spacing / radius / shadow / motion)
- Tailwind 바인딩: `tailwind.config.ts` (→ `text-display`, `bg-navy-900`, `text-blue-500` 등)

### ⚠️ 토큰 vs 시안 hex 불일치

Logo Concept 의 Color System 스와치에 시안 기준 hex 3개가 **하드코딩** 되어 있음:
- `#002D56` / `#154974` / `#4B8CBC`

현재 토큰값(추정치)과 미세한 차이:
- `--color-navy-950`: `#0A1738` ← 시안 `#002D56`
- `--color-blue-500`: `#4A8AC4` ← 시안 `#4B8CBC`

**결정**: 스와치는 콘텐츠이므로 시안 hex 그대로. 전체 토큰 동기화는 **별도 티켓** (전 섹션 시각 영향).

### i18n 영문 라벨 유지 정책
- `ABOUT AERIS - Brand Overview/Core/Concept` — 한·영 양쪽 로케일에서 영문 유지
- `LOGO CONCEPT`, `KEY VISUAL MEANING`, `Wordmark Structure`, `Flow Motif`, `Color System` — 동일
- `WHY AERIS?` — 동일
- **사유**: 시안의 디자인 의도가 "영문 대문자 라벨 = 섹션 타이틀"

### WhySection 카피 (드레스룸 중심)
현재 시안이 드레스룸 보관환경 중심 카피로 특화되어 있음:
- Headline: "드레스룸의 보관환경은 / 공기부터 달라야 합니다. / AERIS는 환기와 제습으로 그 기준을 만듭니다."
- 향후 타겟 공간 확장 시 버전 분기 전략 논의 필요

### Next.js Image 품질
- `next.config.ts` 에 `images.qualities: [75, 90, 95]` 허용 리스트 추가
- 기본값 75 로는 소프트한 배경 이미지가 뭉개짐 → 웨이브는 `quality={90}`

---

## 🐛 알려진 선행 이슈 (out-of-scope)

| 이슈 | 현상 | 대응 |
|---|---|---|
| `/en` 라우트 한국어 폴백 | `localePrefix: 'as-needed'` 설정에서 `/en` 이 한국어 메시지를 서빙 | dev 서버 재시작 후 재현 여부 확인 → 지속 시 `src/i18n/request.ts` + `routing.ts` 조합 재검토 |
| `src/i18n/request.ts:7` | ESLint `@typescript-eslint/no-explicit-any` error | 변경 시 `any` 타입 구체화 |
| `src/components/sections/contact/index.tsx:56` | React Compiler `incompatible-library` warning (RHF `watch()`) | 영향 없음, 추적용 |
| `src/components/sections/contact/index.tsx:70` | `_data` unused warning | 영향 없음 |

---

## 📂 디렉토리

```
src/
├── app/[locale]/page.tsx        # 랜딩 페이지 진입
├── components/
│   ├── sections/                # 섹션별 단위 (header, hero, brand-*, why, solutions, contact, footer)
│   ├── layout/                  # Section / Container / LocaleSwitcher
│   ├── ui/                      # Button / Badge / Eyebrow / Input / Radio / Accordion 등
│   └── decor/                   # WaveBackground
├── lib/                         # cn, validators
├── styles/globals.css           # 디자인 토큰 CSS 변수
└── i18n/                        # next-intl routing / request
messages/{ko,en}.json            # 번역 키
public/
├── images/logo/                 # 워드마크 PNG
├── images/decor/                # 웨이브 배경 임시 PNG
└── images/placeholder-*.svg     # 솔루션 카드 placeholder
```

---

## 📚 관련 문서 (Claude Code 컨텍스트)

내부 레퍼런스는 `.claude/docs/` 에 있음. 작업 시 참조:

| 파일 | 용도 |
|---|---|
| `.claude/CLAUDE.md` | 매 세션 자동 로드되는 핵심 규칙 (톤·토큰·솔루션명·작업 템플릿) |
| `.claude/docs/01-brand-identity.md` | 브랜드 아이덴티티 가이드 |
| `.claude/docs/02-project-brief.md` | 페이지 구조·타겟 |
| `.claude/docs/03-design-system.md` | 디자인 시스템 상세 |
| `.claude/docs/04-content-tone.md` | 카피 톤앤매너 |

상위 `CLAUDE.md` / `AGENTS.md` 는 Claude Code 세션 진입 전용.

---

## 🔄 변경 이력

| 날짜 | 변경 |
|---|---|
| 2026-04-16 | Phase 0 초기 셋업 / 디자인 시스템 토큰 |
| 2026-04-16 | Phase 1 UI 컴포넌트, Phase 2 섹션 구현 |
| 2026-04-20 | 레이아웃 개정 — Hero 뒤에 Brand Overview/Core/Concept/LogoConcept 삽입, Why 드레스룸 카피 매칭, 로고 2종 & 웨이브 배경 에셋 적용 |
