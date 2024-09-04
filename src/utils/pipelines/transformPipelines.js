import starkString from "starkstring"

export default function transformPipeline(sentences) {
    const transformPipeline = [
        removeSpecialCharacters,
        removeRedundantSpaces,
        removeExtraWhitespace,
        changeNumbersToText
    ]
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

export function removeExtraWhitespace(sentences) {
    return sentences.map((sentence) => sentence.trim())
}

export function changeNumbersToText(sentences) {
    return sentences.map((sentence) => {
        const englishNumbersText = starkString(sentence).englishNumber().toString()
        const englishNumbers = englishNumbersText.match(/\d+/g) ?? []

        const persianNumbers = englishNumbers.map((number) => {
            if (number.length > 4) return number;

            return starkString(number).digitsToWords().toString()
        })

        let processedText = englishNumbersText
        for (let i in englishNumbers) {
            processedText = processedText.replaceAll(englishNumbers[i], persianNumbers[i])
        }

        return processedText
    })

}

export function transformArabicToPersian(sentences) {
    return sentences.map((sentence) => starkString(sentence).trim().persianChar().toString())
}
