export default {
  metadata: {
    title: 'Base64编码/解码工具',
    description: '在线Base64编码和解码工具。将文本转换为Base64，或将Base64解码为原始文本。',
    keywords: ['Base64', '编码', '解码', '转换', 'Base64转换'],
  },
  faq: [
    {
      q: '什么是Base64编码？',
      a: 'Base64是一种将二进制数据转换为ASCII字符串的编码方案。广泛用于电子邮件附件、数据URI和JWT令牌中。',
    },
    {
      q: 'Base64是加密吗？',
      a: '不是。Base64是编码，不是加密。任何人都可以轻松解码，因此不应用于保护敏感数据。',
    },
  ],
  ui: {
    encode: '编码',
    decode: '解码',
    convert: '转换',
    swap: '⇄ 交换',
    originalText: '原始文本',
    base64String: 'Base64字符串',
    base64Result: 'Base64结果',
    decodeResult: '解码结果',
    encodePlaceholder: '输入要编码的文本...',
    decodePlaceholder: '输入Base64字符串...',
    outputPlaceholder: '结果将在此显示。',
    copy: '复制',
    copied: '✓ 已复制',
    encodeError: '输入包含无法编码的字符。',
    decodeError: '无效的Base64字符串。',
  },
};
