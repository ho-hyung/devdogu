export default {
  metadata: {
    title: 'URLエンコーダー/デコーダー',
    description: 'オンラインURLエンコード＆デコードツール。パーセントエンコーディングでURL文字列をエンコードまたはデコードします。',
    keywords: ['URLエンコーダー', 'URLデコーダー', 'パーセントエンコーディング', 'URLエンコード', 'URLデコード'],
  },
  faq: [
    {
      q: 'URLエンコードとは？',
      a: 'URLエンコード（パーセントエンコーディング）は、URL内の特殊文字を%XX形式に変換し、安全に送信できるようにします。例えば、スペースは%20になります。',
    },
    {
      q: 'URLエンコードが必要な場合は？',
      a: 'URLパラメータやクエリ文字列に特殊文字、非ASCII文字、予約文字を含める場合にURLエンコードが必要です。',
    },
  ],
  ui: {
    encode: 'エンコード',
    decode: 'デコード',
    convert: '変換',
    encodePlaceholder: 'エンコードするURL文字列を入力...',
    decodePlaceholder: 'デコードするURLエンコード文字列を入力...',
    outputPlaceholder: '結果がここに表示されます。',
    copy: 'コピー',
    copied: '✓ コピー済み',
    invalidInput: '無効な入力です。',
    input: '入力',
    output: '出力',
  },
};
