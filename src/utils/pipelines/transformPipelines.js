import starkString from 'starkstring'

export default function transformPipeline(sentences) {
  const transformPipeline = [
    removeSpecialCharacters,
    removeRedundantSpaces,
    removeExtraWhitespace,
    transformArabicToPersian,
    changeNumbersToText,
    tranformSpaceToZwnj,
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
    //Regex for english, arabic and persian numbers
    const allNumbers = sentence.match(/[\d\u0660-\u0669\u06F0-\u06F9]+/gu) ?? []

    const persianNumbers = allNumbers.map((number) => {
      if (number.length > 4) return number
      return starkString(number).englishNumber().digitsToWords().toString()
    })

    let processedText = sentence
    for (let i in allNumbers) {
      processedText = processedText.replaceAll(allNumbers[i], persianNumbers[i])
    }

    return processedText

  })

}

export function transformArabicToPersian(sentences) {
  return sentences.map((sentence) => starkString(sentence).trim().persianChar().toString())
}

export function tranformSpaceToZwnj(sentences) {
  return sentences.map((sentence) => halfSpace(sentence))
}

/**
 * The halfSpace function is an improved version of the halfSpace function from the
 * persian-tools project (https://github.com/persian-tools/persian-tools)
 *
 * Replace halfSpace in string(Zero-width non-joiner)
 *
 * @method halfSpace
 * @return clean entered persian string
 * @param str
 */
function halfSpace(str) {
  return str
    .replace(/((\s|^)ن?می)\u0020/g, '$1\u200c')
    .replace(/((\s|^)بی)\u0020/g, '$1\u200c')
    .replace(/([هی])\u0020((ام|ات|اش|ای|اید|ایم|اند)(?:$|[ ،؛:»؟!)]))/g, '$1\u200c$2')
    // remove space before ها if previous letter doesn't join
    .replace(/([ادذرزژو])\u0020(ها(ی)?(?:$|[ ،؛:»؟!)]))/g, '$1$2')
    .replace(/\u0020(ها(ی)?(?:$|[ ،؛:»؟!)]))/g, '\u200c$1')
    // remove space before تر if previous letter doesn't join
    .replace(/([ادذرزژو])\u0020(تر((ی)|(ین))?(?:$|[ ،؛:»؟!)]))/g, '$1$2')
    .replace(/\u0020(تر((ی)|(ین))?(?:$|[ ،؛:»؟!)]))/g, '\u200c$1')
    // remove space before ها if previous letter doesn't join
    .replace(/([ادذرزژو])\u0020((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)(?:$|[ ،؛:»؟!)]))/g, '$1$2')
    .replace(/\u0020((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)(?:$|[ ،؛:»؟!)]))/g, '\u200c$1')
}
