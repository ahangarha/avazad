import filterPipeline from './pipelines/filterPipelines'
import transformPipeline from './pipelines/transformPipelines'
import validatePipeline from './pipelines/validatePipelines'

export function validateRawText(rawText) {
  return runPipelines(splitStringIntoArray(rawText))
}

// private functions
function splitStringIntoArray(str) {
  const sentences = str.replace(/\s*([.!?;؛؟]+)\s*/g, '$1\n').split(/\n/)

  if (sentences[sentences.length - 1] === '') {
    sentences.pop()
  }

  return sentences
}

function runPipelines(pool) {

  pool = transformPipeline(pool)

  pool = filterPipeline(pool)

  const { valids, invalids } = validatePipeline(pool)

  return {
    valids,
    invalids
  }
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line no-undef
  module.exports.splitStringIntoArray = splitStringIntoArray
}
