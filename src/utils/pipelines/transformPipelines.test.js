import { removeExtraWhitespace, removeRedundantSpaces, removeSpecialCharacters } from "./transformPipelines"

describe('removeSpecialCharacters', () => {
    it('does not touch regular characters', () => {
        const expected = ['a', 'b', 'c']
        const actual = removeSpecialCharacters(['a', 'b', 'c'])

        expect(actual).toEqual(expected)
    });

    it('removes special characters', () => {
        const expected = ['a b c']
        const actual = removeSpecialCharacters(['a@b^c'])

        expect(actual).toEqual(expected)
    });
});


describe('removeRedundantSpaces', () => {
    it('removes redundant spaces', () => {
        const expected = ['a ', ' b', 'c d', ' e ']
        const actual = removeRedundantSpaces(['a  ', '  b', 'c  d', '  e  '])

        expect(actual).toEqual(expected)
    });
});

describe('removeExtraWhitespace', () => {
    it('removes extra spaces', () => {
        const expected = ['a', 'b', 'c', 'd']
        const actual = removeExtraWhitespace(['a ', ' b', ' c ', 'd'])

        expect(actual).toEqual(expected)
    });

    it('removes extra tabs', () => {
        const expected = ['a', 'b', 'c', 'd']
        const actual = removeExtraWhitespace(['a\t', '\tb', '\tc\t', 'd'])

        expect(actual).toEqual(expected)
    });
});