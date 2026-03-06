# DevDogu

[English](README.en.md) | [日本語](README.ja.md) | [中文](README.zh.md)

**24개 브라우저 전용 개발자 도구. 서버로 데이터가 전송되지 않습니다.**

[devdogu.vercel.app](https://devdogu.vercel.app) | [버그 신고](https://github.com/your-username/devdogu/issues)

---

## DevDogu를 만든 이유

- **프라이버시 우선** - 모든 도구가 100% 클라이언트 사이드에서 동작합니다. 데이터가 브라우저를 벗어나지 않습니다.
- **올인원** - 24개 필수 개발자 도구를 한 곳에서. 20개 사이트를 즐겨찾기할 필요가 없습니다.
- **빠름** - 정적 사이트로 즉시 로딩. 스피너도, 대기 시간도 없습니다.
- **다국어 지원** - 한국어, 영어, 일본어, 중국어 UI를 제공합니다.
- **오픈 소스** - MIT 라이선스. 자유롭게 기여하거나 포크하세요.

---

## 도구 목록

### 포매터 & 검증

| 도구 | 설명 |
|------|------|
| [JSON 포매터](https://devdogu.vercel.app/json-formatter/) | JSON 데이터 정리 & 검증 |
| [SQL 포매터](https://devdogu.vercel.app/sql-formatter/) | SQL 쿼리 정리 |
| [정규식 테스터](https://devdogu.vercel.app/regex-tester/) | 정규표현식 실시간 테스트 |
| [Diff 비교기](https://devdogu.vercel.app/diff-checker/) | 두 텍스트 시각적 비교 |
| [Markdown 미리보기](https://devdogu.vercel.app/markdown-preview/) | Markdown 실시간 미리보기 |

### 인코딩 & 디코딩

| 도구 | 설명 |
|------|------|
| [Base64](https://devdogu.vercel.app/base64/) | Base64 인코딩/디코딩 |
| [URL 인코더](https://devdogu.vercel.app/url-encoder/) | URL 인코딩/디코딩 |
| [JWT 디코더](https://devdogu.vercel.app/jwt-decoder/) | JWT 토큰 디코딩 |

### 생성기

| 도구 | 설명 |
|------|------|
| [UUID/ULID 생성기](https://devdogu.vercel.app/id-generator/) | UUID v4, ULID, NanoID 생성 |
| [해시 생성기](https://devdogu.vercel.app/hash-generator/) | MD5, SHA-1, SHA-256 해시 생성 |
| [QR코드 생성기](https://devdogu.vercel.app/qr-generator/) | QR코드 생성 |
| [Lorem Ipsum](https://devdogu.vercel.app/lorem-ipsum/) | 더미 텍스트 생성 |
| [비밀번호 생성기](https://devdogu.vercel.app/password-generator/) | 안전한 랜덤 비밀번호 생성 |
| [Cron 빌더](https://devdogu.vercel.app/cron-builder/) | GUI로 Cron 표현식 생성 |

### 변환기

| 도구 | 설명 |
|------|------|
| [Unix 타임스탬프](https://devdogu.vercel.app/timestamp/) | Unix 타임스탬프 변환 |
| [Color 변환기](https://devdogu.vercel.app/color-converter/) | HEX, RGB, HSL 상호 변환 |
| [JSON/YAML](https://devdogu.vercel.app/json-yaml/) | JSON ↔ YAML 변환 |
| [Text Case](https://devdogu.vercel.app/text-case/) | camelCase, snake_case 등 변환 |

### 치트시트

| 도구 | 설명 |
|------|------|
| [Git](https://devdogu.vercel.app/git-cheatsheet/) | Git 명령어 모음 |
| [Docker](https://devdogu.vercel.app/docker-cheatsheet/) | Docker & Compose 명령어 모음 |
| [HTTP 상태코드](https://devdogu.vercel.app/http-status/) | HTTP 상태코드 정리 |
| [Cron](https://devdogu.vercel.app/cron-cheatsheet/) | Cron 표현식 가이드 |
| [Linux](https://devdogu.vercel.app/linux-cheatsheet/) | Linux 필수 명령어 |
| [정규식](https://devdogu.vercel.app/regex-cheatsheet/) | 정규식 문법 정리 |

---

## 기술 스택

- **프레임워크**: Next.js 14 (App Router, static export)
- **언어**: TypeScript
- **스타일**: Tailwind CSS
- **폰트**: Pretendard (한국어) + JetBrains Mono (코드)
- **배포**: Vercel
- **i18n**: 자체 구현 (경로 기반, 번들 최소화)

## 시작하기

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 정적 빌드
```

## 새 도구 추가하기

1. `src/lib/tools.ts`에 도구 항목 추가
2. `src/app/[tool-name]/page.tsx` 생성 (서버 컴포넌트 + 메타데이터)
3. `src/app/[tool-name]/[ToolName]Client.tsx` 생성 (클라이언트 컴포넌트)
4. `src/i18n/tools/` 디렉토리에 번역 파일 추가 (ko/en/ja/zh)
5. `src/app/[locale]/[tool-name]/page.tsx` 생성 (다국어 페이지)
6. `public/sitemap.xml`에 URL 추가

## 기여하기

기여를 환영합니다! 이슈를 열거나 PR을 제출해주세요.

## 라이선스

MIT
