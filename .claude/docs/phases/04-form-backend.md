# Phase 04 — Form Backend

> **목표:** 문의 폼 제출 처리 + 이메일 발송 + 검증·보안 처리.
> **선행:** Phase 2 Contact UI / **후행:** Phase 5

---

## 1. 백엔드 옵션 비교

| 옵션 | 장점 | 단점 | 추천 상황 |
|---|---|---|---|
| **Resend** + Next API Route | 간단, 도메인 인증, React Email 템플릿 | 월 free 3000건 후 유료 | **권장** — 일반적 케이스 |
| **Formspree / Web3Forms** | API Route 불필요, 무료 한도 | 커스터마이징 제약 | 빠른 MVP |
| **자체 SMTP** (nodemailer) | 풀 컨트롤 | 발송 안정성·도메인 신뢰도 직접 관리 | 회사 메일서버 강제 시 |

> **이 가이드는 Resend 기준**. 다른 옵션 선택 시 §3 만 변경.

---

## 2. API Route 골격

`src/app/api/inquiry/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { inquirySchema } from '@/lib/validators/inquiry';
import { rateLimit } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  // 1. Rate limit (IP 기반)
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const ok = await rateLimit(ip, 5, 60_000);  // 1분 5회
  if (!ok) return NextResponse.json({ error: 'rate_limit' }, { status: 429 });

  // 2. Honeypot
  const body = await req.json();
  if (body.website) return NextResponse.json({ ok: true });  // 봇 무시

  // 3. zod 검증
  const result = inquirySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: 'invalid', details: result.error.flatten() }, { status: 400 });
  }

  // 4. 이메일 발송
  try {
    await resend.emails.send({
      from: 'AERIS Inquiry <noreply@aeris.example.com>',
      to: process.env.INQUIRY_RECIPIENT!,
      replyTo: result.data.email,
      subject: `[AERIS 문의] ${result.data.name} (${result.data.type.toUpperCase()})`,
      html: renderEmailHtml(result.data),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'send_failed' }, { status: 500 });
  }
}
```

---

## 3. 환경 변수

`.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
INQUIRY_RECIPIENT=sales@aeris.example.com
INQUIRY_BCC=admin@korijob.com
```

`.env.example` 에 키 이름만 기록해서 git 커밋 (값은 비움).

---

## 4. 이메일 템플릿

옵션 A — 인라인 HTML 함수:
```ts
const renderEmailHtml = (data: InquiryInput) => `
  <h2>새 문의가 접수되었습니다</h2>
  <table>
    <tr><th>이름</th><td>${data.name}</td></tr>
    <tr><th>연락처</th><td>${data.phone}</td></tr>
    <tr><th>이메일</th><td>${data.email}</td></tr>
    <tr><th>문의 유형</th><td>${data.type === 'b2b' ? 'B2B' : 'B2C'}</td></tr>
    <tr><th>적용 공간</th><td>${data.spaces?.join(', ') ?? '-'}</td></tr>
    <tr><th>관심 솔루션</th><td>${data.interests?.join(', ') ?? '-'}</td></tr>
    <tr><th>문의 내용</th><td>${escapeHtml(data.message)}</td></tr>
  </table>
`;
```

옵션 B — `@react-email/components` 로 컴포넌트 기반 템플릿 (권장, 유지보수 쉬움).

> ⚠️ XSS 방지: 사용자 입력은 반드시 escape.

---

## 5. 보안

### Honeypot
폼에 화면에 보이지 않는 hidden input `website` 필드 추가:
```tsx
<input type="text" name="website" tabIndex={-1} autoComplete="off"
  className="absolute -left-[9999px]" aria-hidden="true" />
```
값이 채워져 있으면 봇으로 간주, 무시 (200 응답).

### Rate Limiting
간단 in-memory (Vercel Edge 에서는 부적합) 또는 **Upstash Redis**:
```bash
pnpm add @upstash/ratelimit @upstash/redis
```
```ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'),
});
```

### CORS
같은 도메인이라 일반적으로 불필요. API 가 외부 호출 받지 않게 `Origin` 검증.

### 개인정보 처리
- 이메일 발송 후 서버에 저장하지 않음 (DB 사용 시 보관 정책 명시)
- 로그에 개인정보 출력 금지 (`console.log(data)` 금지)
- 영업일 기준 보존 기간 사업측과 합의

---

## 6. 클라이언트 측 처리

`Contact` 섹션의 onSubmit:

```ts
const onSubmit = async (data: InquiryInput) => {
  setStatus('submitting');
  try {
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('submit_failed');
    setStatus('success');
    form.reset();
  } catch {
    setStatus('error');
  }
};
```

성공 메시지·에러 메시지는 `messages/*.json` 의 `common.form` 네임스페이스에서.

---

## 7. 테스트

- 정상 제출 → 메일 수신 확인
- 필수 필드 누락 → 400 + 인라인 에러
- 봇 honeypot 채움 → 200 (조용히 무시) + 메일 미발송
- 1분 5회 초과 → 429
- 잘못된 이메일 형식 → 400

---

## ✅ DoD

- [ ] `/api/inquiry` POST 정상 응답
- [ ] zod 검증 동작
- [ ] Honeypot 동작
- [ ] Rate limit 동작
- [ ] 이메일 정상 발송 (테스트 메일 수신)
- [ ] 사용자 입력 XSS 방어
- [ ] 환경 변수가 git 에 노출되지 않음 (`.env.local` 은 gitignore)
- [ ] 성공·실패 UI 정상 동작

---

## 다음 단계

→ [`05-polish.md`](./05-polish.md)
