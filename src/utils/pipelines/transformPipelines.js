export default function transformPipeline(sentences) {
    const transformPipeline = [removeSpecialCharacters,removeRedundantSpaces,]
    transformPipeline.forEach((functor) => {
        sentences = functor(sentences)
    })

    return sentences
}

export function removeSpecialCharacters(sentences) {
    return sentences.map((sentence) => sentence.replace(/[@#$^&*+=]/gi, ' '))
}

export function removeRedundantSpaces(sentences) {
    return sentences.map((sentence) => sentence.replace(/\s+/g, ' '))
}