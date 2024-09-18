// styles
import './signForm.scss'

// types
import { ReactElement, FormEvent } from 'react'
interface ISignFormProps {
  isSignUp: boolean
}
import { RootState, AppDispatch } from '../../API/redux/store/store'
import { resetError } from '../../API/redux/reducers/userSlice'

// hooks | libraries
import { FaUserCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { loginUser } from '../../API/redux/reducers/userSlice.ts'
import { useDispatch, useSelector } from 'react-redux'

// components
import Loader from '../loader/Loader'

export default function SignForm({ isSignUp }: ISignFormProps): ReactElement {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector(
    (state: RootState) => state.user,
  )

  useEffect(() => {
    if (error) {
      handleError(error)
    } else {
      setErrorMessage('')
    }
  }, [error, setEmail])

  const handleError = (error: string) => {
    if (error === '400') {
      setErrorMessage('Email ou mot de passe incorrect')
    } else if (error === '500') {
      setErrorMessage('Erreur interne, veuillez réessayer plus tard')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await dispatch(loginUser({ email, password, remember }))

    if (!remember) localStorage.removeItem('authToken')
  }

  const signUpForm = (): ReactElement => {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <form
            id={'signForm'}
            className={isSignUp ? 'signUpForm' : 'signInForm'}
          >
            Sign Up Form
          </form>
        )}
      </>
    )
  }

  const signInForm = (): ReactElement => {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <form
            id={'signForm'}
            className={isSignUp ? 'signUpForm' : 'signInForm'}
            onSubmit={handleSubmit}
          >
            <div className={'formHeader'}>
              <FaUserCircle fill={'#000000'} size={'16'} />
              <h1>Sign In</h1>
            </div>

            <div className={'formBody'}>
              <div className={'inputWrapper'}>
                <label htmlFor={'email'}>Username</label>
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
              <div className={'rememberWrapper'}>
                <input
                  type={'checkbox'}
                  id={'remember'}
                  name={'remember'}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor={'remember'}>Remember me</label>
              </div>
            </div>

            {error && <p className={'error'}>{errorMessage}</p>}

            <div className={'formFooter'}>
              <button className={'signInButton'} type={'submit'}>
                Sign In
              </button>
            </div>
          </form>
        )}
      </>
    )
  }

  return isSignUp ? signUpForm() : signInForm()
}
