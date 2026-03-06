export default {
  metadata: {
    title: 'QRコードジェネレーター',
    description: 'テキストやURLからQRコードを即座に生成。サイズや誤り訂正レベルをカスタマイズ可能。',
    keywords: ['QRコード生成', 'QRコード', 'QR作成', 'QRメーカー', 'バーコード'],
  },
  faq: [
    { q: 'QRコードとは？', a: 'QR（Quick Response）コードは、URL、テキスト、連絡先情報などのデータを格納する2次元バーコードです。スマートフォンのカメラで読み取ることができます。' },
  ],
  ui: {
    textOrUrl: 'テキストまたはURL',
    inputPlaceholder: 'QRコードに変換するテキストまたはURLを入力...',
    size: 'サイズ',
    errorCorrection: '誤り訂正',
    downloadPng: 'PNGダウンロード',
    qrPlaceholder: 'QRコードがここに表示されます',
    generateError: 'QRコードを生成できません。入力データが長すぎる可能性があります。',
  },
};
