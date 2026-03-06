export default {
  metadata: {
    title: 'QR Code Generator',
    description: 'Generate QR codes instantly from text or URLs. Customize size and error correction level.',
    keywords: ['QR code generator', 'QR code', 'generate QR', 'QR maker', 'barcode'],
  },
  faq: [
    { q: 'What is a QR code?', a: 'QR (Quick Response) code is a two-dimensional barcode that stores data like URLs, text, or contact info. It can be scanned by smartphone cameras.' },
  ],
  ui: {
    textOrUrl: 'Text or URL',
    inputPlaceholder: 'Enter text or URL to convert to QR code...',
    size: 'Size',
    errorCorrection: 'Error Correction',
    downloadPng: 'Download PNG',
    qrPlaceholder: 'QR code will appear here',
    generateError: 'Cannot generate QR code. The input data may be too long.',
  },
};
