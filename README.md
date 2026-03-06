# DevDogu

**23 browser-only developer tools. No data sent to servers.**

[devdogu.vercel.app](https://devdogu.vercel.app) | [Report Bug](https://github.com/your-username/devdogu/issues)

---

## Why DevDogu?

- **Privacy first** - All tools run 100% client-side. Your data never leaves the browser.
- **All-in-one** - 23 essential dev tools in one place. No more bookmarking 20 different sites.
- **Fast** - Static site, loads instantly. No spinners, no waiting.
- **Korean UI** - One of the few developer tool collections with native Korean interface.
- **Open source** - MIT licensed. Contribute or fork freely.

---

## Tools

### Formatters & Validators

| Tool | Description |
|------|-------------|
| [JSON Formatter](https://devdogu.vercel.app/json-formatter/) | Format & validate JSON |
| [SQL Formatter](https://devdogu.vercel.app/sql-formatter/) | Format SQL queries |
| [Regex Tester](https://devdogu.vercel.app/regex-tester/) | Test regular expressions in real-time |
| [Diff Checker](https://devdogu.vercel.app/diff-checker/) | Compare two texts visually |
| [Markdown Preview](https://devdogu.vercel.app/markdown-preview/) | Live Markdown preview |

### Encoders & Decoders

| Tool | Description |
|------|-------------|
| [Base64](https://devdogu.vercel.app/base64/) | Encode/decode Base64 |
| [URL Encoder](https://devdogu.vercel.app/url-encoder/) | Encode/decode URLs |
| [JWT Decoder](https://devdogu.vercel.app/jwt-decoder/) | Decode JWT tokens |

### Generators

| Tool | Description |
|------|-------------|
| [UUID/ULID Generator](https://devdogu.vercel.app/id-generator/) | Generate UUID v4, ULID, NanoID |
| [Hash Generator](https://devdogu.vercel.app/hash-generator/) | Generate MD5, SHA-1, SHA-256 hashes |
| [QR Code Generator](https://devdogu.vercel.app/qr-generator/) | Generate QR codes |
| [Lorem Ipsum](https://devdogu.vercel.app/lorem-ipsum/) | Generate placeholder text |
| [Cron Builder](https://devdogu.vercel.app/cron-builder/) | Build cron expressions with GUI |

### Converters

| Tool | Description |
|------|-------------|
| [Unix Timestamp](https://devdogu.vercel.app/timestamp/) | Convert Unix timestamps |
| [Color Converter](https://devdogu.vercel.app/color-converter/) | Convert between HEX, RGB, HSL |
| [JSON/YAML](https://devdogu.vercel.app/json-yaml/) | Convert between JSON and YAML |
| [Text Case](https://devdogu.vercel.app/text-case/) | Convert camelCase, snake_case, etc. |

### Cheatsheets

| Tool | Description |
|------|-------------|
| [Git](https://devdogu.vercel.app/git-cheatsheet/) | Git commands reference |
| [Docker](https://devdogu.vercel.app/docker-cheatsheet/) | Docker & Compose reference |
| [HTTP Status](https://devdogu.vercel.app/http-status/) | HTTP status codes reference |
| [Cron](https://devdogu.vercel.app/cron-cheatsheet/) | Cron expression guide |
| [Linux](https://devdogu.vercel.app/linux-cheatsheet/) | Essential Linux commands |
| [Regex](https://devdogu.vercel.app/regex-cheatsheet/) | Regex syntax reference |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Pretendard (Korean) + JetBrains Mono (code)
- **Deploy**: Vercel

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Static build
```

## Adding a New Tool

1. Add tool entry to `src/lib/tools.ts`
2. Create `src/app/[tool-name]/page.tsx` (server component with metadata)
3. Create `src/app/[tool-name]/[ToolName]Client.tsx` (client component)
4. Add URL to `public/sitemap.xml`

## Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## License

MIT
