// styles
import './header.scss'

// assets | icons | images
import brandLogo from '../../assets/logos/argentBankLogo.webp'
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

// types
import { ReactElement } from 'react'

// hooks
import { Link } from 'react-router-dom'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../API/redux/store/store.ts'
import { logout } from '../../API/redux/reducers/userSlice'

export default function Header(): ReactElement {
  const { isAuthenticated, profile } = useSelector(
    (state: RootState) => state.user,
  )
  const dispatch = useDispatch()

  const h1TextContent = 'Argent Bank'
  return (
    <header>
      <nav>
        <Link to={'/'}>
          <figure>
            <img src={brandLogo} alt="Argent Bank Logo" />
          </figure>
          <h1>{h1TextContent}</h1>
        </Link>

        <>
          {isAuthenticated ? (
            <div className={'profileBtnWrapper'}>
              <Link to={'/home'}>
                <FaUserCircle size={'18'} />{' '}
                <span className={'profileBtn'}>{profile!.firstName}</span>
              </Link>
              <Link
                to={'/'}
                onClick={() => {
                  dispatch(logout())
                }}
              >
                <FaSignOutAlt size={'18'} />{' '}
                <span className={'signOutBtn'}>Sign Out</span>
              </Link>
            </div>
          ) : (
            <Link to={'/auth'}>
              <FaUserCircle size={'18'} />{' '}
              <span className={'signInBtn'}>Sign In</span>
            </Link>
          )}
        </>
      </nav>
    </header>
  )
}
