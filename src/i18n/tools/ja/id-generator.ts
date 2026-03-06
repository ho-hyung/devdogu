export default {
  metadata: {
    title: 'UUID/ULIDジェネレーター',
    description: 'UUID v4、ULID、NanoIDをオンラインで生成。一括生成に対応。',
    keywords: ['UUIDジェネレーター', 'ULIDジェネレーター', 'NanoID', 'ユニークID', 'UUID v4'],
  },
  faq: [
    { q: 'UUIDとは？', a: 'UUID（Universally Unique Identifier）は、RFC 4122で標準化された128ビットの識別子です。UUID v4はランダム値を使用し、衝突の確率が極めて低いです。' },
    { q: 'UUIDとULIDの違いは？', a: 'ULID（Universally Unique Lexicographically Sortable Identifier）はタイムスタンプ成分を含み、作成時刻順にソート可能です。26文字で、Crockford Base32エンコーディングを使用します。' },
  ],
  ui: {
    generate: '生成',
    count: '個数',
    countRange: '1~100',
    length: '長さ',
    lengthRange: '1~128',
    results: '結果 ({count}件)',
    copied: '✓ コピー済み',
    copyAll: 'すべてコピー',
    clickToCopy: 'クリックでコピー',
    copy: 'コピー',
    uuidDesc: '128ビット、36文字（ハイフン含む）、RFC 4122',
    ulidDesc: '128ビット、26文字、時刻ソート可能',
    nanoidDesc: '{length}文字、URL安全、カスタム長',
  },
};
