import React from 'react'
import * as styles from './PanelContainer.m.css'

type Props = {
  children?: React.ReactNode
}

export const PanelContainer: React.FunctionComponent<Props> =
  ({ children }): React.ReactElement => {
    return (
      <div className={styles.panelContainer}>{children}</div>
    )
  }
