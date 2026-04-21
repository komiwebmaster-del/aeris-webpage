# AERIS — Business Promo Page

> 이 파일은 Claude Code가 **매 세션 자동으로 읽는 컨텍스트** 입니다.
> 프로젝트의 핵심 규칙·디자인 원칙·작업 컨벤션을 모두 여기에 명시합니다.
> 길게 늘리지 말고, 변경 사항이 있을 때마다 갱신하세요.

---

## 1. 프로젝트 한 줄 요약

**AERIS by 코리잡** — HVAC 통합 솔루션 브랜드의 **단일 랜딩 페이지** 형태 비즈니스 홍보 사이트.
B2B(건설·설비·시설관리) 와 B2C(프리미엄 주거) 를 동시에 타겟. 진입 메시지는 **"발코니부터 시작하는 완전한 실내 공기환경 설계"**, 브랜드 에센스는 **"Air, Engineered."**.

---

## 2. 절대 깨지면 안 되는 원칙 (Non-negotiables)

1. **브랜드 톤은 "엔지니어링 + 프리미엄"**. 감성·과장 카피, 이모지, 만화풍 일러스트 금지.
2. **컬러:** Deep Navy(Primary) + Blue(Accent) + Light Blue(Section BG). 임의의 컬러 추가 금지. 정확한 토큰은 `docs/03-design-system.md` 의 CSS 변수만 사용.
3. **타이포:** 한글은 Pretendard 계열(추정 — 디자이너 확정 필요), 영문은 같은 패밀리. 손글씨/스크립트 금지.
4. **카피 톤:** 데이터·시스템·신뢰·정밀 4개 키워드 우선. 자세히는 `docs/04-content-tone.md`.
5. **디자인 토큰만 사용** — 인라인 컬러/스페이싱/폰트 사이즈 직접 입력 금지.
6. **솔루션 명칭 정확히 표기:** SHAT(통합 공조), DRDH(빌트인 제습), RADM(창문형/모듈), ARMS(인증·근거). 약어는 항상 대문자.

---

## 3. 작업 시 항상 확인할 문서

### 컨텍스트 문서 (참조)
| 순서 | 파일 | 언제 봐야 하나 |
|---|---|---|
| 1 | `docs/01-brand-identity.md` | 카피·메시지·로고 작업 |
| 2 | `docs/02-project-brief.md` | 페이지 구조·섹션 작업 |
| 3 | `docs/03-design-system.md` | 컴포넌트·스타일링 |
| 4 | `docs/04-content-tone.md` | 카피라이팅·마이크로카피 |

### Phase 작업 문서 (실행)
실제 구현은 단계별로 쪼개진 Phase 문서를 따른다:
- **시작점:** `docs/phases/README.md` — 전체 흐름·체크리스트
- **각 Phase:** `docs/phases/00-setup.md` ~ `06-launch.md`
- **섹션 구현:** `docs/phases/02-sections/[name].md` (Header / Hero / Why / Solutions / UseCases / Process / FAQ / Contact / Footer)

---

## 4. 기술 스택 (확정)

| 항목 | 선택 |
|---|---|
| 프레임워크 | **Next.js 15 (App Router)** |
| 언어 | **TypeScript** (strict) |
| 스타일 | **Tailwind CSS v4** + CSS 변수 토큰 |
| 다국어 | **next-intl** (한국어 default, 영어 보조) |
| 이미지 | `next/image` 강제 (일반 `<img>` 금지) |
| 아이콘 | **lucide-react** (stroke 1.5px) |
| 애니메이션 | CSS transition + 필요 시 framer-motion (절제) |
| 패키지 매니저 | **pnpm** |
| 폼 | react-hook-form + zod |
| 폼 백엔드 | TBD (Resend / Formspree / 자체 API 중 결정) |
| 분석 | TBD (GA4 권장) |
| 배포 | **Vercel** (권장) |

---

## 5. 디렉토리 구조

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # 랜딩 페이지 (단일)
│   │   └── (sections 분리)
│   └── api/
│       └── inquiry/route.ts      # 문의 폼 endpoint
├── components/
│   ├── ui/                       # Button, Badge, Tab, Accordion, Input
│   ├── sections/                 # Hero, WhyAeris, Solutions, UseCases, Process, Faq, Contact
│   └── layout/                   # Header, Footer, LocaleSwitcher
├── lib/
│   ├── cn.ts                     # tailwind merge util
│   └── validators/               # zod 스키마
├── content/
│   ├── ko/                       # 한국어 콘텐츠
│   └── en/                       # 영어 콘텐츠
├── styles/
│   └── globals.css               # 디자인 토큰 CSS 변수
└── messages/                     # next-intl 번역 키
    ├── ko.json
    └── en.json
