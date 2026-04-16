# Section — Contact (상담 및 문의 신청)

> **목적:** B2B/B2C 양쪽의 문의를 받는 메인 폼. 페이지 전환의 최종 목적지.
> **참고:** 본 README 는 UI 만 다룸. 백엔드 처리는 [`../04-form-backend.md`](../04-form-backend.md).

---

## 시안 참조
- 모바일·데스크탑 모두 FAQ 바로 아래
- 큰 폼 영역

## 앵커
- `#contact`

---

## 레이아웃

### 모바일·데스크탑 공통
헤더 좌측 정렬 + 폼 영역.

```
─ CONTACT
상담 및 문의 신청

┌───────────────────────────┐
│                           │
│       [문의 폼]            │
│                           │
└───────────────────────────┘
```

- 폼 컨테이너: white 배경 + 보더 (`--color-gray-300`) + radius `--radius-lg`
- 패딩: 모바일 24px / 데스크탑 48px
- 데스크탑에서 폼 너비: max 720px 정도

---

## 콘텐츠 — 헤더

| 요소 | 한국어 | i18n key |
|---|---|---|
| Eyebrow | `CONTACT` | `contact.eyebrow` |
| Headline | `상담 및 문의 신청` | `contact.headline` |
| Subtext | `문의 내용을 남겨주시면 영업일 기준 24시간 내 담당자가 연락드립니다.` | `contact.subtext` |

---

## 폼 필드 (시안엔 영역만 있음 — 명세 확정안)

| # | 필드 | 타입 | required | placeholder / hint |
|---|---|---|---|---|
| 1 | 이름 | text | ✓ | `홍길동` |
| 2 | 연락처 | tel | ✓ | `010-0000-0000` |
| 3 | 이메일 | email | ✓ | `name@example.com` |
| 4 | 문의 유형 | radio | ✓ | `B2B (프로젝트)` / `B2C (개인)` |
| 5 | 적용 공간 | checkbox (multi) | — | `발코니` / `욕실` / `드레스룸` / `창문형` / `기타` |
| 6 | 관심 솔루션 | checkbox (multi) | — | `통합공조 (SHAT)` / `빌트인 제습 (DRDH)` / `창문형/모듈 (RADM)` / `미정` |
| 7 | 문의 내용 | textarea | ✓ | `프로젝트 규모, 일정, 궁금하신 점을 자유롭게 작성해주세요.` (rows 5) |
| 8 | 개인정보 수집·이용 동의 | checkbox | ✓ | `[보기]` 링크 |
| 9 | 제출 버튼 | — | — | `상담 신청` (Primary, full-width on mobile) |

> 위 필드 구성은 **사업측 확정 필요**. 시안엔 폼 영역만 있어 추정안임.

---

## 검증 (zod)

```ts
import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phone: z.string().regex(/^[0-9-+ ]{9,}$/, '올바른 연락처 형식이 아닙니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  type: z.enum(['b2b', 'b2c']),
  spaces: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  message: z.string().min(10, '문의 내용을 10자 이상 작성해주세요'),
  agreeTerms: z.literal(true, { message: '개인정보 수집에 동의해주세요' }),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
```

---

## 인터랙션 / 상태

- **idle** — 기본 상태
- **submitting** — 버튼 disabled + spinner
- **success** — 폼이 사라지고 성공 메시지 노출 (`문의가 접수되었습니다. 영업일 기준 24시간 내 연락드립니다.`)
- **error** — 인라인 에러 메시지 (필드별) + 상단 에러 토스트 (`전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.`)

solution 탭에서 prefill 처리:
- URL `?solution=shat` 진입 시 `interests` 에 `통합공조 (SHAT)` 자동 체크

---

## 의존 컴포넌트

- `Section`, `Container`
- `Eyebrow`
- `FormField`
- `Input`, `Textarea`
- `Checkbox`, `Radio`
- `Button`
- `react-hook-form` + `zod`

---

## 콘텐츠 의존성

- [ ] 폼 필드 구성 확정 (사업측)
- [ ] 개인정보 수집·이용 동의 전문
- [ ] 영문 라벨·placeholder·에러 메시지

---

## ✅ DoD (UI만 — Phase 4 와 분리)

- [ ] 모든 필드 렌더, 라벨·placeholder 정확
- [ ] zod 검증 동작 (제출 버튼 클릭 시)
- [ ] 필드별 에러 메시지 표시
- [ ] required 필드에 `*` 표시 + `aria-required="true"`
- [ ] 키보드 Tab 순서 자연스러움
- [ ] 모바일에서 키보드 올라올 때 입력 영역 가려지지 않음
- [ ] 제출 버튼 모바일 full-width
- [ ] 성공/실패 상태 모킹으로 UI 검증 가능
