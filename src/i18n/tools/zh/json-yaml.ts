export default {
  metadata: {
    title: 'JSON YAML转换工具',
    description: '在JSON和YAML格式之间进行双向转换。',
    keywords: ['JSON转YAML', 'YAML转JSON', 'JSON YAML转换', '配置文件转换'],
  },
  faq: [
    { q: 'JSON和YAML有什么区别？', a: '两者都是数据序列化格式。JSON使用花括号和方括号，而YAML使用缩进来表示结构。YAML通常更易于人类阅读，并支持注释。' },
  ],
  ui: {
    clear: '清除',
    sampleData: '示例数据',
    resultToInput: '结果转为输入',
    input: '{label}输入',
    jsonPlaceholder: '输入JSON数据...',
    yamlPlaceholder: '输入YAML数据...',
    invalidJson: '无效的JSON',
    invalidYaml: '无效的YAML',
    output: '{label}结果',
    yamlOutputPlaceholder: '转换后的YAML将在此显示。',
    jsonOutputPlaceholder: '转换后的JSON将在此显示。',
    copied: '已复制',
    copy: '复制',
    unknownError: '未知错误',
  },
};
