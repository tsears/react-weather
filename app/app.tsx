import 'css/index.scss'
import * as styles from './app.m.css'

import { Header } from './Header/Header'
import { Body } from './Body/Body'
import { Footer } from './Footer/Footer'

import * as React from 'react'

import { createRoot } from 'react-dom/client'

export default class App extends React.Component {
  public render (): React.ReactElement {
    return (
      <div className={styles.app}>
        <Header />
        <Body />
        <Footer />
      </div>
    )
  }
}
const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
