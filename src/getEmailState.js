/**
 * @param duplicateEmails Array<String> 
 * @param email String 
 * @param uniqEmails Array<String> 
 * 
 * @return Object { 
 *           isBlockedFetch: Boolean, 
 *           isDuplicateEmail: Boolean, 
 *           isUniqEmail: Boolean, 
 *           isValidEmail: Boolean,
 *           trimmedEmail: String
 *         }
 */
import isEmail from './isEmail'

const getEmailState = (duplicateEmails, uniqEmails) => email => {
  const trimmedEmail = email.trim()
  const isDuplicateEmail = duplicateEmails.includes(trimmedEmail)
  const isUniqEmail = uniqEmails.includes(trimmedEmail)
  const isValidEmail = isEmail(trimmedEmail)
  const isBlockedFetch = !isValidEmail || isUniqEmail || isDuplicateEmail

  return {
    isBlockedFetch,
    isDuplicateEmail,
    isUniqEmail,
    isValidEmail,
    trimmedEmail
  }
}

export default getEmailState