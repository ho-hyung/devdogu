export default {
  metadata: {
    title: 'JWT Decoder',
    description: 'Online JWT decoder — Decode JWT token header and payload. View claims and expiration time.',
    keywords: ['JWT decoder', 'JWT token', 'JSON Web Token', 'JWT viewer', 'decode JWT'],
  },
  faq: [
    {
      q: 'What is a JWT?',
      a: 'JWT (JSON Web Token) is a compact, URL-safe token format used for authentication and information exchange. It consists of three parts: Header, Payload, and Signature.',
    },
    {
      q: 'Can JWT be decoded by anyone?',
      a: 'Yes. The header and payload of a JWT are simply Base64-encoded, so anyone can read them. The signature ensures the token has not been tampered with, but does not encrypt the content.',
    },
  ],
  ui: {
    sampleToken: 'Sample Token',
    clear: 'Clear',
    jwtToken: 'JWT Token',
    timeInfo: 'Time Info',
    copy: 'Copy',
    copied: '✓ Copied',
    expired: 'Expired',
    valid: 'Valid',
    errorThreeParts: 'JWT requires three parts separated by dots (.).',
    errorInvalid: 'Invalid JWT format.',
    inputPlaceholder: 'Paste your JWT token here...',
  },
};
