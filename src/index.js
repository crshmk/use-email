/**
 * @param config Object { axiosConfig, delay, onFetchError }
 * @return react hook exposing the following api
 *  {
 *    email, 
 *    isDuplicateEmail,
 *    isFetchingEmail,
 *    isUniqEmail,
 *    isValidEmail,
 *    onChangeEmailInput
 *  }
 * 
 * @example 
 *   https://github.com/crshmk/use-email#readme
 */
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

import getEmailState from './getEmailState'
import handleBadResponse from './handleBadResponse'
import makeHttp from './makeHttp'
import { 
  concatEmail, 
  getDelay, 
  getOnFetchError, 
  getResponse 
} from './utils'

const useEmail = config => {
  const delay = getDelay(config)
  const onFetchError = getOnFetchError(config)
  const http = makeHttp(config)

  return () => {
    const [email, setEmail] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [duplicateEmails, setDuplicateEmails] = useState([])
    const [uniqEmails, setUniqEmails] = useState([])

    const onSuccess = emailValue => response => {
      handleBadResponse(response)
      const isEmailUniq = getResponse(response)
      const addItem = concatEmail(emailValue)
      const updateState = isEmailUniq ? setUniqEmails : setDuplicateEmails
      updateState(addItem)
      setIsFetching(false)
    }

    const onError = errorResponse => {
      onFetchError(errorResponse)
      setIsFetching(false)
    }

    function fetchEmail(email) {
      setIsFetching(true)
      http.post('/', { email })
        .then(onSuccess(email))
        .catch(onError)
    }

    const debouncedFetchEmailRef = useRef(
      debounce(fetchEmail, delay)
    )

    const createEmailState = getEmailState(duplicateEmails, uniqEmails)

    const {
      isBlockedFetch,
      isDuplicateEmail,
      isUniqEmail,
      isValidEmail,
      trimmedEmail
    } = createEmailState(email)

    useEffect(() => {
      if(isBlockedFetch) return 
      debouncedFetchEmailRef.current(trimmedEmail)   
    }, [email])

    const onChangeEmailInput = e => setEmail(e.target.value)

    return {
      email, 
      isDuplicateEmail,
      isFetchingEmail: isFetching,
      isUniqEmail,
      isValidEmail,
      onChangeEmailInput
    }
  }
} 

export default useEmail