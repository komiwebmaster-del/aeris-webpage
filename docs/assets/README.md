# AERIS — Brand Assets Spec

> 디자이너 작업 가이드. 작업물은 모두 이 폴더(`docs/assets/`)의 해당 서브폴더에 드롭해주세요.
> 개발자(Claude Code)는 에셋이 폴더에 들어오면 코드 적용을 진행합니다.

---

## 0. 작업 우선순위

```
[ ] 1. Favicon            ← 가장 시급. 현재 Next.js 기본 ▲ 노출 중
[ ] 2. 로고 SVG (컬러/모노) ← Header·Footer·문서 전반에 사용
[ ] 3. App Icon (PWA·iOS) ← 모바일 홈 화면 추가 시 사용
[ ] 4. OG 비주얼          ← 선택. 현재 코드로 동적 생성 중
```

---

## 1. 브랜드 컬러 (이미 확정 — 참고용)

`src/styles/globals.css` 에 정의된 디자인 토큰. 디자이너가 새 에셋을 만들 때 이 HEX 만 사용하세요.

| 토큰 | HEX | 용도 |
|---|---|---|
| Deep Navy | `#0A1738` | Hero·Footer 배경, 파비콘 배경, OG 그라데이션 시작 |
| Navy 900 | `#0E1F45` | OG 그라데이션 끝 |
| Primary Blue | `#2E6FB8` | CTA 버튼, 강조 |
| Blue 500 | `#4A8AC4` | 보조 강조 |
| Blue 300 | `#8FB8DD` | OG 보조 텍스트 |
| Light Blue | `#DCE9F4` | Solutions 섹션 배경 |
| White | `#FFFFFF` | 텍스트 (네이비 배경 위) |

---

## 2. Favicon ⭐ 최우선

### 필요 파일
| 파일명 | 크기 | 용도 |
|---|---|---|
| `favicon.ico` | multi-size (16·32·48 포함) | 레거시 브라우저, 일부 검색 엔진 |
| `icon.png` | 512×512 | Next.js 가 자동 리사이즈해서 모던 브라우저에 제공 |
| `apple-icon.png` | 180×180 | iOS Safari, 홈 화면 추가 |

### 디자인 가이드
- **워드마크(AERIS 글자) 금지** — 16×16 으로 줄면 글자가 안 읽힘. **심볼만** 사용.
- **배경:** Deep Navy `#0A1738` 단색 (또는 흰색 + 네이비 심볼). 그라데이션 X.
- **여백:** 캔버스의 ~15% 안쪽으로 심볼 배치. 가장자리 여유 필수.
- **iOS apple-icon:** 코너 라운드는 **둥글게 만들지 말 것** (iOS가 자동으로 둥글림. 라운드 처리하면 이중 마스크됨).
- **검증 기준:** 16×16 으로 축소했을 때 한눈에 식별되는가?

### 드롭 위치
```
docs/assets/favicon/
├── favicon.ico
├── icon.png
└── apple-icon.png
```

---

## 3. 로고 SVG

### 필요 파일
| 파일명 | 컬러 | 용도 |
|---|---|---|
| `aeris-logo-color.svg` | Navy + Blue | 흰색 배경 (메인) |
| `aeris-logo-mono-light.svg` | 흰색 단색 | 네이비 배경 (Hero, Footer) |
| `aeris-logo-mono-dark.svg` | 네이비 단색 | 밝은 배경, 모노 인쇄용 |
| `aeris-symbol.svg` | 컬러 또는 모노 | 심볼만 분리 (파비콘 베이스) |

### 디자인 가이드
- **워드마크 단독 시 가로 비율 권장:** 약 5:1
- `viewBox` 명시 필수 (반응형 크기 조절을 위해)
- **폰트는 outline 변환** (사용자 환경에 폰트 없어도 동일하게 보이도록)
- stroke 사용 시 **1.5px** 권장 (사이트의 lucide-react 아이콘 가이드와 일관)
- **절대 좌표 사용 X** — viewBox 안 상대 좌표만

### 드롭 위치
```
docs/assets/logo/
├── aeris-logo-color.svg
├── aeris-logo-mono-light.svg
├── aeris-logo-mono-dark.svg
└── aeris-symbol.svg
```

