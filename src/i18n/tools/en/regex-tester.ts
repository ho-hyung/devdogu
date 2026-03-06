export default {
  metadata: {
    title: 'Regex Tester',
    description: 'Online regex tester — Test regular expressions in real-time and view match results. Supports flags and common presets.',
    keywords: ['regex tester', 'regular expression', 'regex test', 'pattern matching', 'regex validator'],
  },
  faq: [
    {
      q: 'What is a regular expression?',
      a: 'A regular expression (regex) is a sequence of characters that defines a search pattern. It is used for text matching, validation, and extraction.',
    },
    {
      q: 'What are regex flags?',
      a: 'Flags modify regex behavior: g (global) finds all matches, i (case-insensitive) ignores case, m (multiline) treats each line separately.',
    },
  ],
  ui: {
    regexPattern: 'Regex pattern',
    flags: 'Flags:',
    presets: 'Presets:',
    testString: 'Test String',
    testPlaceholder: 'Enter text to test against the regex...',
    matchResults: 'Match Results ({count} matches)',
    matchList: 'Match List',
    moreMatches: '...and {count} more',
    invalidRegex: 'Invalid regex',
    presetEmail: 'Email',
    presetPhone: 'Phone (KR)',
    presetUrl: 'URL',
    presetIpv4: 'IPv4',
    presetDigits: 'Digits only',
    presetKorean: 'Korean only',
  },
};
