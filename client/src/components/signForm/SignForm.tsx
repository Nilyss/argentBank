// styles
import './signForm.scss'

// types
import { ReactElement } from 'react'
interface ISignFormProps {
  isSignUp: boolean
}

// hooks | libraries
import { FaUserCircle } from 'react-icons/fa'

export default function SignForm({ isSignUp }: ISignFormProps): ReactElement {
  const signUpForm = (): ReactElement => {
    return (
      <form id={'signForm'} className={isSignUp ? 'signUpForm' : 'signInForm'}>
        Sign Up Form
      </form>
    )
  }

  const signInForm = (): ReactElement => {
    return (
      <form id={'signForm'} className={isSignUp ? 'signUpForm' : 'signInForm'}>
        <div className={'formHeader'}>
          <FaUserCircle fill={'#000000'} size={'16'} />
          <h1>Sign In</h1>
        </div>

        <div className={'formBody'}>
          <div className={'inputWrapper'}>
            <label htmlFor={'email'}>Username</label>
            <input type={'email'} id={'email'} name={'email'} />
          </div>
          <div className={'inputWrapper'}>
            <label htmlFor={'password'}>Password</label>
            <input type={'password'} id={'password'} name={'password'} />
          </div>
          <div className={'rememberWrapper'}>
            <input type={'checkbox'} id={'remember'} name={'remember'} />
            <label htmlFor={'remember'}>Remember me</label>
          </div>
        </div>

        <div className={'formFooter'}>
          <button className={'signInButton'}>Sign In</button>
        </div>
      </form>
    )
  }

  return isSignUp ? signUpForm() : signInForm()
}
