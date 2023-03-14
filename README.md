# A react hook for email validation with [axios](https://axios-http.com/)

when your application needs to ensure a user provided email is unique to the app

#### Peer dependencies 

- react  
- [axios](https://axios-http.com/)
- [lodash.debounce](https://www.npmjs.com/package/lodash.debounce)

---

## Client

```bash
npm run build 
npm link 
npm link use-email
```

### 1. Create the hook by passing a config
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
The axios request config shape is [here](https://axios-http.com/docs/req_config). Set the entire server endpoint on the `baseURL` prop; the `url` prop is disregarded.

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

### 2. Use the hook in a component

```javascript
// EmailInput.js
import useEmail from './useEmail'


const EmailInput = () => {
  const {
    email,
    isDuplicateEmail,
    isEmailUniq,
    isFetchingEmail,
    isValidEmail,
    onChangeEmailInput
  } = useEmail()

 const style = { color: isValidEmail ? 'black' : 'red' }

 return (
  <>
  <input value={email} onChange={onChangeEmailInput} style={style} />
  {isFetchingEmail && <p>Fetching...</p>}
  {isUniqEmail && <p>Email is ok</p>}
  {isDuplicateEmail && <p>A user with {email} exists</p>}
  </>
 )
}
```

### Hook api 

`email`: String - the value of the email input, to be set as the input value

`isDuplicateEmail`: Boolean - email has been determined by the server to be a duplicate

`isEmailUniq`: Boolean - email has been determined by the server to be yet unused

`isFetchingEmail`: Boolean

`isValidEmail`: Boolean - the current email value is a valid email according to [this test](https://github.com/crshmk/use-email/blob/master/src/isEmail.js)

`onChangeEmailInput`: Function - the `onChange` handler for the email input

---

## Server

Axios sends a post request to the `baseURL` endpoint (passed to the [hook config](https://github.com/crshmk/use-email#1-create-the-hook-by-passing-a-config)) with an `email` payload prop
```json
{ "email": "email@co.com" }
```

The client expects a response from the server with this shape 
```json
{ "data": { "isEmailUniq": true } }
```
and will then update the `isEmailUniq` hook prop. Only booleans signal a valid response.

```javascript 
// test middleware
export default function isEmailUniq(req, res) {
  const isEmailUniq = Math.random() < 0.5
  res.json({ isEmailUniq })
}
```


---

## Caveats 

- Each hook call handles a unique email input. Return all the props in one hook call; don't split as below. 

```javascript
const Spinner = () => {
  // nope; always false
  const { isFetchingEmail } = useEmail()
  return !isFetchingEmail ? null : <Loader />
}

const EmailInput = () => {
  const { email, onChangeEmailInput } = useEmail()
  return (
    <>
    <input value={email} onChange={onChangeEmailInput} />
    <Spinner />
    </>
  ) 
}
```

- The route should likely be [guarded](https://www.npmjs.com/package/express-throttle). 