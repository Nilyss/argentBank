// styles
import './signForm.scss'

// types
import { ReactElement } from 'react'
interface ISignFormProps {
  isSignUp: boolean
}

export default function SignForm({ isSignUp }: ISignFormProps): ReactElement {
  const signUpForm = (): ReactElement => {
    return <form>Sign Up Form</form>
  }

  const signInForm = (): ReactElement => {
    return <form>Sign In Form</form>
  }

  return isSignUp ? signUpForm() : signInForm()
}
