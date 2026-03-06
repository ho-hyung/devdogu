export default {
  metadata: {
    title: 'UUID/ULID生成器',
    description: '在线生成UUID v4、ULID和NanoID。支持批量生成。',
    keywords: ['UUID生成器', 'ULID生成器', 'NanoID', '唯一ID', 'UUID v4'],
  },
  faq: [
    { q: '什么是UUID？', a: 'UUID（通用唯一标识符）是由RFC 4122标准化的128位标识符。UUID v4使用随机值，碰撞概率极低。' },
    { q: 'UUID和ULID有什么区别？', a: 'ULID（通用唯一字典序可排序标识符）包含时间戳组件，可按创建时间排序。长度为26个字符，使用Crockford Base32编码。' },
  ],
  ui: {
    generate: '生成',
    count: '数量',
    countRange: '1~100',
    length: '长度',
    lengthRange: '1~128',
    results: '结果 ({count}个)',
    copied: '✓ 已复制',
    copyAll: '全部复制',
    clickToCopy: '点击复制',
    copy: '复制',
    uuidDesc: '128位，36字符（含连字符），RFC 4122',
    ulidDesc: '128位，26字符，可按时间排序',
    nanoidDesc: '{length}字符，URL安全，自定义长度',
  },
};
