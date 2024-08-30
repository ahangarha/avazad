import { validateRawText } from "./validator";

describe('validatorRawText', () => {
  beforeEach(() => {});

  it('returns an object of valids and invalids sentenses', () => {
    expect(validateRawText('')).toEqual(
      expect.objectContaining({
        valids: expect.any(Array),
        invalids: expect.any(Array),
      })
    );
  });
});
