export default {
  metadata: {
    title: 'テキストケース変換',
    description: 'camelCase、snake_case、kebab-case、PascalCaseなどのテキストケースを相互変換します。',
    keywords: ['テキストケース変換', 'camelCase', 'snake_case', 'kebab-case', 'PascalCase'],
  },
  faq: [
    { q: '対応しているテキストケースは？', a: 'camelCase、PascalCase、snake_case、CONSTANT_CASE、kebab-case、Title Case、Sentence case、lowercase、UPPERCASEに対応しています。' },
  ],
  ui: {
    inputLabel: '変換するテキスト',
    inputPlaceholder: 'テキストを入力（例: hello world, helloWorld, hello_world）',
    copied: 'コピー済み',
    copy: 'コピー',
    copyError: 'クリップボードへのコピーに失敗しました。',
  },
};
