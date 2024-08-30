export function validateRawText(rawText) {
  return({
    valids: [],
    invalids: splitStringIntoArray(rawText)
  })
}

// private functions
function splitStringIntoArray(str) {
  return str.split(/\s*\.\s*|\s*\n\s*/)
}
