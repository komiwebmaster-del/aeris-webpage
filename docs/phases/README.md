# 🗂 Phases — 작업 진행 순서 & 체크리스트

> 본 폴더는 AERIS 홍보 페이지 구축을 단계별로 쪼갠 작업 명세서입니다.
> Claude Code 에게 작업을 시킬 때 **반드시 해당 Phase 의 README 를 먼저 읽도록** 지시합니다.

---

## 작업 흐름

```
[00 Setup]
  └─→ [01 Design System]
        └─→ [02 Sections]  ← 9개 섹션 병렬 가능
              └─→ [03 Content & i18n]
                    └─→ [04 Form Backend]
                          └─→ [05 Polish]
                                └─→ [06 Launch]
```

---

## Phase 진행 체크리스트

### Phase 0 — Setup ⏳
**목표:** Next.js 프로젝트 초기화, 디자인 토큰 정의, 폴더 구조 확립
- [ ] Next.js 15 (App Router) + TypeScript 프로젝트 생성
- [ ] Tailwind CSS v4 설정
- [ ] `globals.css` 에 모든 CSS 변수 토큰 정의
- [ ] `tailwind.config.ts` 에서 토큰 매핑
- [ ] `next-intl` 셋업 (한국어 default, 영어 보조)
- [ ] `[locale]` 라우트 구조 생성
- [ ] 빈 `layout.tsx` + `page.tsx` 골격
📄 **명세:** [`00-setup.md`](./00-setup.md)

---

### Phase 1 — Design System ⏳
**목표:** 모든 UI 컴포넌트 (Atom + Molecule) 구현, Storybook 없이 `/dev` 라우트로 검수
- [ ] Button (Primary / Secondary / Ghost)
- [ ] Badge / Tag (Pill)
- [ ] Eyebrow Label (─ TEXT 형태)
- [ ] Input / Textarea / Checkbox / Radio
- [ ] Tab (탭 바)
- [ ] Accordion
- [ ] Image Carousel
- [ ] Form Field (Label + Input + Error)
- [ ] Section / Container 레이아웃 래퍼
📄 **명세:** [`01-design-system.md`](./01-design-system.md)

---

### Phase 2 — Sections ⏳
**목표:** 9개 섹션을 시안과 픽셀 매칭하며 구현. 각 섹션은 독립 가능 (병렬 작업 OK).

| # | 섹션 | 명세 파일 | 의존 컴포넌트 |
|---|---|---|---|
| 1 | Header | [`02-sections/header.md`](./02-sections/header.md) | Button, LocaleSwitcher |
| 2 | Hero | [`02-sections/hero.md`](./02-sections/hero.md) | Button, Badge |
| 3 | Why AERIS | [`02-sections/why-aeris.md`](./02-sections/why-aeris.md) | Card, Badge, Eyebrow |
| 4 | Solutions | [`02-sections/solutions.md`](./02-sections/solutions.md) | Tab, Carousel, Button |
| 5 | Use Cases | [`02-sections/use-cases.md`](./02-sections/use-cases.md) | Card, Badge |
| 6 | Process | [`02-sections/process.md`](./02-sections/process.md) | — (자체 구현) |
| 7 | FAQ | [`02-sections/faq.md`](./02-sections/faq.md) | Accordion |
| 8 | Contact | [`02-sections/contact.md`](./02-sections/contact.md) | FormField, Button |
| 9 | Footer | [`02-sections/footer.md`](./02-sections/footer.md) | — |

📄 **공통 규칙:** [`02-sections/README.md`](./02-sections/README.md)

---

### Phase 3 — Content & i18n ⏳
**목표:** 카피·이미지·한영 번역을 모두 적용. 사업측 자료 의존도가 가장 높은 단계.
- [ ] 모든 섹션 한국어 카피 적용 (`messages/ko.json`)
- [ ] 영문 번역 (`messages/en.json`)
- [ ] 이미지 에셋 정리·최적화
- [ ] FAQ 5개 실제 Q&A 작성
- [ ] DRDH/RADM/ARMS 솔루션 사양 입력
📄 **명세:** [`03-content-i18n.md`](./03-content-i18n.md)

---

### Phase 4 — Form Backend ⏳
**목표:** 문의 폼 제출 처리, 이메일 발송, 스팸·검증 처리
- [ ] `/api/inquiry` route handler
- [ ] zod 스키마 검증
- [ ] Resend(또는 대체) 이메일 발송
- [ ] honeypot / rate limit
- [ ] 성공·실패 UI 처리
📄 **명세:** [`04-form-backend.md`](./04-form-backend.md)

---

### Phase 5 — Polish ⏳
**목표:** 디테일 마감 — 애니메이션·접근성·SEO·성능
- [ ] 스크롤 등장 애니메이션 (절제)
- [ ] WCAG AA 접근성 검수
- [ ] 메타태그·OG·JSON-LD (Organization, FAQPage)
- [ ] Lighthouse 90+ 달성
- [ ] 이미지 lazy + WebP/AVIF 변환
📄 **명세:** [`05-polish.md`](./05-polish.md)

---

### Phase 6 — Launch ⏳
**목표:** 배포·도메인 연결·분석 도구 셋업
- [ ] Vercel 프로젝트 연결
- [ ] 도메인 DNS 설정
- [ ] GA4 또는 Plausible 셋업
- [ ] Cookie/PIPA 동의 배너
- [ ] 사이트맵·robots.txt
📄 **명세:** [`06-launch.md`](./06-launch.md)

---

## Claude Code 에게 작업 지시할 때

```
docs/phases/[해당 phase 파일] 와
참조 문서(docs/01~04)를 먼저 읽고,
체크리스트의 [작업명]을 진행해줘.
완료된 항목은 체크리스트에 [x] 표시해줘.
```

---

## 진행 상태 (수동 갱신)

| Phase | 상태 | 시작일 | 완료일 | 비고 |
|---|---|---|---|---|
| 0 — Setup | ⏳ | — | — | — |
| 1 — Design System | ⏳ | — | — | — |
| 2 — Sections | ⏳ | — | — | — |
| 3 — Content & i18n | ⏳ | — | — | 사업측 자료 의존 |
| 4 — Form Backend | ⏳ | — | — | — |
| 5 — Polish | ⏳ | — | — | — |
| 6 — Launch | ⏳ | — | — | — |

**상태 아이콘:** ⏳ 대기 / 🟡 진행 중 / ✅ 완료 / ⛔ 블로킹
