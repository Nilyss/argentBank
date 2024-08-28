// styles
import './featureCard.scss'

// types
import { ReactElement } from 'react'
export interface IFeatureCardProps {
  props: {
    icon: string
    title: string
    overview: string
  }
}

export default function FeatureCard(props: IFeatureCardProps): ReactElement {
  return (
    <div id={'featureCard'}>
      <div className={'iconContainer'}>
        <figure>
          <img src={props.props.icon} alt={props.props.title} />
        </figure>
      </div>
      <div className={'content'}>
        <h3>{props.props.title}</h3>
        <p>{props.props.overview}</p>
      </div>
    </div>
  )
}
