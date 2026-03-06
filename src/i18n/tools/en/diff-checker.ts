export default {
  metadata: {
    title: 'Diff Checker',
    description: 'Online diff checker — Compare two texts and visually highlight differences.',
    keywords: ['diff checker', 'text compare', 'diff tool', 'compare text', 'text difference'],
  },
  faq: [
    { q: 'How does the diff checker work?', a: 'The diff checker compares two texts line by line and highlights added, removed, and unchanged lines with different colors.' },
    { q: 'Is there a size limit?', a: 'There is no strict limit, but very large texts may slow down the browser since all processing happens client-side.' },
  ],
  ui: {
    original: 'Original Text',
    originalPlaceholder: 'Enter original text...',
    modified: 'Modified Text',
    modifiedPlaceholder: 'Enter modified text...',
    added: '+{count} added',
    removed: '-{count} removed',
    unchanged: '{count} unchanged',
  },
};
