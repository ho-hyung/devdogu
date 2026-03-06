import type { Dictionary } from './ko';

const zh: Dictionary = {
  common: {
    search: '搜索',
    copy: '复制',
    copied: '已复制',
    clear: '清除',
    convert: '转换',
    input: '输入',
    output: '结果',
    outputPlaceholder: '结果将显示在这里。',
    noResults: '没有找到结果。',
    unknownError: '未知错误',
  },
  header: {
    search: '搜索',
    more: '更多 ↓',
    themeToggle: '切换主题',
    menu: '菜单',
  },
  footer: {
    copyright: '所有工具均免费，数据仅在浏览器中处理。',
    about: '关于',
    privacy: '隐私政策',
  },
  home: {
    badge: '所有数据仅在浏览器中处理',
    heroTitle1: '开发者每天都在用的',
    heroTitle2: '工具集',
    heroDescription:
      'JSON格式化、Base64编码、正则表达式测试等\n开发者常用工具，快速又简洁。',
    searchPlaceholder: '搜索工具... (如: JSON, Base64, regex, git, docker)',
    all: '全部',
    toolCount: '{count}个工具',
    searchLabel: '搜索: "{query}"',
    favorites: '收藏夹',
    recent: '最近使用',
    noResultsFor: '没有找到"{query}"的结果。',
    viewAll: '查看所有工具',
    moreTools: '更多工具',
    moreToolsDesc: '我们持续添加新工具。',
    addFavorite: '添加收藏',
    removeFavorite: '取消收藏',
    seoText:
      'DevDogu是面向开发者的免费在线工具集。所有工具在客户端运行，数据不会发送到服务器。无需安装，直接在浏览器中使用。',
  },
  toolLayout: {
    home: '首页',
    faq: '常见问题',
    relatedTools: '其他工具',
    favorite: '收藏',
  },
  commandPalette: {
    searchPlaceholder: '搜索工具...',
    noResults: '没有找到结果。',
    navigate: '导航',
    open: '打开',
    close: '关闭',
  },
  categories: {
    formatter: '格式化 & 验证',
    encoder: '编码 & 解码',
    generator: '生成器',
    converter: '转换器',
    cheatsheet: '速查表',
  },
};

export default zh;
