export default {
  metadata: {
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and other hashes online. Process text securely in your browser.',
    keywords: ['hash generator', 'MD5', 'SHA-256', 'SHA-1', 'checksum', 'hash calculator'],
  },
  faq: [
    { q: 'What is a hash?', a: 'A hash function converts input data of any size into a fixed-size string. The same input always produces the same hash, but it is practically impossible to reverse the hash back to the original data.' },
    { q: 'Which hash algorithm should I use?', a: 'SHA-256 is recommended for most purposes. MD5 and SHA-1 are considered insecure for cryptographic use but are still used for checksums and non-security purposes.' },
  ],
  ui: {
    inputText: 'Input Text',
    inputPlaceholder: 'Enter text to hash...',
    generate: 'Generate Hash (⌘+Enter)',
    copied: '✓ Copied',
    copy: 'Copy',
  },
};
