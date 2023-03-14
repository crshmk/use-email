import isEmail from '../isEmail'

describe('isEmail util', () => {
  test('identifies correct email addresses', () => {
    expect(isEmail('asdf@co.com')).toBe(true)
    expect(isEmail('asdf@co.co.co.com')).toBe(true)
    expect(isEmail("a!#$%&'*+-/=?^_`{|}~@co.com")).toBe(true)
  })
  test('identifies incorrect email addresses', () => {
    expect(isEmail('a')).toBe(false)
    expect(isEmail('.com')).toBe(false)
    expect(isEmail('com')).toBe(false)
    expect(isEmail('@.co.com')).toBe(false)
    expect(isEmail('@asdf@co.com')).toBe(false)
    expect(isEmail('.asdf@co.com')).toBe(false)
  })
})