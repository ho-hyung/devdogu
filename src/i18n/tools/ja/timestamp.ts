export default {
  metadata: {
    title: 'Unixタイムスタンプ変換',
    description: 'オンラインUnixタイムスタンプ変換ツール — Unixタイムスタンプと日時を相互変換します。',
    keywords: ['Unixタイムスタンプ', 'エポック変換', 'タイムスタンプ変換', 'Unix時間', '日付変換'],
  },
  faq: [
    {
      q: 'Unixタイムスタンプとは？',
      a: 'Unixタイムスタンプは、1970年1月1日 00:00:00 UTC（Unixエポック）からの経過秒数です。プログラミングやデータベースで広く使用されています。',
    },
    {
      q: '秒とミリ秒の違いは？',
      a: 'Unixタイムスタンプは伝統的に秒単位ですが、多くのシステム（JavaScript、Java）ではミリ秒を使用します。このツールは両方の形式を自動検出して処理します。',
    },
  ],
  ui: {
    currentTimestamp: '現在のUnixタイムスタンプ',
    clickToCopy: 'クリックでコピー',
    copied: '✓ コピー済み！',
    clickCopyHint: 'クリックでコピー',
    timestampToDate: 'タイムスタンプ → 日付',
    dateToTimestamp: '日付 → タイムスタンプ',
    convert: '変換',
    invalidNumber: '無効な数値です。',
    invalidTimestamp: '無効なタイムスタンプです。',
    invalidDate: '無効な日付形式です。',
  },
};
