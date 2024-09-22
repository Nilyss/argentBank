// styles
import './homePage.scss'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../../API/redux/store/store.ts'

// components
import UserProfile from '../../components/userProfile/UserProfile'

export default function HomePage(): ReactElement {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  const navigate = useNavigate()

  // if user is not logged in, redirect to /auth
  useEffect(() => {
    console.log('isAuthenticated ->', isAuthenticated)
    if (!isAuthenticated) {
      navigate('/auth')
    }
  }, [])

  return (
    <main id={'homePage'}>
      <UserProfile />
    </main>
  )
}
