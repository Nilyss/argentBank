// styles
import './authPage.scss'

// types
import { ReactElement } from 'react'

// components
import SignForm from '../../components/signForm/SignForm'

// hooks
import { useState } from 'react'

export default function AuthPage(): ReactElement {
  const [isSignUp, setIsSignUp] = useState(false)

  const toggleSignForm = (): void => {
    setIsSignUp(!isSignUp)
  }

  return (
    <main id="authPage">
      <SignForm isSignUp={isSignUp} />
    </main>
  )
}
