import * as React from 'react'
import * as styles from './Body.m.css'

interface BodyState { lmao: string }

export class Body extends React.Component<{}, BodyState> {
  public constructor (props: {}) {
    super(props)

    this.state = {
      lmao: null,
    }
  }

  public render (): React.ReactElement {
    const { lmao } = this.state

    return (
      <div className={styles.body}>
        <h1 className={styles.heading}>React Scaffold</h1>
        <div>Ayy {lmao}</div>
      </div>
    )
  }

  public async componentDidMount (): Promise<void> {
    const response = await fetch('/api/ayy')
    if (!response.ok) {
      throw new Error('HTTP error, status = ' + response.status)
    }

    const data = await response.json()

    this.setState({
      lmao: data.response,
    })
  }
}
