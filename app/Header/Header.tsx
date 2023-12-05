import * as React from 'react'
import * as styles from './Header.m.css'
import { SearchBar } from '../SearchBar/SearchBar'

type HeaderProps = {
  updateCallback: (query: string) => void
}
export const Header: React.FunctionComponent<HeaderProps> =
({ updateCallback }: HeaderProps): React.ReactElement => (
  <div className={styles.header}>
    <h1>
      Weather
    </h1>
    <div>
      <SearchBar callback={updateCallback}/>
    </div>
  </div>
)
