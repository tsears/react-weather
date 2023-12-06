import React, { useState, useEffect } from 'react'
import * as styles from './SearchBar.m.css'
import { MagnifyingGlass } from '../assets/Icons/Icons'
import { ReverseLocation } from 'types/Location'

type Props = {
  callback: (query: string) => void
}

export const SearchBar: React.FC<Props> =
({ callback }: Props): React.ReactElement => {
  const [query, setQuery] = useState('')

  const onSubmit = (e: React.KeyboardEvent) => {
    if (e.which === 13) {
      callback(query)
    }
    e.preventDefault()
  }

  const onClick = () => {
    callback(query)
  }

  useEffect(() => {
    const fetchLocationData = async (lat: number, lon: number) => {
      const response = await fetch(`/api/geo/reverse?lat=${lat}&lon=${lon}`)
      const { city, state, country } = await response.json() as ReverseLocation
      const newQuery = `${city}${state ? ', ' : ''}${state}, ${country}`

      setQuery(newQuery)
      callback(newQuery)
    }

    navigator.geolocation.getCurrentPosition(l => {
      const { latitude, longitude } = l.coords
      fetchLocationData(latitude, longitude)
    })
  }, [callback])

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchLabel}>Search</div>
      <div className={styles.searchBoxContainer}>
        <input
          value={query}
          className={styles.searchBoxInput}
          placeholder="City, ST"
          onInput={e => setQuery((e.target as HTMLInputElement).value)}
          onKeyUp={onSubmit}
        ></input>
        <div className={styles.searchBoxIcon} onClick={onClick}>
          {MagnifyingGlass}
        </div>
      </div>
    </div>
  )
}
