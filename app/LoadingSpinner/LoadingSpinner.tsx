import React from 'react'
import * as styles from './LoadingSpinner.m.css'

export const LoadingSpinner: React.FC<{}> = (): React.ReactElement => {
  return (
    <div className={styles.loadingRingContainer}>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
