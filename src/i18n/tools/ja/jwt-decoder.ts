export default {
  metadata: {
    title: 'JWTデコーダー',
    description: 'オンラインJWTデコーダー — JWTトークンのヘッダーとペイロードをデコード。クレームと有効期限を確認できます。',
    keywords: ['JWTデコーダー', 'JWTトークン', 'JSON Web Token', 'JWTビューアー', 'JWTデコード'],
  },
  faq: [
    {
      q: 'JWTとは？',
      a: 'JWT（JSON Web Token）は、認証や情報交換に使用されるコンパクトでURL安全なトークン形式です。ヘッダー、ペイロード、署名の3つの部分で構成されます。',
    },
    {
      q: 'JWTは誰でもデコードできますか？',
      a: 'はい。JWTのヘッダーとペイロードは単にBase64エンコードされているだけなので、誰でも読むことができます。署名はトークンが改ざんされていないことを保証しますが、内容を暗号化するものではありません。',
    },
  ],
  ui: {
    sampleToken: 'サンプルトークン',
    clear: 'クリア',
    jwtToken: 'JWTトークン',
    timeInfo: '時間情報',
    copy: 'コピー',
    copied: '✓ コピー済み',
    expired: '期限切れ',
    valid: '有効',
    errorThreeParts: 'JWTはドット(.)で区切られた3つの部分が必要です。',
    errorInvalid: '無効なJWT形式です。',
    inputPlaceholder: 'JWTトークンを貼り付けてください...',
  },
};
