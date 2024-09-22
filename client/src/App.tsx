// styles
import './utils/styles/global.scss'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// components
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

// layout
import LandingPage from './layouts/landingPage/LandingPage'
import AuthPage from './layouts/authPage/AuthPage'
import HomePage from './layouts/homePage/HomePage'

function App(): ReactElement {
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
