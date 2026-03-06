export default {
  metadata: {
    title: 'Base64 Encoder/Decoder',
    description: 'Online Base64 encoding & decoding tool. Convert text to Base64 or decode Base64 back to original text.',
    keywords: ['Base64', 'encoding', 'decoding', 'encode', 'decode', 'converter'],
  },
  faq: [
    {
      q: 'What is Base64 encoding?',
      a: 'Base64 is an encoding scheme that converts binary data into ASCII strings. It is widely used in email attachments, data URIs, and JWT tokens.',
    },
    {
      q: 'Is Base64 encryption?',
      a: 'No. Base64 is encoding, not encryption. Anyone can easily decode it, so it should not be used to protect sensitive data.',
    },
  ],
  ui: {
    encode: 'Encode',
    decode: 'Decode',
    convert: 'Convert',
    swap: '⇄ Swap',
    originalText: 'Original Text',
    base64String: 'Base64 String',
    base64Result: 'Base64 Result',
    decodeResult: 'Decoded Result',
    encodePlaceholder: 'Enter text to encode...',
    decodePlaceholder: 'Enter Base64 string...',
    outputPlaceholder: 'Result will appear here.',
    copy: 'Copy',
    copied: '✓ Copied',
    encodeError: 'Input contains characters that cannot be encoded.',
    decodeError: 'Invalid Base64 string.',
  },
};
