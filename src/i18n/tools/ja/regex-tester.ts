export default {
  metadata: {
    title: '正規表現テスター',
    description: 'オンライン正規表現テスター — 正規表現をリアルタイムでテストし、マッチ結果を確認できます。フラグやプリセットに対応。',
    keywords: ['正規表現テスター', '正規表現', 'regexテスト', 'パターンマッチング', '正規表現バリデーター'],
  },
  faq: [
    {
      q: '正規表現とは？',
      a: '正規表現（regex）は、検索パターンを定義する文字の列です。テキストのマッチング、検証、抽出に使用されます。',
    },
    {
      q: '正規表現のフラグとは？',
      a: 'フラグは正規表現の動作を変更します：g（グローバル）はすべてのマッチを検索、i（大文字小文字無視）は大文字小文字を区別しない、m（マルチライン）は各行を個別に扱います。',
    },
  ],
  ui: {
    regexPattern: '正規表現パターン',
    flags: 'フラグ:',
    presets: 'プリセット:',
    testString: 'テスト文字列',
    testPlaceholder: '正規表現に対してテストするテキストを入力...',
    matchResults: 'マッチ結果 ({count}件)',
    matchList: 'マッチ一覧',
    moreMatches: '...他{count}件',
    invalidRegex: '無効な正規表現',
    presetEmail: 'メール',
    presetPhone: '電話番号（韓国）',
    presetUrl: 'URL',
    presetIpv4: 'IPv4',
    presetDigits: '数字のみ',
    presetKorean: '韓国語のみ',
  },
};
