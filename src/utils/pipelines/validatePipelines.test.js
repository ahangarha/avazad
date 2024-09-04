import { doesNotContainsDigits, doesNotContainsSpecialCharacters, doesNotExceed15words } from "./validatePipelines";

describe('doesNotContainsDigits', () => {
    it('does not contains digits', () => {
        const expected_valids = ['a', 'b', 'c']
        const expected_invalids = []
        const [actual_valids, actual_invalids] = doesNotContainsDigits(['a', 'b', 'c'], [])

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });

    it('contains digits', () => {
        const expected_valids = ['a', 'b', 'd']
        const expected_invalids = ['c1', '2']
        const [actual_valids, actual_invalids] = doesNotContainsDigits(['a', 'b', 'c1', '2', 'd'], [])

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });
})

describe('doesNotContainsSpecialCharacters', () => {
    it('does not contains special characters', () => {
        const expected_valids = ['a', 'b', 'c']
        const expected_invalids = []
        const [actual_valids, actual_invalids] = doesNotContainsSpecialCharacters(['a', 'b', 'c'], [])

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });

    it('contains special characters', () => {
        const expected_valids = ['a', 'b', '2!', 'd']
        const expected_invalids = ['c@']
        const [actual_valids, actual_invalids] = doesNotContainsSpecialCharacters(['a', 'b', 'c@', '2!', 'd'], [])

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });
})

describe('doesNotExceed15words', () => {
    it('validates max 15 words in a sentence', () => {
        const input = [
            'a b c d e f g h i j k l m n',
            'a b c d e f g h i j k l m n o',
            'a b c d e f g h i j k l m n o p'
        ]
        const exisitingInvalides = [123]

        const expected_valids = [
            'a b c d e f g h i j k l m n',
        ]
        const expected_invalids = [
            ...exisitingInvalides,
            'a b c d e f g h i j k l m n o',
            'a b c d e f g h i j k l m n o p'
        ]

        const [actual_valids, actual_invalids] = doesNotExceed15words(input, exisitingInvalides)

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    })
})
