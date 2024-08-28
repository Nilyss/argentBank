// styles
import './landingPage.scss'

// assets
import chatIcon from '../../assets/icons/icon-chat.webp'
import moneyIcon from '../../assets/icons/icon-money.webp'
import securityIcon from '../../assets/icons/icon-security.webp'

// types
import { ReactElement } from 'react'

// components
import Banner from '../../components/banner/Banner'
import FeatureCard from '../../components/featureCard/FeatureCard'

export default function LandingPage(): ReactElement {
  const cards = [
    {
      icon: chatIcon,
      title: 'You are our #1 priority',
      overview:
        'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
      icon: moneyIcon,
      title: 'More savings means higher rates',
      overview:
        'The more you save with us, the higher you interest rate will be!',
    },
    {
      icon: securityIcon,
      title: 'Security you can trust',
      overview:
        'We use top of the line encryption to make sure your data and money is always safe.',
    },
  ]

  return (
    <main>
      <Banner />
      <section id={'features'}>
        <h2>Features</h2>
        {cards.map((card, index) => (
          <FeatureCard
            key={index}
            props={{
              icon: card.icon,
              title: card.title,
              overview: card.overview,
            }}
          />
        ))}
      </section>
    </main>
  )
}
