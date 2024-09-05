import filterPipeline from "./pipelines/filterPipelines";
import transformPipeline from "./pipelines/transformPipelines";
import validatePipeline from "./pipelines/validatePipelines";

export function validateRawText(rawText) {
  return runPipelines(splitStringIntoArray(rawText))
}

// private functions
function splitStringIntoArray(str) {
  return str.split(/\s*\.\s*|\s*\n\s*/)
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

