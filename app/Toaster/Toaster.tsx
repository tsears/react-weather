import React, { useState, useImperativeHandle } from 'react'
import * as styles from './Toaster.m.css'

export type ToastRef = {
  toast: (message: string) => void
}

export const Toaster = React.forwardRef<ToastRef, {}>((_, ref) => {
  const [toasts, setToasts] = useState([])

  useImperativeHandle(ref, () => ({
    toast: (message: string) => {
      setToasts((prevToasts) => [...prevToasts, message])

      setTimeout(() => {
        setToasts((prevToasts) => {
          const a = [...prevToasts]
          a.pop()
          return a
        })
      }, 3000)
    },
  }))

  const renderToasts = (): React.ReactElement[] => {
    if (toasts.length === 0) {
      return [<div key="-1" />]
    }

    return toasts.map((t, index) =>
      (
        <div key={index} className={styles.toast}>
          <div className={styles.title}>Error!</div>
          {t}
        </div>
      )
    )
  }

  return (
    <div className={styles.toastContainer}>
      {renderToasts()}
    </div>
  )
})
