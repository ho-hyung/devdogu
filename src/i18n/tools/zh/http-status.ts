export default {
  metadata: {
    title: 'HTTP状态码',
    description: 'HTTP状态码参考，按类别整理并附有说明。',
    keywords: ['HTTP状态码', '状态码参考', '404', '500', '200', '301'],
  },
  faq: [
    { q: '什么是HTTP状态码？', a: 'HTTP状态码是服务器返回的三位数字，用于表示客户端请求的结果。' },
  ],
  ui: {
    searchPlaceholder: '搜索状态码... (例如: 404, timeout, redirect, unauthorized)',
    clearSearch: '清除搜索',
    all: '全部',
    noResults: '未找到结果。',
    viewAll: '查看全部',
    resultCount: '{count}个状态码',
    searchLabel: '(搜索: "{query}")',
    code: '代码',
    name: '名称',
    description: '说明',
  },
};
