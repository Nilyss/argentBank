// styles
import './utils/styles/global.scss'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { AppDispatch } from './API/redux/store/store.ts'
import { getProfile } from './API/redux/reducers/userSlice'

// components
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

// layout
import LandingPage from './layouts/landingPage/LandingPage'
import AuthPage from './layouts/authPage/AuthPage'
import HomePage from './layouts/homePage/HomePage'

function App(): ReactElement {
  const [token, setToken] = useState<string | null>(null)
  const dispatch: AppDispatch = useDispatch()

  const getTokenFromLocalStorage = (): void => {
    setToken(localStorage.getItem('authToken'))
  }

  useEffect(() => {
    getTokenFromLocalStorage()
  }, [])

  useEffect(() => {
    if (token !== null) {
      dispatch(getProfile({ token }))
    }
  }, [token])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route path={'/auth'} element={<AuthPage />} />
        <Route path={'/home'} element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
