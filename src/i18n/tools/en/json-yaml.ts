export default {
  metadata: {
    title: 'JSON YAML Converter',
    description: 'Convert between JSON and YAML formats bidirectionally.',
    keywords: ['JSON to YAML', 'YAML to JSON', 'JSON YAML converter', 'config converter'],
  },
  faq: [
    { q: 'What is the difference between JSON and YAML?', a: 'Both are data serialization formats. JSON uses braces and brackets while YAML uses indentation for structure. YAML is generally more human-readable and supports comments.' },
  ],
  ui: {
    clear: 'Clear',
    sampleData: 'Sample Data',
    resultToInput: 'Result to Input',
    input: '{label} Input',
    jsonPlaceholder: 'Enter JSON data...',
    yamlPlaceholder: 'Enter YAML data...',
    invalidJson: 'Invalid JSON',
    invalidYaml: 'Invalid YAML',
    output: '{label} Result',
    yamlOutputPlaceholder: 'Converted YAML will appear here.',
    jsonOutputPlaceholder: 'Converted JSON will appear here.',
    copied: 'Copied',
    copy: 'Copy',
    unknownError: 'Unknown error',
  },
};
