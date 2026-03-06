# SNS 게시 초안

---

## X (Twitter) 런칭 트윗

### 메인 트윗
개발자 도구 모음 사이트를 만들었습니다.

- JSON 포매터, Base64, JWT 디코더 등 23개 도구
- 100% 브라우저에서 동작 (서버 전송 없음)
- 한국어 UI
- 오픈소스

https://devdogu.vercel.app

#개발자 #devtools #nextjs #사이드프로젝트 #프론트엔드

### 도구별 개별 트윗 (시리즈)

**JSON 포매터**
JSON 포매팅할 때 아무 사이트나 쓰고 계신가요?

DevDogu JSON 포매터는 서버로 데이터를 보내지 않습니다.
회사 API 응답도 안심하고 붙여넣기 하세요.

https://devdogu.vercel.app/json-formatter/

**Cron 빌더**
Cron 표현식, 매번 문법 찾아보시나요?

GUI로 클릭 몇 번이면 완성됩니다.
다음 실행 시간도 바로 확인 가능.

https://devdogu.vercel.app/cron-builder/

**JWT 디코더**
JWT 토큰 디코딩할 때 온라인 사이트 쓰면서 불안했던 적 없나요?

DevDogu JWT 디코더는 브라우저에서만 동작합니다.
프로덕션 토큰도 안심하고 확인하세요.

https://devdogu.vercel.app/jwt-decoder/

---

## LinkedIn 포스트

사이드 프로젝트를 런칭했습니다.

DevDogu (https://devdogu.vercel.app) — 개발자가 매일 쓰는 온라인 도구 23개를 한곳에 모았습니다.

JSON 포매터, Base64 인코더, JWT 디코더, 정규식 테스터, Diff 비교기, 해시 생성기, QR 생성기, SQL 포매터, Cron 빌더 등.

가장 신경 쓴 부분은 프라이버시입니다. 모든 도구가 100% 클라이언트 사이드로 동작해서 입력한 데이터가 서버로 전송되지 않습니다. Next.js의 정적 빌드(output: 'export')를 사용해 API Route 자체가 없습니다.

기술 스택: Next.js 14, TypeScript, Tailwind CSS, Vercel
서버 비용: 0원 (정적 사이트)

오픈소스로 공개되어 있습니다.
피드백이나 추가하면 좋겠는 도구 제안 환영합니다!

#사이드프로젝트 #개발자도구 #NextJS #프론트엔드 #오픈소스

---

## 커리어리 포스트 제목
"서버 비용 0원으로 23개 개발자 도구 사이트 운영하기 — Next.js 정적 빌드 사이드 프로젝트 회고"
