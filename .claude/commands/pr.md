# /pr - Pull Request 생성

현재 브랜치의 변경 사항을 분석하고 PR을 생성합니다.

## 사용법

```
/pr
```

실행하면 변경 사항을 분석하고 적절한 PR을 생성합니다.

## 핵심 원칙

> **PR은 베이스 브랜치를 정확히 지정하고, 변경 내용을 명확하게 설명해야 합니다.**

- 현재 브랜치가 어디서 파생되었는지 확인 후 베이스 브랜치 결정
- PR 제목은 브랜치명과 작업 내용을 포함
- PR 본문은 작업 목적과 상세 내용을 간결하게 작성

## 실행 절차

### 1. 현재 상태 분석

```bash
# 현재 브랜치 확인
git branch --show-current

# 원격 동기화 및 상태 확인
git fetch origin
git status

# 커밋 히스토리 확인 (베이스 브랜치 파악용)
git log --oneline --graph -10

# 변경 내용 확인
git diff origin/dev...HEAD --stat
```

### 2. 베이스 브랜치 결정

**규칙**:

1. **dev에서 직접 파생된 브랜치** → `dev`로 PR 생성
   - 예: `dev` → `feature/new-feature` → PR base는 `dev`

2. **브랜치에서 추가로 파생된 브랜치** → 직전 부모 브랜치로 PR 생성
   - 예: `dev` → `feature1` → `feature2` → `feature3`
   - `feature3` → `feature2`로 PR
   - `feature2` → `feature1`로 PR
   - `feature1` → `dev`로 PR

**중요**: 베이스 브랜치가 확실하지 않으면 사용자에게 확인합니다.

### 3. 변경 내용 분석

베이스 브랜치 대비 모든 커밋을 확인합니다:

```bash
# 베이스 브랜치 대비 커밋 목록
git log --oneline <base-branch>..HEAD

# 변경된 파일 목록
git diff <base-branch>...HEAD --stat

# 변경 내용 상세
git diff <base-branch>...HEAD
```

### 4. PR 제목 작성

**형식**: `[{브랜치폴더}/{브랜치명}] {작업 제목}`

**예시**:

- `[feature/production-schedule-datagrid] 생산스케줄 데이터그리드 추가`
- `[fix/login-error] 로그인 시 토큰 갱신 오류 수정`
- `[docs/claude-md] CLAUDE.md 업데이트`

### 5. PR 본문 작성

**구조**:

```markdown
# 작업 목적

한두 줄 내외로 간결하게 현재 PR의 작업 목적을 요약합니다.

# 작업 상세내용

- 간결하게 핵심 변경사항에 대한 요약을 작성합니다.
- 주요 변경 파일 및 로직 변경 사항을 명시합니다.
```

### 6. 라벨 선택

변경 내용에 따라 적절한 라벨을 선택합니다:

| 라벨            | 사용 기준                                                      |
| --------------- | -------------------------------------------------------------- |
| `documentation` | 문서 작업 (README, CLAUDE.md 등)                               |
| `chore`         | 빌드, 설정, 의존성, CI/CD 등 인프라 작업 (코드 로직 변경 없음) |
| `domain`        | 도메인 로직 변경                                               |
| `enhancement`   | 기능 개선 및 추가 (작은 개선 포함)                             |
| `hotfix`        | 긴급 버그 수정                                                 |
| `refactor`      | 코드 리팩토링 (기능 변경 없이 코드 구조 개선)                  |
| `view`          | UI 및 스타일 변경                                              |

**복수 라벨**: 해당되는 라벨이 여러 개면 콤마로 구분하여 모두 지정합니다.

#### EAS Build 라벨 (선택)

PR에 아래 라벨을 추가하면 Expo EAS Build가 자동 트리거됩니다.
네이티브 코드 변경이 포함된 PR에서 사용합니다.

| 라벨                        | 동작                       |
| --------------------------- | -------------------------- |
| `eas-build-all:preview`     | iOS + Android preview 빌드 |
| `eas-build-ios:preview`     | iOS preview 빌드만         |
| `eas-build-android:preview` | Android preview 빌드만     |

