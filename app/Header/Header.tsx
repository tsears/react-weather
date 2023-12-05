import * as React from 'react'
import * as styles from './Header.m.css'
import { SearchBar } from '../SearchBar/SearchBar'

export const Header: React.FunctionComponent<{}> = (): React.ReactElement => (
  <div className={styles.header}>
    <h1>
      Weather
    </h1>
    <div>
        <SearchBar callback={() => {}}/>
    </div>
  </div>
)
