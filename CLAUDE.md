# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevDogu is a multilingual collection of free online developer tools (devdogu.kr). All tools run client-side only — no data is sent to servers. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and deployed as a static site to Vercel.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Static site build (output: 'export' in production only)
npm run lint     # ESLint
```

No test framework is currently configured.

## Architecture

### Tool Page Pattern

Each tool follows a two-file pattern per locale:

- **`src/app/[tool-name]/page.tsx`** — Korean (default locale) server component. Loads tool dictionary, exports `metadata` via `createMetadata()`, wraps client component in `<ToolLayout>`.
- **`src/app/[locale]/[tool-name]/page.tsx`** — Non-default locale server component. Same structure but receives `locale` param and has `generateStaticParams()` for `en`, `ja`, `zh`.
- **`src/app/[tool-name]/[ToolName]Client.tsx`** — `'use client'` component shared across all locales. Receives `dict` prop for translated strings.

### Internationalization (i18n)

Path-based localization with 4 locales: `ko` (default), `en`, `ja`, `zh`.

- **Config**: `src/i18n/config.ts` — locale types, `getLocaleFromPathname()`, path utilities
- **UI translations**: `src/i18n/get-dictionary.ts` — shared UI strings (header, footer, common labels)
- **Tool translations**: `src/i18n/get-tool-dictionary.ts` — per-tool content loader
- **Tool dictionaries**: `src/i18n/tools/{locale}/{tool-name}.ts` — each exports `{ metadata, faq, ui }` object

Korean pages live at `/[tool-name]/`, other locales at `/[locale]/[tool-name]/`. The default locale (`ko`) has no path prefix.

### Adding a New Tool

1. Add tool entry to `src/lib/tools.ts` — name/description fields use `Record<Locale, string>` for translations
2. Create `src/app/[tool-name]/page.tsx` (Korean server page)
3. Create `src/app/[tool-name]/[ToolName]Client.tsx` (shared client component accepting `dict` prop)
4. Create `src/app/[locale]/[tool-name]/page.tsx` (non-default locale server page with `generateStaticParams`)
5. Add translation files: `src/i18n/tools/{ko,en,ja,zh}/[tool-name].ts` (each exports `{ metadata, faq, ui }`)
6. Add all locale URLs to `public/sitemap.xml`

### Key Files

- `src/lib/tools.ts` — Central tool registry. All tools on the homepage are driven by this.
- `src/lib/metadata.ts` — `createMetadata()` helper for consistent SEO metadata.
- `src/components/ToolLayout.tsx` — Shared wrapper (breadcrumb, title, FAQ section, related tools).
- `src/components/CommandPalette.tsx` — Cmd/Ctrl+K search across all tools.
- `src/hooks/useFavorites.ts`, `useRecentTools.ts` — localStorage-based persistence for favorites and history.

### Styling

- Tailwind CSS with `class`-based dark mode
- Custom `brand` color palette (primary: `brand-500: #338dff`)
- CSS custom properties (`--color-surface-*`, `--color-border`, `--color-text-*`) defined in `globals.css` for light/dark themes
- Fonts: Pretendard (Korean body text) + JetBrains Mono (code)

### Static Export

`next.config.js` sets `output: 'export'` in production only, with `trailingSlash: true` and `images.unoptimized: true`. No server-side features (API routes, SSR, ISR) are available in production.

## Conventions

- Default UI language is Korean; other locales use translated dictionaries
- Path alias: `@/` maps to `src/`
- Tool categories: `formatter`, `encoder`, `generator`, `converter`, `cheatsheet`
- Client components receive a `dict` prop for i18n strings, with fallback defaults for Korean
