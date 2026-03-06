export default {
  metadata: {
    title: 'URL Encoder/Decoder',
    description: 'Online URL encoding & decoding tool. Encode or decode URL strings with percent-encoding.',
    keywords: ['URL encoder', 'URL decoder', 'percent encoding', 'URL encode', 'URL decode'],
  },
  faq: [
    {
      q: 'What is URL encoding?',
      a: 'URL encoding (percent-encoding) converts special characters in URLs to %XX format so they can be safely transmitted. For example, spaces become %20.',
    },
    {
      q: 'When do I need URL encoding?',
      a: 'URL encoding is needed when passing special characters, non-ASCII characters, or reserved characters in URL parameters or query strings.',
    },
  ],
  ui: {
    encode: 'Encode',
    decode: 'Decode',
    convert: 'Convert',
    encodePlaceholder: 'Enter URL string to encode...',
    decodePlaceholder: 'Enter URL-encoded string to decode...',
    outputPlaceholder: 'Result will appear here.',
    copy: 'Copy',
    copied: '✓ Copied',
    invalidInput: 'Invalid input.',
    input: 'Input',
    output: 'Output',
  },
};
