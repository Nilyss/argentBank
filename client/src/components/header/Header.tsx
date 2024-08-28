// styles
import './header.scss'

// assets | icons | images
import brandLogo from '../../assets/logos/argentBankLogo.webp'
import { FaUserCircle } from 'react-icons/fa'

// types
import { ReactElement } from 'react'

// hooks
import { Link } from 'react-router-dom'

export default function Header(): ReactElement {
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
        <Link to={'/auth'}>
          <FaUserCircle size={'18'} />{' '}
          <span className={'signInBtn'}>Sign In</span>
        </Link>
      </nav>
    </header>
  )
}
