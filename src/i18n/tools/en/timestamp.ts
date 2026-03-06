export default {
  metadata: {
    title: 'Unix Timestamp Converter',
    description: 'Online Unix timestamp converter — Convert between Unix timestamps and human-readable dates.',
    keywords: ['Unix timestamp', 'epoch converter', 'timestamp converter', 'Unix time', 'date converter'],
  },
  faq: [
    {
      q: 'What is a Unix timestamp?',
      a: 'A Unix timestamp is the number of seconds elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch). It is widely used in programming and databases.',
    },
    {
      q: 'What is the difference between seconds and milliseconds?',
      a: 'Unix timestamps are traditionally in seconds, but many systems (JavaScript, Java) use milliseconds. This tool auto-detects and handles both formats.',
    },
  ],
  ui: {
    currentTimestamp: 'Current Unix Timestamp',
    clickToCopy: 'Click to copy',
    copied: '✓ Copied!',
    clickCopyHint: 'Click to copy',
    timestampToDate: 'Timestamp → Date',
    dateToTimestamp: 'Date → Timestamp',
    convert: 'Convert',
    invalidNumber: 'Invalid number.',
    invalidTimestamp: 'Invalid timestamp.',
    invalidDate: 'Invalid date format.',
  },
};
