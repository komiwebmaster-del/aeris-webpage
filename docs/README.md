# Starter Code — Phase 0 Bootstrap

> 이 폴더의 파일들은 `pnpm create next-app` 직후 **덮어쓰거나 추가할 파일**입니다.
> Phase 0 의 셋업 작업을 즉시 완료할 수 있게 해줍니다.

---

## 사용 방법

```bash
# 1. Next.js 프로젝트 생성 (한번만)
cd ~/projects
pnpm create next-app@latest aeris-promo \
  --ts --tailwind --app --eslint --src-dir --import-alias "@/*"

cd aeris-promo

# 2. 추가 의존성 설치
pnpm add next-intl lucide-react clsx tailwind-merge \
         react-hook-form zod @hookform/resolvers \
         embla-carousel-react framer-motion
pnpm add -D prettier prettier-plugin-tailwindcss

# 3. 이 starter 폴더의 파일들을 프로젝트 루트에 복사·덮어쓰기
#    (이 starter 폴더를 그대로 옮긴 뒤 cp -r)
cp -r path/to/starter/* path/to/starter/.env.example .

# 4. 폴더에 함께 들어있는 docs/ 와 CLAUDE.md 도 복사
cp -r path/to/aeris-promo/docs .
cp path/to/aeris-promo/CLAUDE.md .

# 5. 개발 서버 실행
pnpm dev
```

---

## 포함된 파일

```
starter/
├── tailwind.config.ts                  # 토큰 매핑
├── middleware.ts                       # next-intl locale routing
├── .env.example                        # 환경 변수 템플릿
├── messages/
│   ├── ko.json                         # 한국어 키 (Phase 3에서 채움)
│   └── en.json                         # 영어 키 (Phase 3에서 채움)
└── src/
    ├── i18n.ts                         # next-intl config
    ├── lib/
    │   └── cn.ts                       # Tailwind merge util
    ├── styles/
    │   └── globals.css                 # 모든 디자인 토큰 (CSS 변수)
    └── app/
        └── [locale]/
            ├── layout.tsx              # 루트 레이아웃 + Pretendard
            └── page.tsx                # 홈 페이지 (토큰 검증 화면)
```

---

## 검증

`pnpm dev` 후 브라우저에서:
- `http://localhost:3000` → 한국어 진입 (자동, prefix 없음)
- `http://localhost:3000/en` → 영어 진입
- "Phase 0 · Setup OK" 라벨 + 색상 스와치 6개 확인

색상 스와치가 시안의 컬러와 비슷하게 보이면 토큰 매핑 OK. 디자이너 정확한 HEX 받으면 `globals.css` 의 `TODO` 주석 표시된 값들만 갱신.

---

## 다음 단계

→ `docs/phases/01-design-system.md` 으로 이동, UI 컴포넌트 구현 시작.
