export default {
  metadata: {
    title: 'Text Case Converter',
    description: 'Convert text between camelCase, snake_case, kebab-case, PascalCase and more.',
    keywords: ['text case converter', 'camelCase', 'snake_case', 'kebab-case', 'PascalCase'],
  },
  faq: [
    { q: 'What text cases are supported?', a: 'camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, Title Case, Sentence case, lowercase, and UPPERCASE.' },
  ],
  ui: {
    inputLabel: 'Text to Convert',
    inputPlaceholder: 'Enter text (e.g. hello world, helloWorld, hello_world)',
    copied: 'Copied',
    copy: 'Copy',
    copyError: 'Failed to copy to clipboard.',
  },
};
