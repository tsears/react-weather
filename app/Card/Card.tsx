import React from 'react'
import * as styles from './Card.m.css'

type Props = {
  children?: React.ReactNode,
}

export const Card: React.FC<Props> = ({ children }): React.ReactElement => {
  const cardClasses = `${styles.card} card`
  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
}
