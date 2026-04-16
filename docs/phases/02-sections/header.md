# Section — Header

> **목적:** 모든 페이지에서 sticky 노출되는 상단 네비게이션. 로고 + 언어 토글 + Primary CTA.

---

## 시안 참조
- 모바일·데스크탑 시안 모두 최상단

## 앵커
- 자체 앵커 없음 (sticky 네비)

---

## 레이아웃

### 모바일
```
[ AERIS 로고 ]                [ 한/a ] [ 무료 상담 신청 ]
```

### 데스크탑
```
[ AERIS 로고 ]                                      [ 한/a ] [ 무료 상담 신청 ]
```

- height: 64px (모바일) / 72px (데스크탑)
- 배경: white, 스크롤 시 미세한 하단 보더 또는 그림자
- `position: sticky; top: 0; z-index: 50`

---

## 콘텐츠

| 요소 | 한국어 | 영어 |
|---|---|---|
| 로고 alt | `AERIS by 코리잡` | `AERIS by Korijob` |
| CTA 버튼 | `무료 상담 신청` | `Free Consultation` |
| 언어 토글 (한) | `한` | — |
| 언어 토글 (영) | `a` | — |

i18n 키:
```json
"header": {
  "ctaInquiry": "무료 상담 신청",
  "logoAlt": "AERIS by 코리잡"
}
```

---

## 인터랙션

- **로고 클릭:** `/` (자국어 홈)으로 이동
- **CTA 클릭:** `#contact` 로 부드러운 스크롤
- **언어 토글:** 같은 라우트에서 locale 만 교체 (next-intl `Link`)
- **스크롤 시:** 헤더에 `backdrop-blur` + 미세한 하단 보더 추가 (옵션)

---

## 의존 컴포넌트

- `Button` (variant=`primary`, size=`sm`)
- `LocaleSwitcher`

---

## 콘텐츠 의존성

- [ ] AERIS 로고 SVG (확정 컬러 버전)

---

## ✅ DoD

- [ ] sticky 동작 (스크롤 시 항상 노출)
- [ ] 모바일에서 로고·언어·CTA 가 한 줄에 안정적 배치
- [ ] CTA 클릭 시 #contact 부드러운 스크롤
- [ ] 언어 토글 시 라우트 정확히 전환, 현재 언어가 굵게 표시
- [ ] z-index 충돌 없음
