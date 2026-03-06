# DevDogu

[한국어](README.md) | [English](README.en.md) | [中文](README.zh.md)

**24個のブラウザ専用開発者ツール。データはサーバーに送信されません。**

[devdogu.vercel.app](https://devdogu.vercel.app) | [バグ報告](https://github.com/your-username/devdogu/issues)

---

## なぜDevDogu？

- **プライバシー最優先** - すべてのツールが100%クライアントサイドで動作。データはブラウザから出ません。
- **オールインワン** - 24個の必須開発者ツールを一か所に。20サイトをブックマークする必要はありません。
- **高速** - 静的サイトで即座にロード。スピナーも待ち時間もありません。
- **多言語対応** - 韓国語、英語、日本語、中国語のUIを提供。
- **オープンソース** - MITライセンス。自由に貢献・フォークできます。

---

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router, static export)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **フォント**: Pretendard (韓国語) + JetBrains Mono (コード)
- **デプロイ**: Vercel
- **i18n**: 自社実装 (パスベース、最小バンドル)

## はじめに

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 静的ビルド
```

## ライセンス

MIT
