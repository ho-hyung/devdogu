export default {
  metadata: {
    title: 'JSON Formatter & Validator',
    description:
      'Online JSON formatter — Format JSON data for easy reading and validate syntax errors. Processed entirely in your browser.',
    keywords: ['JSON formatter', 'JSON beautifier', 'JSON validator', 'JSON viewer', 'format JSON'],
  },
  faq: [
    {
      q: 'What is a JSON Formatter?',
      a: 'A JSON formatter adds indentation and line breaks to compressed JSON data, making it human-readable. It is useful for debugging and inspecting API responses.',
    },
    {
      q: 'Is the JSON data sent to a server?',
      a: 'No. All DevDogu tools run entirely in your browser. Your data is never sent to any server and disappears when you close the page.',
    },
    {
      q: 'What is the difference between JSON and a JavaScript object?',
      a: 'JSON keys must be wrapped in double quotes (""), trailing commas are not allowed, and JavaScript-specific values like functions or undefined cannot be included.',
    },
  ],
  ui: {
    format: 'Format',
    minify: 'Minify',
    clear: 'Clear',
    sampleData: 'Sample Data',
    indent: 'Indent:',
    spaces: 'spaces',
    input: 'Input',
    output: 'Output',
    copy: 'Copy',
    copied: '✓ Copied',
    inputPlaceholder: 'Paste JSON data here... (Ctrl+Enter to format)',
    outputPlaceholder: 'Formatted result will appear here.',
    invalidJson: 'Invalid JSON',
    unknownError: 'Unknown error',
    keys: 'Keys',
    depth: 'Depth',
    size: 'Size',
  },
};
