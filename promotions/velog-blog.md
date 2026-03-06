# velog 기술 블로그 시리즈 초안

---

## 1편: "Next.js로 개발자 도구 모음 사이트 만들기 — 기획부터 배포까지"

### 소개
개발하면서 매일 쓰는 도구들이 있습니다. JSON 포매터, Base64 인코더, JWT 디코더 같은 것들이요. 매번 다른 사이트를 찾아다니다가, 한곳에 모아놓으면 좋겠다는 생각으로 DevDogu(https://devdogu.vercel.app)를 만들었습니다.

이 글에서는 기획 의도, 기술 선택 이유, 그리고 실제 구현 과정을 공유합니다.

### 왜 만들었나

1. **프라이버시 우려** — 온라인 JSON 포매터에 회사 API 응답을 붙여넣기 할 때마다 "이 사이트가 내 데이터를 수집하는 건 아닐까?" 걱정이 됐습니다.
2. **즐겨찾기 정리** — 개발 도구 사이트를 10개 넘게 북마크하고 있었는데, 통합이 필요했습니다.
3. **한국어 도구 부재** — 영어 기반 도구가 대부분이라, 한국어 UI로 된 도구 모음이 있으면 좋겠다고 생각했습니다.

### 기술 선택

| 결정 | 이유 |
|------|------|
| Next.js 14 App Router | SEO가 중요하므로 SSG(정적 생성) 활용. `output: 'export'`로 정적 파일만 생성 |
| TypeScript | 23개 도구를 관리하려면 타입 안전성이 필수 |
| Tailwind CSS | 다크모드 지원이 쉽고, 빠른 스타일링 가능 |
| Vercel | 정적 사이트이므로 무료 호스팅. CI/CD 자동화 |

### 아키텍처

모든 도구가 **동일한 2파일 패턴**을 따릅니다:

```
src/app/json-formatter/
├── page.tsx              # 서버 컴포넌트 (메타데이터 + SEO)
└── JsonFormatterClient.tsx  # 클라이언트 컴포넌트 (인터랙션)
```

서버 컴포넌트에서 `metadata`를 export하고, 클라이언트 컴포넌트에 `'use client'`를 붙여서 인터랙티브 로직을 분리합니다.

### 핵심 설계 원칙

1. **100% 클라이언트 사이드** — `fetch()` 호출 없음. 모든 변환/생성은 브라우저 API와 JS 라이브러리로 처리
2. **정적 빌드** — `next.config.js`에서 `output: 'export'` 설정. API Route 사용 불가, 대신 호스팅 비용 0원
3. **SEO 최적화** — 각 도구 페이지마다 개별 메타데이터와 FAQ 구조화 데이터

### 도구 레지스트리 패턴

`src/lib/tools.ts`에서 모든 도구를 중앙 관리합니다:

```typescript
export interface Tool {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  href: string;
  icon: string;
  category: 'formatter' | 'encoder' | 'generator' | 'converter' | 'cheatsheet';
  keywords: string[];
}
```

새 도구를 추가할 때는 이 배열에 항목을 추가하고, 해당 경로에 2개 파일만 만들면 됩니다.

### 배운 점

- 정적 빌드(`output: 'export'`)에서는 `next/headers`, `cookies()` 같은 서버 기능을 쓸 수 없음
- 다크모드는 `class` 기반 토글 + `localStorage`로 구현하면 깜빡임 없이 적용 가능
- 개별 도구 페이지의 FAQ를 잘 구성하면 구글 검색 결과에 리치 스니펫으로 노출됨

### 현재 상태

- 23개 도구 운영 중
- 오픈소스: https://github.com/your-username/devdogu

피드백이나 추가하면 좋겠는 도구 제안 환영합니다!

---

## 2편 (후속 글 제목 제안)

- "온라인 JSON 포매터 추천 — 서버 전송 없이 브라우저에서 안전하게"
- "Cron 표현식 쉽게 만들기 — GUI 빌더로 1분 안에 완성"
- "개발자 도구 사이트 SEO 최적화 — Next.js 정적 빌드로 구글 상위 노출"
- "JWT 디코더 직접 만들기 — 10분이면 충분한 클라이언트 사이드 구현"
