import * as React from 'react'
import * as styles from './Footer.m.css'

const currentYear = new Date().getFullYear()

export const Footer: React.FunctionComponent<{}> = (): React.ReactElement => (
  <div className={styles.footer}>
    <div>React Scaffold</div>
    <div>&copy;{currentYear} Tom Sears</div>
  </div>
)
