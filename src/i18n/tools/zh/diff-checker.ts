export default {
  metadata: {
    title: '差异比较工具',
    description: '在线差异比较工具 — 比较两段文本并高亮显示差异。',
    keywords: ['差异比较', '文本比较', 'diff工具', '比较文本', '文本差异'],
  },
  faq: [
    { q: '差异比较工具如何工作？', a: '差异比较工具逐行比较两段文本，并用不同颜色高亮显示新增、删除和未更改的行。' },
    { q: '有大小限制吗？', a: '没有严格限制，但由于所有处理都在客户端进行，非常大的文本可能会导致浏览器变慢。' },
  ],
  ui: {
    original: '原始文本',
    originalPlaceholder: '输入原始文本...',
    modified: '修改后的文本',
    modifiedPlaceholder: '输入修改后的文本...',
    added: '+{count}行新增',
    removed: '-{count}行删除',
    unchanged: '{count}行未更改',
  },
};
