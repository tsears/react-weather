import React from 'react'
import * as styles from './Card.m.css'

type Props = {
  children?: React.ReactNode,
}

export const Card: React.FC<Props> = ({ children }): React.ReactElement => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  )
}
