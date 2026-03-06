export default {
  metadata: {
    title: 'JWT解码器',
    description: '在线JWT解码器 — 解码JWT令牌的头部和载荷。查看声明和过期时间。',
    keywords: ['JWT解码器', 'JWT令牌', 'JSON Web Token', 'JWT查看器', '解码JWT'],
  },
  faq: [
    {
      q: '什么是JWT？',
      a: 'JWT（JSON Web Token）是一种紧凑的、URL安全的令牌格式，用于身份验证和信息交换。由头部、载荷和签名三部分组成。',
    },
    {
      q: 'JWT可以被任何人解码吗？',
      a: '是的。JWT的头部和载荷只是简单的Base64编码，任何人都可以读取。签名确保令牌未被篡改，但不会加密内容。',
    },
  ],
  ui: {
    sampleToken: '示例令牌',
    clear: '清除',
    jwtToken: 'JWT令牌',
    timeInfo: '时间信息',
    copy: '复制',
    copied: '✓ 已复制',
    expired: '已过期',
    valid: '有效',
    errorThreeParts: 'JWT需要由点(.)分隔的三个部分。',
    errorInvalid: '无效的JWT格式。',
    inputPlaceholder: '在此粘贴JWT令牌...',
  },
};
