const defaultDelay = 300

/**
 * @param config Object { onFetchError: Function }
 * @return Function handed the error response 
 */
export const getOnFetchError = config => config?.onFetchError || console.log

/**
 * @param config Object { delay: Number }
 * @return Number
 */
export const getDelay = config => config?.delay || defaultDelay

/**
 * @param response Axios response 
 * @return Boolean from response shape { data: { doesEmailExist: true } }
 */
export const getResponse = response => !!response?.data?.doesEmailExist