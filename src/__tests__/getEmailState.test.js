import getEmailState from '../getEmailState'

const duplicateEmailState = ['aaa@co.com', 'bbb@co.com']
const uniqEmailState = ['xxx@co.com', 'yyy@co.com']

const createEmailState = getEmailState(duplicateEmailState, uniqEmailState)

describe('getEmailState util', () => { 
  test('blocks a fetch when an email is already a known duplicate', () => {
    const redundantDuplicateEmail = 'aaa@co.com'
    const { isBlockedFetch } = createEmailState(redundantDuplicateEmail)
    expect(isBlockedFetch).toBe(true)
  })
  test('blocks a fetch when an email is already known to be unique', () => {
    const redundantUniqEmail = 'aaa@co.com'
    const { isBlockedFetch } = createEmailState(redundantUniqEmail)
    expect(isBlockedFetch).toBe(true)
  })
  test('identifies a duplicate email in the cache', () => {
    const duplicateEmail = 'aaa@co.com'
    const { isDuplicateEmail, isUniqEmail } = createEmailState(duplicateEmail)
    expect(isDuplicateEmail).toBe(true)
    expect(isUniqEmail).toBe(false)

    const newEmail = 'ccc@co.com'
    const stateWithNewEmail = createEmailState(newEmail)
    expect(stateWithNewEmail.isDuplicateEmail).toBe(false)
    expect(stateWithNewEmail.isUniqEmail).toBe(false)
  })
  test('identifies a unique email in the cache', () => {
    const uniqEmail = 'xxx@co.com'
    const { isDuplicateEmail, isUniqEmail } = createEmailState(uniqEmail)
    expect(isUniqEmail).toBe(true)
    expect(isDuplicateEmail).toBe(false)

    const newEmail = 'ddd@co.com'
    const stateWithNewEmail = createEmailState(newEmail)
    expect(stateWithNewEmail.isUniqEmail).toBe(false)
    expect(stateWithNewEmail.isDuplicateEmail).toBe(false)
  })
  test('trims the email input', () => {
    const emailInput = '   me@co.com  '
    const { trimmedEmail } = createEmailState(emailInput)
    expect(trimmedEmail).toBe('me@co.com')
  })
 })