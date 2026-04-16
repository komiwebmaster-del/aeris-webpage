# Phase 06 — Launch

> **목표:** 배포·도메인 연결·분석 도구 활성화·런칭 후 모니터링.
> **선행:** Phase 5 / **후행:** 운영 단계

---

## 1. 배포 — Vercel (권장)

### 초기 셋업
1. Vercel 계정 생성 / 팀 워크스페이스 준비
2. GitHub 저장소 연결 (`aeris-promo` 레포)
3. Framework Preset: **Next.js** (자동 감지)
4. Root Directory: `/` (모노레포 아니라면)
5. Build Command: `pnpm build` (자동)
6. Output: `.next` (자동)

### 환경 변수 등록 (Vercel Dashboard → Settings → Environment Variables)
- `RESEND_API_KEY` (Production / Preview / Development 분리)
- `INQUIRY_RECIPIENT`
- `NEXT_PUBLIC_GA_ID`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (rate limit 사용 시)

### 배포 브랜치 전략
- `main` → Production
- `develop` → Preview (스테이징)
- 모든 PR → 자동 Preview URL

---

## 2. 도메인 연결

### Custom Domain 추가
Vercel → Settings → Domains:
- `aeris.example.com` (또는 결정된 도메인)
- `www.aeris.example.com` (선택)

### DNS 설정 (도메인 등록기관)
- A record: `@` → `76.76.21.21` (Vercel)
- CNAME: `www` → `cname.vercel-dns.com`
- 또는 Vercel 안내에 따라

### SSL
- Vercel 자동 (Let's Encrypt)
- 보통 5분 내 활성화

### Redirect
- `www → non-www` (또는 반대) 통일
- `http → https` 강제 (자동)

---

## 3. 한·영 라우트 정리

- 기본 진입 (`/`) 시 한국어로 리다이렉트 또는 한국어 콘텐츠 노출
- next-intl 설정에서 `localePrefix: 'as-needed'` 옵션 권장 (한국어는 prefix 없이, 영어만 `/en` prefix)

```ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'as-needed',
});
```

---

## 4. 분석 도구 활성화

### GA4
- Google Analytics 4 속성 생성
- Measurement ID 발급 (`G-XXXXXXXXXX`)
- Vercel 환경 변수 `NEXT_PUBLIC_GA_ID` 에 입력
- Enhanced Measurement 활성화 (스크롤·외부링크 자동)

### 대안 — Plausible / Umami
프라이버시 친화 + Cookie 배너 불필요.
```bash
# Plausible
<script defer data-domain="aeris.example.com" src="https://plausible.io/js/script.js" />
```

### 이벤트 검증
- DevTools Network 에서 GA collect 요청 확인
- GA Realtime 으로 본인 방문 확인

---

## 5. SEO / 인덱싱 등록

### Google Search Console
1. 도메인 또는 URL prefix 등록
2. DNS TXT 레코드로 소유권 확인
3. `sitemap.xml` 제출
4. 인덱싱 요청 (`Inspect URL` → `Request Indexing`)

### Naver 서치어드바이저 (한국 시장 필수)
1. 사이트 등록
2. HTML 메타 태그 또는 파일 업로드로 소유권 확인
3. 사이트맵 제출
4. RSS 등록 (블로그 있다면)

### Bing Webmaster Tools
- GSC 에서 자동 가져오기 가능

---

## 6. 모니터링

### 에러 모니터링 — Sentry (옵션)
```bash
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```
무료 티어로 충분 (5000 events/month).

### 성능 모니터링
- Vercel Analytics (Vercel Pro 이상 무료 일부)
- Core Web Vitals 자동 수집

### 폼 발송 모니터링
- Resend Dashboard 에서 발송·전달·반송 실시간 확인
- 이메일 발송 실패 시 Slack 알림 (Resend Webhook → Slack)

---

## 7. 런칭 체크리스트

### 기술
- [ ] Production 환경에서 `pnpm build` 무에러
- [ ] 모든 환경 변수 Production 에 등록됨
- [ ] 한국어·영어 라우트 정상 동작
- [ ] 폼 제출 → 실제 이메일 수신 확인
- [ ] sitemap.xml 접근 가능 (`/sitemap.xml`)
- [ ] robots.txt 정확 (`/robots.txt`)
- [ ] 404 페이지 정상 렌더 (`not-found.tsx`)

### 콘텐츠
- [ ] 모든 ⛔ placeholder 제거 (FAQ, 회사 정보 등)
- [ ] 로고·favicon·OG 이미지 적용
- [ ] 개인정보처리방침·이용약관 페이지 활성
- [ ] 카피라이트 연도 정확

### SEO
- [ ] 메타태그 정확 (Title, Description, OG)
- [ ] Twitter Card 표시 (선택)
- [ ] Google Search Console 등록·사이트맵 제출
- [ ] Naver 서치어드바이저 등록

### 분석·모니터링
- [ ] GA4 Realtime 에서 방문 확인
- [ ] 주요 이벤트 (CTA 클릭, 폼 제출) 정상 트래킹
- [ ] Sentry (사용 시) 정상 수집

### 법적
- [ ] PIPA 쿠키 동의 배너 동작
- [ ] 개인정보처리방침에 수집 항목·이용 목적·보유 기간 명시
- [ ] 이메일 발송 시 수신자에게 회신 가능 명시

### 마케팅
- [ ] OG 미리보기 검증 (Facebook Debugger, Twitter Card Validator)
- [ ] LinkedIn / 공식 채널 공유 텍스트 준비
- [ ] B2B 영업팀에 페이지 URL · 문의 수신 흐름 공유

---

## 8. 런칭 후 1주차 모니터링

- [ ] 일별 GA4 트래픽 확인
- [ ] 폼 전환율 확인
- [ ] 에러 로그 (Sentry) 확인
- [ ] 페이지 속도 재측정 (PageSpeed Insights)
- [ ] 모바일·데스크탑 실제 디바이스 검증
- [ ] 사용자 피드백 수집 채널 확인

---

## ✅ Phase 6 DoD

- [ ] Production 도메인 정상 접근
- [ ] HTTPS 활성화
- [ ] 폼 제출 → 영업팀 메일 수신 확인됨
- [ ] GA4 데이터 수집 시작
- [ ] Search Console 등록 완료
- [ ] 런칭 체크리스트 100% 완료
- [ ] 주요 이해관계자(사업·디자이너) 에게 런칭 공유

---

## 🎉 런칭 후

- 콘텐츠 갱신은 `messages/*.json` 만 수정하면 자동 배포 (Vercel)
- 새 섹션·기능 추가 시 별도 PR 브랜치로 작업
- 분기 또는 반기 단위로 콘텐츠·디자인 검토 권장
