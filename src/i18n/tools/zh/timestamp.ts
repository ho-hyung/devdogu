export default {
  metadata: {
    title: 'Unix时间戳转换工具',
    description: '在线Unix时间戳转换工具 — 在Unix时间戳和可读日期之间进行转换。',
    keywords: ['Unix时间戳', '时间戳转换', 'Epoch转换', 'Unix时间', '日期转换'],
  },
  faq: [
    {
      q: '什么是Unix时间戳？',
      a: 'Unix时间戳是从1970年1月1日00:00:00 UTC（Unix纪元）起经过的秒数。在编程和数据库中被广泛使用。',
    },
    {
      q: '秒和毫秒有什么区别？',
      a: 'Unix时间戳传统上以秒为单位，但许多系统（JavaScript、Java）使用毫秒。此工具可自动检测并处理两种格式。',
    },
  ],
  ui: {
    currentTimestamp: '当前Unix时间戳',
    clickToCopy: '点击复制',
    copied: '✓ 已复制！',
    clickCopyHint: '点击复制',
    timestampToDate: '时间戳 → 日期',
    dateToTimestamp: '日期 → 时间戳',
    convert: '转换',
    invalidNumber: '无效的数字。',
    invalidTimestamp: '无效的时间戳。',
    invalidDate: '无效的日期格式。',
  },
};
