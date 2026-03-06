export default {
  metadata: {
    title: 'SQLフォーマッター',
    description: 'オンラインSQLフォーマッター — SQLクエリを見やすく整形します。',
    keywords: ['SQLフォーマッター', 'SQL整形', 'SQL整形ツール', 'SQLプリティプリント', 'SQLインデント'],
  },
  faq: [
    { q: '対応しているSQL方言は？', a: 'このツールは標準SQLの整形に対応しています。キーワードは大文字に変換され、適切なインデントが適用されます。' },
  ],
  ui: {
    format: '整形',
    sampleSql: 'サンプルSQL',
    sqlInput: 'SQL入力',
    inputPlaceholder: 'SQLクエリを入力...',
    formattedResult: '整形結果',
    copy: 'コピー',
    copied: '✓ コピー済み',
    outputPlaceholder: '整形結果がここに表示されます。',
  },
};
