const defaultDelay = 700
const defaultErrorHandler = console.log

/**
 * @param items Array<String> old state
 * @return Array<String> new state with item added
 */
export const concatEmail = newEmail => emails => 
  emails.concat(newEmail)

/**
 * @param config Object { delay: Number }
 * @return Number
 */
export const getDelay = config => 
  config?.delay || defaultDelay

/**
 * @param config Object { onFetchError: Function }
 * @return Function handed the error response 
 */
export const getOnFetchError = config => 
  config?.onFetchError || defaultErrorHandler

/**
 * @param response Axios response 
 * @return Boolean { data: { isEmailUniq: true } }
 */
export const getResponse = response => 
  response?.data?.isEmailUniq