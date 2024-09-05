import {
    changeNumbersToText,
    removeExtraWhitespace,
    removeRedundantSpaces,
    removeSpecialCharacters,
    tranformSpaceToZwnj,
    transformArabicToPersian
} from "./transformPipelines"

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

describe('changeNumbersToText', () => {
    it('single ziro', () => {
        const ziro = ['0']
        const expected = ['صفر']
        
        const actual = changeNumbersToText(ziro)

        expect(actual).toEqual(expected)
    });

    it('one', () => {
        const one = ['1']
        const expected = ['یک']
        
        const actual = changeNumbersToText(one)

        expect(actual).toEqual(expected)
    });

    it('two digits till 19', () => {
        const two_digits = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19']

        const expected = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده']

        const actual = changeNumbersToText(two_digits)

        expect(actual).toEqual(expected)
    });

    it('two digits from 20 to 99', () => {
        const two_digits = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
            '30', '40', '50', '60', '70', '80', '90', '91', '95', '99'
        ]

        const expected = ['بیست', 'بیست و یک', 'بیست و دو', 'بیست و سه', 'بیست و چهار', 'بیست و پنج', 'بیست و شش', 'بیست و هفت', 'بیست و هشت', 'بیست و نه',
            'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود', 'نود و یک', 'نود و پنج', 'نود و نه'
        ]

        const actual = changeNumbersToText(two_digits)

        expect(actual).toEqual(expected)
    });

    it('three digits', () => {
        const three_digits = ['100', '200', '300', '400', '500', '600', '700', '800', '900']

        const expected = ['صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد']

        const actual = changeNumbersToText(three_digits)

        expect(actual).toEqual(expected)
    });

    it('four digits', () => {
        const four_digits = ['1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000']

        const expected = ['یک هزار', 'دو هزار', 'سه هزار', 'چهار هزار', 'پنج هزار', 'شش هزار', 'هفت هزار', 'هشت هزار', 'نه هزار']

        const actual = changeNumbersToText(four_digits)

        expect(actual).toEqual(expected)
    });

    it('three digits with two digits part', () => {
        const three_digits = ['101', '210', '311', '420', '555']

        const expected = [
            'صد و یک',
            'دویست و ده',
            'سیصد و یازده',
            'چهارصد و بیست',
            'پانصد و پنجاه و پنج'
        ]

        const actual = changeNumbersToText(three_digits)

        expect(actual).toEqual(expected)
    });

    it('full four digits number', () => {
        const four_digits = ['1234']

        const expected = ['یک هزار و دویست و سی و چهار']

        const actual = changeNumbersToText(four_digits)

        expect(actual).toEqual(expected)
    });

    it('does not touch numbers more that four digits', () => {
        const five_digits = ['12345']

        const expected = ['12345']

        const actual = changeNumbersToText(five_digits)

        expect(actual).toEqual(expected)
    });

    it('processes persian numbers', () => {
        const input = ['سال ۱۴۰۳ است']

        const expected = ['سال یک هزار و چهارصد و سه است']

        const actual = changeNumbersToText(input)

        expect(actual).toEqual(expected)
    });

    it('processes multiple persian numbers', () => {
        const input = ['سلام ماه ۱۲ از ۱۴۰۳ هستیم']
        
        const expected = ['سلام ماه دوازده از یک هزار و چهارصد و سه هستیم']

        const actual = changeNumbersToText(input)

        expect(actual).toEqual(expected)
    });

    it('bogus conversion to english digits', () => {
        const input = ['و عدد بیشتر از چهار رقم فارسی هم ۱۲۳۴۵ است']

        const expected = ['و عدد بیشتر از چهار رقم فارسی هم ۱۲۳۴۵ است']

        const actual = changeNumbersToText(input)

        expect(actual).toEqual(expected)
    });
});

describe('arabicToPersianTransform', () => {
    it('Should convert arabic yah and kaf to Persian', () => {
        const inputSentences = ['يك']

        const expected = ['یک']
        const actual = transformArabicToPersian(inputSentences)

        expect(actual).toEqual(expected)
    });
});


describe('tranformSpaceToZwnj', () => {
    it('replaces spaces with zwnj', () => {
        const inputSentences = [
            'او درخت ها را می برد',
            'این گل های زیبا را می بینی؟',
            'چه کتاب هایی خوانده ای',
        ]

        const expected = [
            'او درخت‌ها را می‌برد',
            'این گل‌های زیبا را می‌بینی؟',
            'چه کتاب‌هایی خوانده‌ای',
        ]
        const actual = tranformSpaceToZwnj(inputSentences)

        expect(actual).toEqual(expected)
    });
});