```

---

## 6. 코딩 컨벤션

- **컴포넌트:** 함수형, named export, props는 인터페이스로 명시
- **서버/클라이언트 컴포넌트:** 기본 서버, 인터랙션 필요한 곳만 `'use client'`
- **클래스명:** Tailwind 우선, 반복 패턴은 `cn()` 으로 묶음
- **이미지:** `next/image` 만 사용, `priority` 는 LCP 후보에만
- **접근성:** 모든 인터랙티브 요소 `aria-label`, 시맨틱 HTML, 키보드 네비 가능
- **반응형:** Mobile-first. 브레이크포인트는 `docs/03-design-system.md` 의 토큰
- **i18n:** 모든 사용자 노출 텍스트는 `messages/*.json` 키로, 하드코딩 금지

---

## 7. 작업 시작 시 표준 지시 템플릿

### 새 Phase 시작 시
```
docs/phases/[해당 phase 파일]을 먼저 읽고,
체크리스트의 모든 항목을 진행해줘.
필요하면 docs/01~04 의 컨텍스트 문서도 함께 참조할 것.
완료된 항목은 체크리스트에 [x] 표시해줘.
```

### 특정 섹션 작업 시
```
docs/phases/02-sections/[섹션명].md 와
docs/01-brand-identity.md, docs/03-design-system.md 를 먼저 읽고,
해당 섹션을 시안과 픽셀 매칭으로 구현해줘.
디자인 토큰과 브랜드 톤은 절대 임의로 바꾸지 말 것.
한/영 양쪽 messages 키도 반드시 함께 갱신할 것.
```

---

## 8. 디자이너 확정 대기 항목 (Blocking Items)

> 아래 항목이 확정되어야 디자인 시스템 토큰이 정확해집니다.

- [ ] Deep Navy / Primary Blue / Light Blue 정확한 HEX
- [ ] 폰트 패밀리 (한글·영문)
- [ ] Type scale (Display / H1~H3 / Body / Small)
- [ ] Spacing scale·Border radius·Shadow 정확값
- [ ] 4개 문제 카드의 일러스트/아이콘 에셋
- [ ] Hero 키 비주얼 에셋
- [ ] 솔루션 실물 제품 이미지 **4종 × 2컷 = 8컷** (DRDH 전면/상세, SHAT 전면/상세, RADM 전면/상세, ARMS 전면/상세)
- [ ] SHAT / RADM / ARMS 의 기능·특징·메트릭 수치 확정 (현재 messages/*.json 은 잠정 플레이스홀더)
- [ ] Solutions 섹션 배경 톤이 `--color-blue-100` (#DCE9F4) 과 완전 동일한지 디자이너 확인
- [ ] 적용 사례 이미지 (발코니/욕실/드레스룸/창문형)
- [ ] 로고 SVG (컬러/모노)

---

## 9. 변경 이력

| 날짜 | 변경 내용 |
|---|---|
| 2026-04-16 | 초기 셋업 |
| 2026-04-16 | 시안 수령 → 기술 스택 확정 / 솔루션 라인업 추가 / 회사명(코리잡) 반영 |
| 2026-04-20 | Solutions 섹션 시안 정합 재구성 — 탭 순서·라벨 갱신, 기능·특징·메트릭 스키마 도입 |
| 2026-04-20 | 반응형 정비 — `--header-h`·`--section-py-md` 토큰 도입, `md:` 브레이크포인트 체계 수립, `next/image` `sizes` 전수 지정, 탭 모바일 2x2 그리드, Carousel Embla select 구독 버그 수정. Contact 폼 5필드 축소(spaces/interests 제거) |
| 2026-04-21 | WHY 섹션 시안 정합 재구성 — 헤더 2단 → 1단 세로 + `subtitle` 키 신설, 카드 플레이스홀더를 `XeaLabFrame` 4종(frame, frame-1~3)으로 교체, 뱃지 문구 '설계 적용' 시리즈로 갱신 |
