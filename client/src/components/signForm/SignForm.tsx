// styles
import './signForm.scss'

// types
import { ReactElement, MouseEvent } from 'react'
interface ISignFormProps {
  isSignUp: boolean
  toggleSignForm: () => void
}

// hooks | libraries
import { FaUserCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../API/redux/store/store'
import {
  createUser,
  resetError,
  loginUser,
  getProfile,
} from '../../API/redux/reducers/userSlice'

// components
import Loader from '../loader/Loader'

export default function SignForm({
  isSignUp,
  toggleSignForm,
}: ISignFormProps): ReactElement {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)
  const [accountCreatedMessage, setAccountCreatedMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  const { loading, error, id, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  )

  const handleError = (error: string) => {
    if (isSignUp) {
      if (error === '400') {
        setErrorMessage('Email already exists')
      } else if (error === '500') {
        setErrorMessage('Erreur interne, veuillez réessayer plus tard')
      }
    } else {
      if (error === '400') {
        setErrorMessage('Email ou mot de passe incorrect')
      } else if (error === '500') {
        setErrorMessage('Erreur interne, veuillez réessayer plus tard')
      }
    }
  }

  const handleSignUpSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const createUserAction = await dispatch(
      createUser({
        email,
        firstName,
        lastName,
        password,
      }),
    )

    if (createUserAction.meta.requestStatus === 'fulfilled') {
      setAccountCreatedMessage('Account created, please sign in')
      toggleSignForm()
    }
  }

  const handleSignInSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const loginAction = await dispatch(loginUser({ email, password, remember }))

    if (
      loginAction.meta.requestStatus === 'fulfilled' &&
      typeof loginAction.payload !== 'string'
    ) {
      const token = loginAction.payload!.body.token

      if (!remember) localStorage.removeItem('authToken')

      await dispatch(getProfile({ token }))

      if (isAuthenticated) {
        navigate('/home')
      }
    } else {
      console.error('Login failed')
    }
  }

  useEffect(() => {
    if (error) {
      handleError(error)
    } else {
      setErrorMessage('')
    }
  }, [error, setEmail, id])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          id={'signForm'}
          className={isSignUp ? 'signUpForm' : 'signInForm'}
        >
          <div className={'formHeader'}>
            <FaUserCircle fill={'#000000'} size={'16'} />
            <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          </div>

          <div className={'formBody'}>
            <div className={'inputWrapper'}>
              <label htmlFor={'email'}>
                {isSignUp ? `Email adresse` : `Username`}
              </label>
              <input
                type={'email'}
                id={'email'}
                name={'email'}
                onChange={(e) => {
                  if (error) dispatch(resetError())
                  setEmail(e.target.value)
                }}
              />
            </div>

            {isSignUp && (
              <>
                <div className={'inputWrapper'}>
                  <label htmlFor={'firstName'}>First name</label>
                  <input
                    type={'text'}
                    id={'firstName'}
                    name={'firstName'}
                    onChange={(e) => {
                      if (error) dispatch(resetError())
                      setFirstName(e.target.value)
                    }}
                  />
                </div>
                <div className={'inputWrapper'}>
                  <label htmlFor={'lastName'}>Last name</label>
                  <input
                    type={'text'}
                    id={'lastName'}
                    name={'lastName'}
                    onChange={(e) => {
                      if (error) dispatch(resetError())
                      setLastName(e.target.value)
                    }}
                  />
                </div>
              </>
            )}

            <div className={'inputWrapper'}>
              <label htmlFor={'password'}>Password</label>
              <input
                type={'password'}
                id={'password'}
                name={'password'}
                onChange={(e) => {
                  if (error) dispatch(resetError())
                  setPassword(e.target.value)
                }}
              />
            </div>

            {!isSignUp && (
              <>
                <div className={'rememberWrapper'}>
                  <input
                    type={'checkbox'}
                    id={'remember'}
                    name={'remember'}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label htmlFor={'remember'}>Remember me</label>
                </div>
              </>
            )}
          </div>

          {error && <p className={'error'}>{errorMessage}</p>}

          <div className={'formFooter'}>
            <button
              className={'signInButton'}
              onClick={isSignUp ? handleSignUpSubmit : handleSignInSubmit}
            >
              {isSignUp ? `Sign Up` : `Sign In`}
            </button>
            <p>
              {isSignUp ? (
                <>
                  Already have an account? Sign in{' '}
                  <span onClick={toggleSignForm}>here</span>.
                </>
              ) : (
                <>
                  {accountCreatedMessage ? (
                    <span className={'validMessage'}>
                      {accountCreatedMessage}
                    </span>
                  ) : (
                    <>
                      Don’t have an account yet? Create{' '}
                      <span onClick={toggleSignForm}>here</span>.
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        </form>
      )}
    </>
  )
}
