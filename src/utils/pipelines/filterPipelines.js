export default function filterPipeline(sentences) {
    const filterPipeline = [removeNullString,]
    filterPipeline.forEach((functor) => {
        sentences = functor(sentences)
    })

    return sentences
}

export function removeNullString(sentences) {
    return sentences.filter((sentence) => /^\s*$/.test(sentence) === false)
}