---

## 4. App Icon — PWA·iOS (선택, Phase 2)

PWA 기능(홈 화면 추가, 오프라인 등)을 활성화할 경우 필요. 현재는 우선순위 낮음.

| 파일명 | 크기 |
|---|---|
| `icon-192.png` | 192×192 |
| `icon-512.png` | 512×512 |
| `apple-touch-icon.png` | 180×180 |

### 드롭 위치
```
docs/assets/favicon/
├── icon-192.png
├── icon-512.png
└── apple-touch-icon.png
```

---

## 5. OG 이미지 비주얼 (선택)

> ⚠️ 현재 OG 이미지는 **`src/app/[locale]/opengraph-image.tsx`** 에서 코드로 동적 생성됩니다.
> Navy 그라데이션 + AERIS 워드마크 + 태그라인 + 솔루션명 (SHAT·DRDH·RADM·ARMS) 자동 합성.
> **별도 PNG 없이도 동작**하므로 우선순위 낮음.

비주얼을 추가하고 싶다면:

### 사양
- **크기:** 1200×630 (표준)
- **레이아웃:** 좌측 2/3 = 텍스트 영역 (코드가 채움), **우측 1/3 만 비주얼**
- **톤:** 추상 그래픽, "엔지니어링" 느낌. 제품 사진·일러스트·만화풍 X
- **안전 영역:** 가장자리 60px 여백 필수

### 드롭 위치
```
docs/assets/og/
└── og-visual.png  (또는 .svg)
```

---

## 6. 전달 절차

1. 작업 완료 후 위 표의 해당 폴더에 파일 드롭
2. 코미팜 담당자에게 **"AERIS 에셋 추가 완료"** 1줄 회신 (어떤 파일 추가했는지 명시)
3. 개발자(Claude Code)가 다음 코드를 수정하여 사이트에 반영:
   - `src/app/favicon.ico` 교체
   - `src/app/icon.png`, `src/app/apple-icon.png` 신규 추가
   - `src/app/[locale]/layout.tsx` 의 `icons` 메타에 신규 아이콘 등록
   - 로고 SVG 는 `src/components/layout/Header.tsx`, `Footer.tsx` 등에서 사용

---

## 7. 적용 후 검증

| 항목 | 방법 |
|---|---|
| 파비콘 (탭 아이콘) | Chrome / Safari / Firefox 새 탭에서 확인 |
| iOS 홈 화면 추가 | iPhone Safari → 공유 → "홈 화면에 추가" |
| 카카오톡 공유 썸네일 | 카톡에서 `https://ae-ris.co.kr` 링크 보내기 |
| 슬랙·디스코드 공유 | 동일 링크 첨부 → 미리보기 자동 생성 |
| 페이스북 OG | https://developers.facebook.com/tools/debug/ |
| 트위터 카드 | https://cards-dev.twitter.com/validator |

---

## 8. 기술적 제약 (참고용 — 디자이너는 몰라도 됨)

- OG 이미지는 satori 기반 동적 생성이라 **Tailwind / CSS 변수 미지원**, HEX 리터럴만 사용
- 모든 PNG 는 가능하면 **TinyPNG** 등으로 압축 후 전달
- SVG 는 **SVGO** 로 최적화 후 전달 (불필요한 메타데이터·주석 제거)
- 파일명에 한글·공백·특수문자 금지 (영문 소문자 + 하이픈만)

---

## 9. 자주 묻는 질문

**Q. 파비콘만 받으면 사이트에 즉시 반영되나요?**
A. 디자이너가 폴더에 드롭 → 개발자가 코드 적용(약 5분) → Vercel 자동 배포(약 2분) → 약 7분 후 라이브.

**Q. ICO 파일은 어떻게 만드나요?**
A. https://favicon.io/ 또는 https://realfavicongenerator.net/ 에서 PNG 업로드하면 자동 생성됩니다.

**Q. 기존 디자인 시안에서 색상을 좀 바꿔도 되나요?**
A. 1번 섹션의 HEX 외 사용 금지. 변경이 필요하면 디자인 시스템 수정 요청을 먼저 해주세요.
