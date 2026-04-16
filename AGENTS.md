# AERIS — Business Promo Page

> **Air, Engineered.** — AERIS HVAC 브랜드의 비즈니스 홍보 웹 페이지 프로젝트.

---

## 📌 프로젝트 개요

AERIS(에리스)는 환기·제습·정화·살균 기능을 통합하여 실내 공기환경을 공학적으로 설계하고 운영하는 HVAC 브랜드입니다. 본 프로젝트는 AERIS의 브랜드 가치와 솔루션을 B2B/B2C 양 시장에 효과적으로 전달하는 **공식 홍보 페이지**를 구축합니다.

---

## 🧭 빠른 시작 (Claude Code 사용자)

이 프로젝트는 **Claude Code (Claude CLI) 기반 협업**을 전제로 셋업되어 있습니다.

```bash
# 1. 프로젝트 루트에서 Claude Code 실행
claude

# 2. 첫 프롬프트는 항상 컨텍스트 로드부터
> docs/ 아래 모든 파일을 읽고 작업을 시작해줘
```

Claude Code는 루트의 `CLAUDE.md` 를 자동으로 읽지만, `docs/` 의 세부 문서는 명시적으로 지시해야 로드됩니다.

---

## 📂 문서 구조

| 파일 | 내용 |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Claude Code 자동 로드 — 프로젝트 핵심 규칙 |
| [`docs/01-brand-identity.md`](./docs/01-brand-identity.md) | AERIS 브랜드 아이덴티티 가이드 |
| [`docs/02-project-brief.md`](./docs/02-project-brief.md) | 홍보 페이지 목적·타겟·페이지 구조 |
| [`docs/03-design-system.md`](./docs/03-design-system.md) | 디자인 시스템 (시안 수령 후 채움) |
| [`docs/04-content-tone.md`](./docs/04-content-tone.md) | 카피 톤앤매너 가이드 |

---

## 🛠 기술 스택

> 미확정 — 첫 작업 진입 시 결정 후 본 섹션 갱신.

- **프레임워크:** TBD (Next.js / Astro 후보)
- **언어:** TypeScript
- **스타일:** Tailwind CSS
- **패키지 매니저:** pnpm (권장)
- **배포:** TBD

---

## 🤝 작업 흐름

1. 디자이너가 와이어프레임/시안을 전달
2. `docs/03-design-system.md` 에 디자인 토큰·컴포넌트 사양 정리
3. Claude Code로 섹션별 컴포넌트 구현
4. 콘텐츠는 `docs/04-content-tone.md` 의 톤을 따라 작성
5. 리뷰 및 배포

---

## 📞 연락

프로젝트 관련 문의는 담당자에게 직접 연락 부탁드립니다.
