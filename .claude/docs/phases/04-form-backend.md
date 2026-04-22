# Phase 04 — Form Backend

> **목표:** 문의 폼 제출 처리 + 이메일 발송 + 검증·보안 처리.
> **선행:** Phase 2 Contact UI / **후행:** Phase 5

---

## 📌 채택안: Web3Forms (클라이언트 전용)

- **이유:** 프로젝트 방침이 "백엔드 서버 없이" 운영 — API Route·SMTP·DB 를 도입하지 않는다.
- **원리:** 폼 데이터 → 클라이언트에서 바로 `https://api.web3forms.com/submit` 로 POST → Web3Forms 대시보드에 등록된 수신 주소로 이메일 포워딩.
- **수신 주소:** Web3Forms 대시보드에서 관리. 코드에는 access_key 만 존재하므로, 주소 교체 시 코드 변경 불필요.
- **무료 한도:** 250건/월 (MVP·초기 운영에 충분).

---

## 1. 백엔드 옵션 비교

| 옵션 | 장점 | 단점 | 선택 여부 |
|---|---|---|---|
| **Web3Forms** (채택) | API Route 불필요, SDK 불필요, 클라이언트 fetch 만으로 동작 | 커스텀 템플릿 제약, 무료 250/월 | ✅ |
| Formspree | 유사 방식, 대시보드 풍부 | 무료 50/월로 한도 작음 | ❌ |
| Resend + Next API Route | 도메인 인증, React Email 템플릿, 3000/월 | 자체 API Route 유지 필요 | ❌ (방침 위배) |
| 자체 SMTP (nodemailer) | 풀 컨트롤 | 발송 안정성·도메인 신뢰도 직접 관리 | ❌ |

---

## 2. 환경 변수

`.env.local`:
```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- `NEXT_PUBLIC_` 접두어 필수 (클라이언트 번들에 주입됨).
- 이 키는 **공개된다**. Web3Forms 는 이 전제 하에 설계된 서비스.
- 보안은 **대시보드의 Domain Allowlist** 로 확보 (허용된 Origin 외에서는 발송 불가).
- `.env.example` 에 키 이름만 기록 (값은 비움).

---

## 3. 클라이언트 측 구현

`src/components/sections/contact/index.tsx` 의 `onSubmit`:

```ts
const onSubmit = async (data: InquiryInput) => {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) { setStatus('error'); return; }

  setStatus('submitting');
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[AERIS 문의] ${data.name} (${data.type.toUpperCase()})`,
        from_name: 'AERIS 랜딩 페이지',
        replyto: data.email,
        botcheck: data.botcheck ?? '',
        이름: data.name,
        연락처: data.phone,
        이메일: data.email,
        문의유형: data.type === 'b2b' ? 'B2B (프로젝트·설비)' : 'B2C (가정·개인)',
        문의내용: data.message?.trim() || '-',
      }),
    });
    const json = await res.json();
    if (!res.ok || !json?.success) throw new Error();
    reset();
    setStatus('success');
  } catch {
    setStatus('error');
  }
};
```

주요 포인트:
- `replyto` 로 사용자 이메일 지정 → 수신자가 회신 버튼 누르면 사용자에게 바로 답장
- `subject` 에 B2B/B2C 를 붙여 메일함에서 즉시 식별
- 한글 키 (`이름`, `연락처` 등) 는 Web3Forms 가 자동으로 이메일 본문 테이블에 렌더링

---

## 4. 보안

### Honeypot (`botcheck`)
Web3Forms 가 공식 지원하는 예약 필드. zod 스키마에 `botcheck: z.string().optional()` 추가하고 폼에 숨김 input 렌더:

```tsx
<input
  type="text"
  {...register('botcheck')}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  className="absolute -left-[9999px] h-0 w-0 opacity-0"
/>
```

봇이 값을 채우면 Web3Forms 가 서버단에서 스팸으로 처리 (메일 미발송, 대시보드 Spam 탭에 기록).

### Domain Allowlist
Web3Forms 대시보드에서 허용 Origin 지정 — 탈취된 키로 타 도메인에서 발송 불가.

### Rate Limiting
Web3Forms 가 access_key 당 자체 rate limit 적용. 별도 Upstash 도입 불필요.

### XSS
사용자 입력은 메일 본문으로만 전달되고 페이지에서 재렌더링되지 않음. 수신 메일 클라이언트 책임 영역.

### CAPTCHA
스팸 실제 발생 시에만 Cloudflare Turnstile 추가 (현 단계 보류).

### 개인정보
- 서버 저장 없음 (Web3Forms 전송 기록만 대시보드에 30일 보관)
- 콘솔 로그 금지 (`console.log(data)` 금지)

---

## 5. 테스트

로컬 `pnpm dev` 에서:

- ✅ 정상 제출 → `[AERIS 문의] ...` 제목으로 수신함 도착
- ✅ 필수 필드 누락 → 제출 버튼 누르면 인라인 에러, 네트워크 요청 없음
- ✅ 허니팟 강제 주입 → 200 응답이지만 메일 미도착 (대시보드 Spam 탭에서 확인)
- ✅ Network Offline → error 배너 (`contact.error`) 노출
- ✅ `/en/#contact` 영문 UI 정상
- ✅ `pnpm build` 통과

---

## ✅ DoD

- [ ] `.env.local` 에 `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` 설정
- [ ] Web3Forms 대시보드 Domain Allowlist 에 배포·개발 도메인 등록
- [ ] 실제 이메일 수신 확인
- [ ] zod 검증 + 허니팟 동작
- [ ] 성공 시 폼 reset + success 화면 전환
- [ ] 네트워크 실패 시 error 상태 복구 가능 (재시도 가능)
- [ ] 환경 변수가 git 에 노출되지 않음 (`.env.local` gitignore)

---

## 다음 단계

→ [`05-polish.md`](./05-polish.md)
