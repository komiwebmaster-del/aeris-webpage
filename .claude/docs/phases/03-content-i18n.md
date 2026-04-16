# Phase 03 — Content & i18n

> **목표:** 모든 텍스트 콘텐츠·이미지·번역을 적용. 사업측 자료 의존도가 가장 높은 단계.
> **선행:** Phase 2 / **후행:** Phase 4

---

## 1. messages/ko.json·en.json 구조

`02-sections/README.md` 의 i18n 네임스페이스 규칙을 따른다. 각 섹션의 README 에 명시된 키를 모두 채운다.

```json
{
  "header": { ... },
  "hero": { ... },
  "why": { "eyebrow": "...", "headline": "...", "cards": { "mold": { ... }, ... } },
  "solutions": {
    "eyebrow": "SOLUTIONS",
    "headline": "...",
    "shat": { "title": "...", "specs": ["...", "..."], "cta": "..." },
    "drdh": { ... },
    "radm": { ... },
    "arms": { ... }
  },
  "useCases": { ... },
  "process": { ... },
  "faq": { ... },
  "contact": { ... },
  "footer": { ... },
  "common": {
    "cta": { "inquiry": "지금 문의하기", "viewSolutions": "솔루션 보기" },
    "form": { "submit": "상담 신청", "submitting": "전송 중...", "success": "...", "error": "..." }
  }
}
```

---

## 2. 콘텐츠 확보 체크리스트

### 사업측 확보 필요
- [ ] **FAQ 5개 Q&A 본문**
- [ ] **DRDH / RADM / ARMS 솔루션 사양** (각 4개씩)
- [ ] **회사 정보** — 대표전화 / 영업문의 / 사업자등록번호
- [ ] **개인정보처리방침 전문**
- [ ] **이용약관 전문**
- [ ] 폼 필드 구성 최종 확정
- [ ] Use Cases 4개 공간별 정확한 태그
- [ ] Hero 영문 헤드라인·본문

### 디자이너 확보 필요
- [ ] **로고 SVG** — 컬러 / 모노 / 화이트 on Navy
- [ ] **Hero 키 비주얼**
- [ ] **Why 4개 카드 일러스트**
- [ ] **Solutions 캐러셀 이미지 12컷** (탭 4 × 3컷)
- [ ] **Use Cases 4컷** (발코니/욕실/드레스룸/창문형)
- [ ] **OG 이미지** (1200×630)
- [ ] **Favicon 세트** (favicon.ico, apple-touch-icon, icon-192/512)

---

## 3. 영문 번역 원칙

- **슬로건 *Air, Engineered.* 는 변형 금지**
- 솔루션 약어 (SHAT/DRDH/RADM/ARMS) 는 영문 그대로 유지
- 한국어 → 영어 번역은 **단순 축어역 금지**, 영문 비즈니스 톤으로 자연스럽게 재작성
- 영문이 길어져 레이아웃이 깨지면 디자이너와 협의 (예: Hero 헤드라인 줄수)
- 미국식 영어 표기 (organize, color)

### 핵심 카피 영문 가이드 (예시)

| 한국어 | 영어 (예시 — 검수 필요) |
|---|---|
| Air, Engineered. | Air, Engineered. *(불변)* |
| 발코니부터 시작하는 완전한 실내 공기환경 설계 | A complete indoor air system, starting from your balcony. |
| 무료 상담 신청 | Free Consultation |
| 지금 문의하기 | Get a Quote |
| 솔루션 보기 | View Solutions |
| 왜 AERIS인가? | Why AERIS? |
| 공간에 맞는 AERIS 솔루션 | AERIS Solutions for Every Space |
| 공간별 적용 사례 | Applications by Space |
| 진행 프로세스 | Process |
| 상담 및 문의 신청 | Get in Touch |

> 위는 초안. 사업측 또는 전문 번역가 검수 필수.

---

## 4. 이미지 처리

### 위치
```
public/
├── logo/
│   ├── aeris-color.svg
│   ├── aeris-mono.svg
│   └── aeris-white.svg
├── hero/
│   └── key-visual.jpg
├── why/
│   ├── mold.svg
│   ├── odor.svg
│   ├── humidity.svg
│   └── common.svg
├── solutions/
│   ├── shat-1.jpg, shat-2.jpg, shat-3.jpg
│   ├── drdh-1.jpg, ...
│   └── ...
├── use-cases/
│   ├── balcony.jpg
│   ├── bathroom.jpg
│   ├── dressroom.jpg
│   └── window.jpg
└── og/
    └── default.jpg
```

### 최적화
- 사진(JPEG): WebP/AVIF 변환 권장 (`sharp` 또는 빌드 플러그인)
- SVG: SVGO 로 압축
- `next/image` 의 `quality={85}` 기본값 사용
- LCP 후보(Hero 키 비주얼)에 `priority`

---

## 5. 메타데이터 (페이지 단위)

`src/app/[locale]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
    },
    alternates: {
      languages: { ko: '/ko', en: '/en' },
    },
  };
}
```

`messages/ko.json` 에 `meta` 네임스페이스 추가:
```json
"meta": {
  "title": "AERIS — Air, Engineered. | HVAC 통합 솔루션",
  "description": "AERIS는 환기·제습·정화·살균을 하나의 시스템으로 통합한 HVAC 브랜드입니다. 발코니부터 시작하는 완전한 실내 공기환경 설계.",
  "ogTitle": "AERIS — Air, Engineered.",
  "ogDescription": "공기를 설계하다. AERIS by 코리잡."
}
```

---

## 6. JSON-LD (Phase 5 와 일부 겹침)

- `Organization` — 회사 정보 (전화, 사업자번호, 로고)
- `FAQPage` — FAQ 5개

`src/app/[locale]/layout.tsx` 의 `<head>` 에 `<script type="application/ld+json">` 으로 주입.

---

## ✅ DoD

- [ ] 모든 섹션 컴포넌트가 `useTranslations` 로 텍스트 출력 (하드코딩 0건)
- [ ] `messages/ko.json` 100% 채움
- [ ] `messages/en.json` 100% 채움 (검수 후)
- [ ] 모든 이미지 에셋이 `public/` 에 정리·최적화됨
- [ ] 로고·favicon·OG 이미지 적용
- [ ] 메타태그 한·영 모두 정확
- [ ] FAQ JSON-LD 주입
- [ ] 한·영 라우트 전환 시 콘텐츠 정확히 변경

---

## 다음 단계

→ [`04-form-backend.md`](./04-form-backend.md)
