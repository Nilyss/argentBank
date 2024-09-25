// utils
import { formatNumber } from '../../utils/scripts/Utils'

// styles
import './transactionCard.scss'

// types
import { ReactElement } from 'react'
export interface ITransactionCardProps {
  data: {
    transactionName: string
    transactionAmount: number
    transactionType: string
  }
}

export default function TransactionCard({
  data,
}: ITransactionCardProps): ReactElement {
  return (
    <>
      {data && (
        <section id={'transactionCard'}>
          {/* left side */}
          <div>
            <ul>
              <li>
                <p className={'transactionCardName'}>{data.transactionName}</p>
                <p className={'transactionCardAmount'}>
                  ${formatNumber(data.transactionAmount)}
                </p>
                <p className={'transactionCardType'}>{data.transactionType}</p>
              </li>
            </ul>
          </div>
          {/* right side */}
          <div className={'transactionCardButtonContainer'}>
            <button className={'transactionCardButton'}>View transactions</button>
          </div>
        </section>
      )}
    </>
  )
}
