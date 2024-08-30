import filterPipeline from "./pipelines/filterPipelines";

export function validateRawText(rawText) {
  return validationPipeline(splitStringIntoArray(rawText), [])
}

// private functions
function splitStringIntoArray(str) {
  return str.split(/\s*\.\s*|\s*\n\s*/)
}

function validationPipeline(pool, invalids) {
  
  const transformPipeline = []
  transformPipeline.forEach((functor) => {
    pool = functor(pool)
  })
  
  pool = filterPipeline(pool)
  
  const validatePipeline = []
  validatePipeline.forEach((functor) => {
    pool, invalids = functor(pool, invalids)
  })

  return {
    valids: pool,
    invalids
  }
}

