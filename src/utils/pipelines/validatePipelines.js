export default function validatePipeline(sentences) {
  const validatePipeline = [];

  let invalids = [];

  validatePipeline.forEach((functor) => {
    [sentences, invalids] = functor(sentences, invalids);
  });

  return {
    valids: sentences,
    invalids,
  };
}
