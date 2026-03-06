# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevDogu is a Korean-language collection of free online developer tools (devdogu.kr). All tools run client-side only — no data is sent to servers. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and deployed as a static site to Vercel.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Static site build (output: 'export')
npm run lint     # ESLint
```

No test framework is currently configured.

## Architecture

### Tool Page Pattern

Each tool follows a strict two-file pattern:

1. **`src/app/[tool-name]/page.tsx`** — Server component. Exports `metadata` via `createMetadata()` from `src/lib/metadata.ts`, defines FAQ array, wraps client component in `<ToolLayout>`.
2. **`src/app/[tool-name]/[ToolName]Client.tsx`** — `'use client'` component with all interactive logic.

### Adding a New Tool

1. Add tool entry to `src/lib/tools.ts` (defines id, name, description, href, icon, category, keywords)
2. Create `src/app/[tool-name]/page.tsx` (server component with metadata + FAQ + ToolLayout wrapper)
3. Create `src/app/[tool-name]/[ToolName]Client.tsx` (client component)
4. Add URL to `public/sitemap.xml`

### Key Files

- `src/lib/tools.ts` — Central tool registry. `Tool` interface and `categories` map. All tools on the homepage are driven by this array.
- `src/lib/metadata.ts` — `createMetadata()` helper for consistent SEO metadata across tool pages.
- `src/components/ToolLayout.tsx` — Shared wrapper for tool pages (breadcrumb, title, FAQ section, related tools).
- `src/components/ThemeProvider.tsx` — Dark/light theme context using `localStorage` and class-based toggling.

### Styling

- Tailwind CSS with `class`-based dark mode
- Custom `brand` color palette (blue, primary: `brand-500: #338dff`)
- Custom `surface` color palette for backgrounds
- CSS custom properties (`--color-surface`, `--color-border`, `--color-text-secondary`) used extensively in components
- Fonts: Pretendard (Korean body text) + JetBrains Mono (code)

### Static Export

`next.config.js` sets `output: 'export'` for static site generation. This means no server-side features (API routes, SSR, ISR) are available.

## Conventions

- UI text and content are in Korean
- Path alias: `@/` maps to `src/`
- Tool categories: `formatter`, `encoder`, `generator`, `converter`, `cheatsheet`
