import {
    acceptsOnlyPersianCharacters,
    doesNotContainsDigits,
    doesNotContainsSpecialCharacters,
    doesNotExceed15words
} from "./validatePipelines";

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

describe('acceptsOnlyPersianCharacters', () => {
    it('accepts only Persian characters and punctuations', () => {
        const input = [
            'فقط فارسی',
            'فارسی با اعداد ۱۲۳',
            'نیم‌فاصله',
            'واقعا؟!',
            'فارسی و english',
            'فارسی و عربي'
        ]

        const exisitingInvalides = ['123']

        const expected_valids = [
            'فقط فارسی',
            'نیم‌فاصله',
            'واقعا؟!',
        ]
        const expected_invalids = [
            ...exisitingInvalides,
            'فارسی با اعداد ۱۲۳',
            'فارسی و english',
            'فارسی و عربي'
        ]

        const [actual_valids, actual_invalids] = acceptsOnlyPersianCharacters(input, exisitingInvalides)

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });

    it('bogus text', () => {
        const input = ['تغییرات رو فرستادم بالا']

        const expected_valids = ['تغییرات رو فرستادم بالا']
        const expected_invalids = []

        const [actual_valids, actual_invalids] = acceptsOnlyPersianCharacters(input, [])

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });

    it('check comma', () => {
        const input = ['اینجا، ویرگول داریم']

        const expected_valids = ['اینجا، ویرگول داریم']
        const expected_invalids = []

        const [actual_valids, actual_invalids] = acceptsOnlyPersianCharacters(input, [])

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });

    it('check hamza', () => {
        const input = ['سؤال', 'مسأله', 'انشاء', 'جرئت', 'ثقة الإسلام']

        const expected_valids = ['سؤال', 'مسأله', 'انشاء', 'جرئت', 'ثقة الإسلام']
        const expected_invalids = []

        const [actual_valids, actual_invalids] = acceptsOnlyPersianCharacters(input, [])

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });

    it('check sar-e-ya', () => {
        const input = ['مسئلهٔ من']

        const expected_valids = ['مسئلهٔ من']
        const expected_invalids = []

        const [actual_valids, actual_invalids] = acceptsOnlyPersianCharacters(input, [])

        expect(actual_valids).toEqual(expected_valids)
        expect(actual_invalids).toEqual(expected_invalids)
    });
});
