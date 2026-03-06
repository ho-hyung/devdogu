export default {
  metadata: {
    title: 'JSONフォーマッター＆バリデーター',
    description:
      'オンラインJSONフォーマッター — JSONデータを見やすく整形し、構文エラーを検証します。すべてブラウザ内で処理されます。',
    keywords: ['JSONフォーマッター', 'JSON整形', 'JSONバリデーター', 'JSONビューアー', 'JSON整形ツール'],
  },
  faq: [
    {
      q: 'JSONフォーマッターとは？',
      a: 'JSONフォーマッターは、圧縮されたJSONデータにインデントや改行を追加し、人間が読みやすい形式にします。APIレスポンスのデバッグや確認に便利です。',
    },
    {
      q: 'JSONデータはサーバーに送信されますか？',
      a: 'いいえ。DevDoguのすべてのツールはブラウザ内で完結します。データはサーバーに送信されず、ページを閉じると消えます。',
    },
    {
      q: 'JSONとJavaScriptオブジェクトの違いは？',
      a: 'JSONのキーはダブルクォート("")で囲む必要があり、末尾のカンマは許可されず、関数やundefinedなどのJavaScript固有の値は含められません。',
    },
  ],
  ui: {
    format: '整形',
    minify: '圧縮',
    clear: 'クリア',
    sampleData: 'サンプルデータ',
    indent: 'インデント:',
    spaces: 'スペース',
    input: '入力',
    output: '出力',
    copy: 'コピー',
    copied: '✓ コピー済み',
    inputPlaceholder: 'JSONデータを貼り付けてください... (Ctrl+Enterで整形)',
    outputPlaceholder: '整形結果がここに表示されます。',
    invalidJson: '無効なJSON',
    unknownError: '不明なエラー',
    keys: 'キー数',
    depth: '深さ',
    size: 'サイズ',
  },
};
