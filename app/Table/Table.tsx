import React from 'react'
import * as styles from './Table.m.css'

type KV = {
  [key: string]: string,
}

type Props = {
  tableData: KV
}

export const Table: React.FunctionComponent<Props> = ({ tableData }): React.ReactElement => {
  const rows: React.ReactNode[] = Object.keys(tableData).map(k => (
    <tr key={k}>
      <th>{k}</th>
      <td>{tableData[k]}</td>
    </tr>
  ))

  return (
    <table className={styles.table}>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}
