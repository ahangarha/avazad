import { validateRawText } from "./textProcessor";

function arraysHaveSameElements(arr1, arr2) {
  if (arr1.length !== arr2.length) return false

  return arr1.every(element => arr2.includes(element))
      && arr2.every(element => arr1.includes(element))
}

describe('validateRawText', () => {
  beforeEach(() => { });

  it('returns an object of valids and invalids sentenses', () => {
    expect(validateRawText('')).toEqual(
      expect.objectContaining({
        valids: expect.any(Array),
        invalids: expect.any(Array),
      })
    );
  });

  it('system test', () => {
    const input = `
    
سلام
اینجا. نقطه داشت
نیم‌فاصله
آخرش نقطه دارد.
واقعا؟!
    چندتا تب بزینم\t\tتا خوب بشویم  \t\t\t
اسپیس     های   زیاد!
امسال سال ۱۴۰۳ است
فاصله ها به نیم‌فاصله تبدیل می شوند
متن english داریم
امسال به انگلیسی 1403 است
دوش چه خورده‌ای دلا؟
روضهٔ حسینیه فاطمة الزهرا
ثقة الإسلام رؤیاپرداز
شماره ملی من به 54321 می‌تواند ختم بشود
در این در گه که گه گه که که و که که شود ناگه مشو غره به امروزت که از فردا نه‌ای آگه
آوای مشترک موزیلا
و عدد بیشتر از چهار رقم فارسی هم ۱۲۳۴۵ است`

    const expected_valids = [
      'سلام',
      'اینجا',
      'نقطه داشت',
      'نیم‌فاصله',
      'آخرش نقطه دارد',
      'واقعا؟!',
      'چندتا تب بزینم تا خوب بشویم',
      'اسپیس‌های زیاد!',
      'امسال سال یک هزار و چهارصد و سه است',
      'فاصله‌ها به نیم‌فاصله تبدیل می‌شوند',
      'امسال به انگلیسی یک هزار و چهارصد و سه است',
      'دوش چه خورده‌ای دلا؟',
      'روضهٔ حسینیه فاطمة الزهرا',
      'ثقة الإسلام رؤیاپرداز',
      'آوای مشترک موزیلا',
    ]
    const expected_invalids = [
      'شماره ملی من به 54321 می‌تواند ختم بشود',
      'در‌این در گه که گه گه که که و که که شود ناگه مشو غره به‌امروزت که از فردا نه‌ای آگه',
      'متن english داریم',
      'و عدد بیشتر از چهار رقم فارسی هم ۱۲۳۴۵ است',
    ]

    const { valids: actual_valids, invalids: actual_invalids } = validateRawText(input)

    expect(arraysHaveSameElements(actual_valids, expected_valids)).toBe(true)
    expect(arraysHaveSameElements(actual_invalids, expected_invalids)).toBe(true)
  });
});