**참고**: JS/UI만 변경된 경우 EAS Build 라벨 없이 머지하면 `preview-update.yml`이 OTA 업데이트를 자동 실행합니다.

### 7. PR 생성

```bash
gh pr create \
  --title "[브랜치폴더/브랜치명] 작업 제목" \
  --body "$(cat <<'EOF'
# 작업 목적

작업 목적 요약

# 작업 상세내용

- 변경사항 1
- 변경사항 2
EOF
)" \
  --base <베이스-브랜치> \
  # --reviewer "" \
  # --assignee "" \
  --label "<라벨>"
```

### 8. 원격 푸시 (필요 시)

로컬 커밋이 원격에 푸시되지 않았다면:

```bash
git push -u origin <현재-브랜치>
```

## 기본 설정

| 항목        | 값        |
| ----------- | --------- | --------- | --- | --- | --- |
|             |           | Reviewers | ``  |     |     |
|             |           | Assignee  | ``  |     |     |
| 기본 베이스 | `develop` |

## 예시 시나리오

### 도메인 기능 추가

```bash
gh pr create \
  --title "[feature/forklift-call] 지게차 호출 기능 추가" \
  --body "$(cat <<'EOF'
# 작업 목적

지게차 운전자가 호출 요청을 확인하고 수락/거절할 수 있는 기능을 추가합니다.

# 작업 상세내용

- ForkliftCall API 및 DTO 추가
- 지게차 호출 목록 컴포넌트 구현
- 호출 상태 관리 훅 추가
EOF
)" \
  --base dev \
  # --reviewer "" \
  # --assignee "" \
  --label "domain,enhancement"
```

### 문서 작업

```bash
gh pr create \
  --title "[docs/claude-md] PR 작성 가이드 commands로 분리" \
  --body "$(cat <<'EOF'
# 작업 목적

CLAUDE.md의 PR 관련 내용을 .claude/commands/pr.md로 분리합니다.

# 작업 상세내용

- .claude/commands/pr.md 파일 생성
- CLAUDE.md에서 PR 생성 절차 제거 및 명령어 참조로 대체
EOF
)" \
  --base dev \
  # --reviewer "" \
  # --assignee "" \
  --label "documentation"
```

### 브랜치 체인에서 PR

`feature1` → `feature2` 체인에서 `feature2`의 PR:

```bash
gh pr create \
  --title "[feature/feature2] 추가 기능 구현" \
  --body "..." \
  --base feature1 \
  # --reviewer "" \
  # --assignee "" \
  --label "domain,enhancement"
```

## 사용자 확인

PR 생성 전 다음을 사용자에게 보여주고 확인받습니다:

```
📋 PR 생성 계획

제목: [feature/forklift-call] 지게차 호출 기능 추가
베이스: dev
라벨: domain, enhancement

# 작업 목적
지게차 운전자가 호출 요청을 확인하고 수락/거절할 수 있는 기능을 추가합니다.

# 작업 상세내용
- ForkliftCall API 및 DTO 추가
- 지게차 호출 목록 컴포넌트 구현
- 호출 상태 관리 훅 추가

변경 파일 (5개):
  src/api/forklift-call/forklift-call.api.ts
  src/domain/worker/forklift-call/components/ForkliftCallList.tsx
  ...

진행할까요? (Y/n)
```

## 주의사항

- **베이스 브랜치 확인 필수**: 잘못된 베이스로 PR을 만들면 불필요한 커밋이 포함됨
- **원격 푸시 확인**: PR 생성 전 현재 브랜치가 원격에 푸시되어 있어야 함
- **커밋 정리**: 필요하다면 PR 전에 `/commit` 명령어로 커밋을 정리
- **라벨 복수 선택 가능**: 해당되는 라벨은 모두 지정

## 관련 명령어

- `/commit` - 변경 사항을 논리적 단위로 분리하여 커밋
- `/rebase` - 베이스 브랜치의 새 커밋을 현재 브랜치에 적용
- `/restack` - 머지 후 브랜치 체인 정리
