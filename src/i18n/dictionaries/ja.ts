import type { Dictionary } from './ko';

const ja: Dictionary = {
  common: {
    search: '検索',
    copy: 'コピー',
    copied: 'コピー済み',
    clear: 'クリア',
    convert: '変換',
    input: '入力',
    output: '結果',
    outputPlaceholder: '結果がここに表示されます。',
    noResults: '検索結果がありません。',
    unknownError: '不明なエラー',
  },
  header: {
    search: '検索',
    more: 'もっと見る ↓',
    themeToggle: 'テーマ切替',
    menu: 'メニュー',
  },
  footer: {
    copyright: 'すべてのツールは無料です。データはブラウザ内でのみ処理されます。',
    about: '紹介',
    privacy: 'プライバシーポリシー',
  },
  home: {
    badge: 'すべてのデータはブラウザ内でのみ処理されます',
    heroTitle1: '開発者の毎日に使う',
    heroTitle2: 'ツール集',
    heroDescription:
      'JSONフォーマッター、Base64エンコーダー、正規表現テスターなど\n開発者が必要なツールを素早くきれいに。',
    searchPlaceholder: 'ツール検索... (例: JSON, Base64, regex, git, docker)',
    all: 'すべて',
    toolCount: '{count}件のツール',
    searchLabel: '検索: "{query}"',
    favorites: 'お気に入り',
    recent: '最近使用',
    noResultsFor: '"{query}"の検索結果はありません。',
    viewAll: 'すべてのツールを見る',
    moreTools: 'その他のツール',
    moreToolsDesc: '新しいツールを追加し続けています。',
    addFavorite: 'お気に入りに追加',
    removeFavorite: 'お気に入りから削除',
    seoText:
      'DevDoguは開発者のための無料オンラインツール集です。すべてのツールはクライアントサイドで動作するため、データがサーバーに送信されることはありません。インストール不要でブラウザから直接使用できます。',
  },
  toolLayout: {
    home: 'ホーム',
    faq: 'よくある質問',
    relatedTools: '他のツール',
    favorite: 'お気に入り',
  },
  commandPalette: {
    searchPlaceholder: 'ツール検索...',
    noResults: '検索結果がありません。',
    navigate: '移動',
    open: '開く',
    close: '閉じる',
  },
  categories: {
    formatter: 'フォーマッター & 検証',
    encoder: 'エンコード & デコード',
    generator: 'ジェネレーター',
    converter: 'コンバーター',
    cheatsheet: 'チートシート',
  },
};

export default ja;
