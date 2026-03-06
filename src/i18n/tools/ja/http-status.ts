export default {
  metadata: {
    title: 'HTTPステータスコード',
    description: 'HTTPステータスコードのリファレンス。カテゴリ別に説明付きで整理。',
    keywords: ['HTTPステータスコード', 'ステータスコードリファレンス', '404', '500', '200', '301'],
  },
  faq: [
    { q: 'HTTPステータスコードとは？', a: 'HTTPステータスコードは、クライアントのリクエスト結果を示すためにサーバーが返す3桁の数字です。' },
  ],
  ui: {
    searchPlaceholder: 'ステータスコードを検索... (例: 404, timeout, redirect, unauthorized)',
    clearSearch: '検索をクリア',
    all: 'すべて',
    noResults: '結果が見つかりません。',
    viewAll: 'すべて表示',
    resultCount: '{count}件のステータスコード',
    searchLabel: '(検索: "{query}")',
    code: 'コード',
    name: '名前',
    description: '説明',
  },
};
