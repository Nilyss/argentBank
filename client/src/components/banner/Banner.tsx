// styles
import './banner.scss'

// assets | icons | images
import bannerImg from '../../assets/imgs/bank-tree.webp'

// types
import { ReactElement } from 'react'

export default function Banner(): ReactElement {
  const h2TextContent = 'Promoted Content'
  const bannerTxt = [
    'No fees.',
    'No minimum deposit.',
    'High interest rates.',
    'Open a savings account with Argent Bank today!',
  ]

  return (
    <section id="banner">
      <figure>
        <img src={bannerImg} alt={'ArgentBank Tree'} />
      </figure>
      <article>
        <ul>
          <h2>{h2TextContent}</h2>
          {bannerTxt.map((txt, i) => (
            <li key={i}>{txt}</li>
          ))}
        </ul>
      </article>
    </section>
  )
}
