export default {
  metadata: {
    title: 'UUID/ULID Generator',
    description: 'Generate UUID v4, ULID, and NanoID online. Supports bulk generation.',
    keywords: ['UUID generator', 'ULID generator', 'NanoID', 'unique ID', 'UUID v4'],
  },
  faq: [
    { q: 'What is UUID?', a: 'UUID (Universally Unique Identifier) is a 128-bit identifier standardized by RFC 4122. UUID v4 uses random values and has an extremely low collision probability.' },
    { q: 'What is the difference between UUID and ULID?', a: 'ULID (Universally Unique Lexicographically Sortable Identifier) includes a timestamp component, making it sortable by creation time. It is 26 characters long and uses Crockford Base32 encoding.' },
  ],
  ui: {
    generate: 'Generate',
    count: 'Count',
    countRange: '1~100',
    length: 'Length',
    lengthRange: '1~128',
    results: 'Results ({count})',
    copied: '✓ Copied',
    copyAll: 'Copy All',
    clickToCopy: 'Click to copy',
    copy: 'Copy',
    uuidDesc: '128-bit, 36 chars (with hyphens), RFC 4122',
    ulidDesc: '128-bit, 26 chars, time-sortable',
    nanoidDesc: '{length} chars, URL-safe, custom length',
  },
};
