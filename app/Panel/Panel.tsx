import React from 'react'
import * as styles from './Panel.m.css'

type Props = {
  children?: React.ReactNode,
}

export const Panel: React.FC<Props> = ({children}): React.ReactElement => {
  return (
    <div className={styles.panel}>
      {children}
    </div>
  )
}
