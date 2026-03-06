export default {
  metadata: {
    title: 'QR码生成器',
    description: '从文本或URL即时生成QR码。可自定义大小和纠错级别。',
    keywords: ['QR码生成器', 'QR码', '生成QR码', 'QR制作', '条形码'],
  },
  faq: [
    { q: '什么是QR码？', a: 'QR（快速响应）码是一种二维条形码，可存储URL、文本或联系人信息等数据。可通过智能手机摄像头扫描。' },
  ],
  ui: {
    textOrUrl: '文本或URL',
    inputPlaceholder: '输入要转换为QR码的文本或URL...',
    size: '大小',
    errorCorrection: '纠错级别',
    downloadPng: '下载PNG',
    qrPlaceholder: 'QR码将在此显示',
    generateError: '无法生成QR码。输入数据可能过长。',
  },
};
