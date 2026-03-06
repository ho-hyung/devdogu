export default {
  metadata: {
    title: '文本大小写转换',
    description: '在camelCase、snake_case、kebab-case、PascalCase等之间转换文本。',
    keywords: ['文本大小写转换', 'camelCase', 'snake_case', 'kebab-case', 'PascalCase'],
  },
  faq: [
    { q: '支持哪些文本格式？', a: '支持camelCase、PascalCase、snake_case、CONSTANT_CASE、kebab-case、Title Case、Sentence case、lowercase和UPPERCASE。' },
  ],
  ui: {
    inputLabel: '要转换的文本',
    inputPlaceholder: '输入文本（例如：hello world, helloWorld, hello_world）',
    copied: '已复制',
    copy: '复制',
    copyError: '复制到剪贴板失败。',
  },
};
