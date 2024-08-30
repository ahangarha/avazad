export default function transformPipeline(sentences) {
    const transformPipeline = []
    transformPipeline.forEach((functor) => {
        sentences = functor(sentences)
    })

    return sentences
}