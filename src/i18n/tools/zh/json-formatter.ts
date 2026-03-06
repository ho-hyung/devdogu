export default {
  metadata: {
    title: 'JSON格式化工具',
    description:
      '在线JSON格式化工具 — 格式化JSON数据以便阅读，并验证语法错误。所有处理均在浏览器中完成。',
    keywords: ['JSON格式化', 'JSON美化', 'JSON验证', 'JSON查看器', '格式化JSON'],
  },
  faq: [
    {
      q: '什么是JSON格式化工具？',
      a: 'JSON格式化工具为压缩的JSON数据添加缩进和换行，使其更易于人类阅读。在调试和检查API响应时非常有用。',
    },
    {
      q: 'JSON数据会被发送到服务器吗？',
      a: '不会。DevDogu的所有工具完全在浏览器中运行。您的数据不会发送到任何服务器，关闭页面后即消失。',
    },
    {
      q: 'JSON和JavaScript对象有什么区别？',
      a: 'JSON的键必须用双引号("")包裹，不允许尾随逗号，且不能包含函数或undefined等JavaScript特有的值。',
    },
  ],
  ui: {
    format: '格式化',
    minify: '压缩',
    clear: '清除',
    sampleData: '示例数据',
    indent: '缩进:',
    spaces: '空格',
    input: '输入',
    output: '输出',
    copy: '复制',
    copied: '✓ 已复制',
    inputPlaceholder: '在此粘贴JSON数据... (Ctrl+Enter格式化)',
    outputPlaceholder: '格式化结果将在此显示。',
    invalidJson: '无效的JSON',
    unknownError: '未知错误',
    keys: '键数',
    depth: '深度',
    size: '大小',
  },
};
