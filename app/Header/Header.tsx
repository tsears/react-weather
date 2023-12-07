import React from 'react'
import * as styles from './Header.m.css'

type HeaderProps = {
  children?: React.ReactNode
}
export const Header: React.FunctionComponent<HeaderProps> =
({ children }: HeaderProps): React.ReactElement => (
  <div className={styles.header}>
    <h1>
      Weather
    </h1>
    <div>
      {children}
    </div>
  </div>
)
