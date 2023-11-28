import * as React from 'react'
import * as styles from './Header.m.css'
import { GitHub } from '../assets/Icons/Icons'

export const Header: React.FunctionComponent<{}> = (): React.ReactElement => (
  <div className={styles.header}>
    <h1>
      Weather
    </h1>
    <div>
      <a href='https://github.com/tsears/react-weather'>
        { GitHub }
      </a>
    </div>
  </div>
)
