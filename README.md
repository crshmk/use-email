# A React hook for [Axios](https://axios-http.com/) users to identify valid and unique emails

when your application needs to ensure a user provided email is unique to the app

```bash
npm run build 
npm link 
npm link use-email
```

### Create the hook by passing a config
```javascript 
{
  // the axios request config
  // https://axios-http.com/docs/req_config
  axiosConfig,
   // the milliseconds to delay a server call between email input keystrokes
  delay,
  // a callback handed the axios error for requests with a status of 300+; defaults to console.log
  onFetchError
}

```
The axios request config api is [here](https://axios-http.com/docs/req_config). Set the `baseURL` prop as the endpoint to receive requests.

```javascript
// useEmail.js
import createEmailHook from 'use-email'

const validateEmailEndpoint = 'http://localhost:8080/validate-email'

const axiosConfig = {
  baseURL: validateEmailEndpoint,
  withCredentials: true
}

const emailHookConfig = {
  axiosConfig,
  delay: 300,
  onFetchError: console.log
}

const useEmail = createEmailHook(emailHookConfig)

export default useEmail
```

### Use the hook in a component

```javascript
// EmailInput.js
import useEmail from './useEmail'


const EmailInput = () => {
  const {
    doesEmailExist,
    email,
    isFetchingEmail,
    isValidEmail,
    onChangeEmailInput
  } = useEmail()

 const style = { color: isValidEmail ? 'black' : 'red' }

 return (
  <>
  <input value={email} onChange={onChangeEmailInput} style={style} />
  {isFetchingEmail && <p>Checking that email address...</p>}
  {doesEmailExist && <p>Email already in use</p>}
  </>
 )
}
```

## Server setup

Axios sends a post request to the `baseURL` endpoint (passed to the [hook config](https://github.com/crshmk/use-email#create-the-hook-by-passing-a-config)) with an `email` payload prop
```json
{ "email": "emailinput@co.com" }
```

The client expects a response from the server with this shape 
```json
{ "doesEmailExist": true }
```
and will then update the `doesEmailExist` hook prop 

## Hook api 

`doesEmailExist`: Boolean - most recent response from the server; if the email has yet to be used by a user

`email`: String - the value of the email input, to be set as the input value and likely useful in a `useEffect` hook

`isFetchingEmail`: Boolean

`isValidEmail`: Boolean - if the current email value is a valid email 

`onChangeEmailInput`: Function - the `onChange` handler for the email input