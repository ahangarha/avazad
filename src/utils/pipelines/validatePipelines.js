export default function validatePipeline(sentences) {
  const validatePipeline = [doesNotContainsDigits,];

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