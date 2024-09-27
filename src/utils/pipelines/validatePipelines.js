export default function validatePipeline(sentences) {
  const validatePipeline = [
    doesNotContainsSpecialCharacters,
    doesNotContainsDigits,
    doesNotExceed15words,
    acceptsOnlyPersianCharacters,
  ]

  let invalids = []

  validatePipeline.forEach((functor) => {
    [sentences, invalids] = functor(sentences, invalids)
  })

  return {
    valids: sentences,
    invalids,
  }
}

export function doesNotContainsDigits(sentences, invalids) {
  const invalidSentences = sentences.filter((sentence) => /\d/.test(sentence))
  const newInvalids = invalids.concat(invalidSentences)
  const valids = sentences.filter((sentence) => !/\d/.test(sentence))

  return [valids, newInvalids]
}

export function doesNotContainsSpecialCharacters(sentences, invalids) {
  const invalidSentences = sentences.filter((sentence) => /[@#$^&*+=]/.test(sentence))
  const newInvalids = invalids.concat(invalidSentences)
  const valids = sentences.filter((sentence) => !/[@#$^&*+=]/.test(sentence))

  return [valids, newInvalids]
}

export function doesNotExceed15words(sentences, invalids) {
  const newValids = []
  const newInvalids = []

  sentences.forEach((sentence) => {
    if (sentence.split(' ').length < 15){
      newValids.push(sentence)
    } else {
      newInvalids.push(sentence)
    }
  })

  return [
    newValids,
    invalids.concat(newInvalids)
  ]
}

export function acceptsOnlyPersianCharacters(sentences, invalids) {
  const newValids = []
  const newInvalids = []

  sentences.forEach((sentence) => {
    // This regex includes only Persian characters, basic punctuations, space, zwnj, comma
    // As we know that Persian ZWJ are must be matched with \u200C and \u202C
    // eslint-disable-next-line no-misleading-character-class
    const persianCharRegex = /^[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC\u202C\u064B\u064C\u064E-\u0652\u0621\u0623-\u0626\u0629\u0654\u200C !؟،.؛]+$/gumi

    if (persianCharRegex.test(sentence)){
      newValids.push(sentence)
    } else {
      newInvalids.push(sentence)
    }
  })

  return [
    newValids,
    invalids.concat(newInvalids)
  ]
}
