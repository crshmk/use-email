import { getResponse } from './utils'

const errorMessage = 'Bad server response to useEmail'

const responseOptions = [true, false]

const createErrorMessage = responseData => 
  `${errorMessage}: ${responseData}`

const handleBadResponse = response => {
  const result = getResponse(response)
  if(!responseOptions.includes(result)) {
    let responseData
    try {
      responseData = JSON.stringify(response?.data)
      const errorMessage = createErrorMessage(responseData)
      return Promise.reject(errorMessage)
    } catch (stringifyError) {
      return Promise.reject(errorMessage)
    }
  }
}

export default handleBadResponse