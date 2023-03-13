/**
 * @param config Object { axiosConfig, delay, onFetchError }
 * @return react hook exposing the following api
 *   {
 *     doesEmailExist,
 *     email,
 *     isFetchingEmail,
 *     isValidEmail,
 *     onChangeEmailInput
 *   }
 * 
 * @example 
 * 
 *   import createEmailHook from 'use-email'
 * 
 *   const useEmail = createEmailHook({
 *     axiosConfig: {
 *       baseURL: 'http://localhost:8080/validate-email',
 *       withCredentials: true
 *     },
 *     delay: 300,
 *     onFetchError: console.log
 *   })
 * 
 *   const {
 *     doesEmailExist,
 *     email,
 *     isFetchingEmail,
 *     isValidEmail,
 *     onChangeEmailInput
 *   } = useEmail()
 * 
 *   const style = { color: isValidEmail ? 'black' : 'red' }
 * 
 *   return (
 *     <>
 *     <input value={email} onChange={onChangeEmailInput} style={style} />
 *     {isFetchingEmail && <p>Fetching...</p>}
 *     {doesEmailExist && <p>Email already in use</p>}
 *     </>
 *   )
 */
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import isEmail from './isEmail'
import makeHttp from './makeHttp'
import { getDelay, getOnFetchError, getResponse } from './utils'

const useEmail = config => {
  const delay = getDelay(config)
  const onFetchError = getOnFetchError(config)
  const http = makeHttp(config)

  return () => {
    const [doesEmailExist, setDoesEmailExist] = useState(false)
    const [email, setEmail] = useState('')
    const [isFetching, setIsFetching] = useState(false)

    const onSuccess = response => {
      const result = getResponse(response)
      setDoesEmailExist(result)
      setIsFetching(false)
    }

    const onError = errorResponse => {
      onFetchError(errorResponse)
      setIsFetching(false)
    }

    function fetchEmail(emailValue) {
      setIsFetching(true)
      http.post('/', { email: emailValue })
        .then(onSuccess)
        .catch(onError)
    }

    const debouncedFetchEmailRef = useRef(debounce(fetchEmail, delay))

    useEffect(() => {
      if(!isValidEmail) return 
      debouncedFetchEmailRef.current(email)   
    }, [email])

    const onChangeEmailInput = e => setEmail(e.target.value)

    const isValidEmail = isEmail(email)
  
    return {
      doesEmailExist,
      email, 
      isFetchingEmail: isFetching,
      isValidEmail,
      onChangeEmailInput
    }
  }
} 

export default useEmail