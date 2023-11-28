import * as React from 'react'
import * as styles from './SearchBar.m.css'
import { MagnifyingGlass } from '../assets/Icons/Icons'

export const SearchBar: React.FC<{}> =
(): React.ReactElement => {
  return (
    <div className={styles.searchBarContainer}>
      <h2>Search</h2>
      <div className={styles.searchBoxContainer}>
        <input className={styles.searchBoxInput}
          placeholder="City, ST or zip"></input>
        <div className={styles.searchBoxIcon}>
          {MagnifyingGlass}
        </div>
      </div>
    </div>
  )
}
