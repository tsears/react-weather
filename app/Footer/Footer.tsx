import React from 'react'
import * as styles from './Footer.m.css'
import { GitHub } from '../assets/Icons/Icons'

const currentYear = new Date().getFullYear()

export const Footer: React.FunctionComponent<{}> = (): React.ReactElement => (
  <div className={styles.footer}>
    <div>
      <a href='https://github.com/tsears/react-weather'>
        { GitHub }
      </a>
    </div>
    <div>&copy;{currentYear} Tom Sears</div>
  </div>
)
