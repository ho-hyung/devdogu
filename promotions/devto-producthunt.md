# dev.to / Product Hunt / disquiet 초안

---

## dev.to

### Title
I built 23 developer tools that run entirely in your browser — no data sent to servers

### Tags
webdev, javascript, nextjs, opensource

### Body

I got tired of worrying whether online dev tools were secretly logging my data. So I built **DevDogu** — a collection of 23 developer tools where everything runs 100% client-side.

**Link**: [devdogu.vercel.app](https://devdogu.vercel.app)

### What's inside

**Formatters**: JSON formatter, SQL formatter, regex tester, diff checker, Markdown preview

**Encoders/Decoders**: Base64, URL encoder, JWT decoder

**Generators**: UUID/ULID, hash (MD5, SHA-256), QR code, lorem ipsum, cron expression builder

**Converters**: Unix timestamp, color (HEX/RGB/HSL), JSON-YAML, text case (camelCase, snake_case, etc.)

**Cheatsheets**: Git, Docker, Linux, HTTP status codes, regex, cron expressions

### The privacy angle

Most online formatters/converters send your input to a server. That's fine for lorem ipsum, but not great when you're pasting:
- JWT tokens from your production API
- JSON configs with database URLs
- SQL queries with table schemas

DevDogu processes everything in the browser using JavaScript. No `fetch()` calls, no API endpoints, no backend at all. It's a static site.

### Tech stack

- Next.js 14 (App Router, `output: 'export'` for static generation)
- TypeScript
- Tailwind CSS (class-based dark mode)
- Deployed on Vercel (free tier — it's just static files)

### What I learned

1. The two-file pattern (server component for SEO metadata + client component for interactivity) scales well across 23+ pages
2. Static export means zero server costs but also means no API routes — which is actually the feature, not the limitation
3. FAQ sections on each tool page help with Google rich snippets

### Open source

The full source is on GitHub: [github.com/your-username/devdogu](https://github.com/your-username/devdogu)

What tools would you add? Let me know in the comments!

---

## Product Hunt

### Tagline
23 browser-only developer tools. Your data never leaves your browser.

### Description
DevDogu is a collection of 23 essential developer tools — JSON formatter, Base64 encoder, JWT decoder, regex tester, diff checker, hash generator, QR code generator, cron builder, and more.

Every tool runs 100% client-side. No data is sent to any server. Paste your JWT tokens, API responses, or SQL queries without worrying about privacy.

Built with Next.js as a static site. Korean UI with universal functionality.

### Key features
- 23 developer tools in one place
- 100% client-side — zero data transmission
- Dark/light theme
- Instant loading (static site)
- Open source (MIT)

### Topics
Developer Tools, Productivity, Open Source, Privacy

---

## disquiet 프로덕트 등록

### 제품명
DevDogu — 프라이버시를 지키는 개발자 도구 모음

### 한줄 소개
서버 전송 없이 브라우저에서만 동작하는 23개 개발자 도구

### 설명
개발하면서 매일 쓰는 도구들을 한곳에 모았습니다. JSON 포매터, Base64, JWT 디코더, 정규식 테스터, Diff 비교기, 해시 생성기, QR 생성기, SQL 포매터, Cron 빌더 등 23개 도구가 있습니다.

가장 큰 특징은 **모든 도구가 100% 클라이언트 사이드**로 동작한다는 것입니다. 입력한 데이터가 서버로 전송되지 않기 때문에 회사 코드나 JWT 토큰도 안심하고 사용할 수 있습니다.

Next.js 정적 빌드로 제작하여 서버 비용 0원으로 운영하고 있습니다.

### 메이커 로그 1편: "왜 만들었나"
온라인 JSON 포매터에 회사 API 응답을 붙여넣을 때마다 불안했습니다. "이 사이트가 내 데이터를 수집하고 있으면 어쩌지?" 그래서 직접 만들었습니다. Next.js의 `output: 'export'`로 완전한 정적 사이트를 빌드하면 API Route 자체가 존재하지 않으니 데이터 전송이 물리적으로 불가능합니다.
