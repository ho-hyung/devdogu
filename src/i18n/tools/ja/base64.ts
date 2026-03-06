export default {
  metadata: {
    title: 'Base64エンコーダー/デコーダー',
    description: 'オンラインBase64エンコード＆デコードツール。テキストをBase64に変換、またはBase64を元のテキストにデコードします。',
    keywords: ['Base64', 'エンコード', 'デコード', '変換', 'Base64変換'],
  },
  faq: [
    {
      q: 'Base64エンコードとは？',
      a: 'Base64は、バイナリデータをASCII文字列に変換するエンコード方式です。メールの添付ファイル、データURI、JWTトークンなどで広く使用されています。',
    },
    {
      q: 'Base64は暗号化ですか？',
      a: 'いいえ。Base64はエンコードであり、暗号化ではありません。誰でも簡単にデコードできるため、機密データの保護には使用しないでください。',
    },
  ],
  ui: {
    encode: 'エンコード',
    decode: 'デコード',
    convert: '変換',
    swap: '⇄ 入れ替え',
    originalText: '元のテキスト',
    base64String: 'Base64文字列',
    base64Result: 'Base64結果',
    decodeResult: 'デコード結果',
    encodePlaceholder: 'エンコードするテキストを入力...',
    decodePlaceholder: 'Base64文字列を入力...',
    outputPlaceholder: '結果がここに表示されます。',
    copy: 'コピー',
    copied: '✓ コピー済み',
    encodeError: 'エンコードできない文字が含まれています。',
    decodeError: '無効なBase64文字列です。',
  },
};
