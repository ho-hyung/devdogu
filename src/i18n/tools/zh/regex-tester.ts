export default {
  metadata: {
    title: '正则表达式测试工具',
    description: '在线正则表达式测试工具 — 实时测试正则表达式并查看匹配结果。支持标志和常用预设。',
    keywords: ['正则测试', '正则表达式', 'regex测试', '模式匹配', '正则验证'],
  },
  faq: [
    {
      q: '什么是正则表达式？',
      a: '正则表达式（regex）是定义搜索模式的字符序列。用于文本匹配、验证和提取。',
    },
    {
      q: '什么是正则表达式标志？',
      a: '标志修改正则表达式的行为：g（全局）查找所有匹配，i（不区分大小写）忽略大小写，m（多行）逐行处理。',
    },
  ],
  ui: {
    regexPattern: '正则表达式模式',
    flags: '标志:',
    presets: '预设:',
    testString: '测试字符串',
    testPlaceholder: '输入要测试的文本...',
    matchResults: '匹配结果 ({count}个匹配)',
    matchList: '匹配列表',
    moreMatches: '...还有{count}个',
    invalidRegex: '无效的正则表达式',
    presetEmail: '邮箱',
    presetPhone: '手机号（韩国）',
    presetUrl: 'URL',
    presetIpv4: 'IPv4',
    presetDigits: '仅数字',
    presetKorean: '仅韩文',
  },
};
