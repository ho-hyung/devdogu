export default {
  metadata: {
    title: 'URL编码/解码工具',
    description: '在线URL编码和解码工具。使用百分号编码对URL字符串进行编码或解码。',
    keywords: ['URL编码器', 'URL解码器', '百分号编码', 'URL编码', 'URL解码'],
  },
  faq: [
    {
      q: '什么是URL编码？',
      a: 'URL编码（百分号编码）将URL中的特殊字符转换为%XX格式，以便安全传输。例如，空格变为%20。',
    },
    {
      q: '什么时候需要URL编码？',
      a: '在URL参数或查询字符串中传递特殊字符、非ASCII字符或保留字符时需要URL编码。',
    },
  ],
  ui: {
    encode: '编码',
    decode: '解码',
    convert: '转换',
    encodePlaceholder: '输入要编码的URL字符串...',
    decodePlaceholder: '输入要解码的URL编码字符串...',
    outputPlaceholder: '结果将在此显示。',
    copy: '复制',
    copied: '✓ 已复制',
    invalidInput: '无效的输入。',
    input: '输入',
    output: '输出',
  },
};
