export default function validatePipeline(sentences) {
  const validatePipeline = [
    doesNotContainsSpecialCharacters,
    doesNotContainsDigits,
    doesNotExceed15words,
    acceptsOnlyPersianCharacters,
  ];

  let invalids = [];

  validatePipeline.forEach((functor) => {
    [sentences, invalids] = functor(sentences, invalids);
  });

  return {
    valids: sentences,
    invalids,
  };
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
    if (/^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی !؟،]+$/.test(sentence)){
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
