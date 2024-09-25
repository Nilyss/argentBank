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
import TransactionCard from '../../components/transactionCard/TransactionCard'

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

  const transactionsMock = [
    {
      transactionName: 'Argent Bank Checking (x8349)',
      transactionAmount: 208279,
      transactionType: 'Available Balance',
    },
    {
      transactionName: 'Argent Bank Savings (x6712)',
      transactionAmount: 1092842,
      transactionType: 'Available Balance',
    },
    {
      transactionName: 'Argent Bank Credit Card (x8349)',
      transactionAmount: 18430,
      transactionType: 'Current Balance',
    },
  ]

  return (
    <main id={'homePage'}>
      <UserProfile />
      <div className={'transactionCardContainer'}>
        {transactionsMock.map((transaction, index) => {
          return <TransactionCard key={index} data={transaction} />
        })}
      </div>
    </main>
  )
}
