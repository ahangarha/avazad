
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download'; 
  document.body.appendChild(a);

  a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

  document.body.removeChild(a);  
  setTimeout(() => {
      URL.revokeObjectURL(url);
  }, 150);
}

export function generateTsvFile(validSentences, source, rationale, domain) {
  const rows = []
  rows.push([
    'Sentence (mandatory)',
    'Source (mandatory)',
    'Additional rationale for open license (mandatory)',
    'Sentence Quality Assurance Feedback: leave blank for internal use',
    'Domain (optional'
  ])

  validSentences.forEach((sentence) => {
    rows.push([
      sentence,
      source,
      rationale,
      '',
      domain
    ])
  })

  const tsvString = rows.map((row) => row.join('\t')).join('\n');

  return new Blob([tsvString], { type: 'text/tab-separated-values' })
}
