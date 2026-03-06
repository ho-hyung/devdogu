# SEO & 검색 등록 체크리스트

## 즉시 실행 (5분)

### Google Search Console
1. https://search.google.com/search-console 접속
2. 속성 추가 > URL 접두어 > `https://devdogu.vercel.app` 입력
3. 소유권 확인 (DNS TXT 레코드 또는 HTML 파일 업로드)
4. Sitemaps > `https://devdogu.vercel.app/sitemap.xml` 제출
5. URL 검사 > 홈페이지 URL 입력 > 색인 생성 요청

### 네이버 서치어드바이저
1. https://searchadvisor.naver.com 접속
2. 사이트 등록 > `https://devdogu.vercel.app`
3. 소유권 확인 (HTML 메타태그 또는 파일 업로드)
4. 요청 > 사이트맵 제출 > `https://devdogu.vercel.app/sitemap.xml`
5. 요청 > 웹 페이지 수집 > 주요 도구 URL들 개별 제출

### Bing Webmaster Tools
1. https://www.bing.com/webmasters 접속
2. Google Search Console에서 가져오기 (가장 쉬움)

---

## GitHub Topics 추가

리포지토리 Settings > Topics에 추가:
- `developer-tools`
- `online-tools`
- `json-formatter`
- `base64`
- `jwt-decoder`
- `nextjs`
- `typescript`
- `privacy`
- `client-side`
- `open-source`

---

## awesome 리스트 PR 대상

- [ ] awesome-developer-tools - https://github.com/sorrycc/awesome-tools
- [ ] awesome-nextjs - https://github.com/unicodeveloper/awesome-nextjs
- [ ] awesome-tools - https://github.com/cube-js/awesome-tools
- [ ] awesome-privacy - https://github.com/pluja/awesome-privacy

PR 메시지 예시:
```
Add DevDogu - browser-only developer tools

DevDogu (https://devdogu.vercel.app) is a collection of 23 developer tools
that run entirely client-side. No data is sent to any server.

Tools include: JSON formatter, Base64 encoder, JWT decoder, regex tester,
diff checker, hash generator, QR generator, cron builder, and more.

Open source: https://github.com/your-username/devdogu
```

---

## 개별 도구 SEO 글 주제 (네이버/구글 키워드 타겟)

| 키워드 | 글 제목 제안 |
|--------|-------------|
| 온라인 JSON 포매터 | "온라인 JSON 포매터 추천 — 서버 전송 없이 브라우저에서 안전하게" |
| Cron 표현식 만들기 | "Cron 표현식 쉽게 만들기 — GUI 빌더로 1분 만에 완성" |
| JWT 디코더 온라인 | "JWT 토큰 디코딩 — 프라이버시 걱정 없는 온라인 디코더" |
| Base64 인코딩 | "Base64 인코딩/디코딩 — 브라우저에서 바로 변환" |
| SQL 포매터 온라인 | "SQL 쿼리 정리 — 온라인 SQL 포매터 사용법" |
| Unix 타임스탬프 변환 | "Unix 타임스탬프 변환 — 날짜를 타임스탬프로, 타임스탬프를 날짜로" |
| 정규식 테스트 | "정규식 테스트 사이트 추천 — 실시간 매칭 확인" |
| UUID 생성기 | "UUID v4 생성기 — 온라인에서 바로 생성" |
| Git 명령어 정리 | "Git 명령어 모음 — 자주 쓰는 Git 명령어 치트시트" |
| Docker 명령어 정리 | "Docker 명령어 모음 — 자주 쓰는 Docker 명령어 정리" |
