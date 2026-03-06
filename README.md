# DevDogu 🧰

개발자를 위한 무료 온라인 도구 모음

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드 & 배포

```bash
npm run build
```

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **언어**: TypeScript
- **폰트**: Pretendard (한국어) + JetBrains Mono (코드)
- **배포**: Vercel

## 프로젝트 구조

```
src/
├── app/                    # 페이지 (App Router)
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지
│   ├── json-formatter/     # JSON 포매터
│   ├── base64/             # Base64 인코더/디코더
│   ├── url-encoder/        # URL 인코더/디코더
│   ├── regex-tester/       # 정규식 테스터 (TODO)
│   ├── jwt-decoder/        # JWT 디코더 (TODO)
│   ├── timestamp/          # Unix 타임스탬프 (TODO)
│   ├── about/              # 소개 페이지
│   └── privacy/            # 개인정보처리방침
├── components/             # 공통 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   └── ToolLayout.tsx      # 도구 페이지 래퍼
├── lib/                    # 유틸리티
│   ├── tools.ts            # 도구 목록 설정
│   └── metadata.ts         # SEO 메타데이터 헬퍼
└── app/globals.css         # 글로벌 스타일
```

## 도구 추가 방법

1. `src/lib/tools.ts`에 도구 정보 추가
2. `src/app/[tool-name]/page.tsx` 생성 (서버 컴포넌트, 메타데이터)
3. `src/app/[tool-name]/[ToolName]Client.tsx` 생성 (클라이언트 컴포넌트)
4. `public/sitemap.xml`에 URL 추가

## Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

## 라이센스

MIT
