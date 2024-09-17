import { removeNullString } from './filterPipelines'

describe('removeNullString', () => { 
  it('removes null strings', () => {
    const expected = []
    const actual = removeNullString([''])

    expect(actual).toEqual(expected)
  })

  it('removes whitespace strings', () => {
    const expected = []
    const actual = removeNullString([' ', '   ', '\t', '\n'])

    expect(actual).toEqual(expected)
  })
})