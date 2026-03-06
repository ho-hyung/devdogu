export default {
  metadata: {
    title: 'JSON YAML変換',
    description: 'JSONとYAML形式を双方向に変換します。',
    keywords: ['JSONからYAML', 'YAMLからJSON', 'JSON YAML変換', '設定ファイル変換'],
  },
  faq: [
    { q: 'JSONとYAMLの違いは？', a: 'どちらもデータシリアライゼーション形式です。JSONは波括弧や角括弧を使用し、YAMLはインデントで構造を表現します。YAMLは一般的に人間にとって読みやすく、コメントをサポートしています。' },
  ],
  ui: {
    clear: 'クリア',
    sampleData: 'サンプルデータ',
    resultToInput: '結果を入力へ',
    input: '{label}入力',
    jsonPlaceholder: 'JSONデータを入力...',
    yamlPlaceholder: 'YAMLデータを入力...',
    invalidJson: '無効なJSON',
    invalidYaml: '無効なYAML',
    output: '{label}結果',
    yamlOutputPlaceholder: '変換されたYAMLがここに表示されます。',
    jsonOutputPlaceholder: '変換されたJSONがここに表示されます。',
    copied: 'コピー済み',
    copy: 'コピー',
    unknownError: '不明なエラー',
  },
};
