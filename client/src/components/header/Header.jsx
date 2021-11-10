import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_CURRENT_USER } from '../../graphql/query'
import styles from './Header.module.css'

const Header = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  return (
    <div className={styles.header}>
      <div>
        <h1>Maybetomorrow</h1>
      </div>
      <div>
        <h1>{data?.getCurrentUser?.username}</h1>
      </div>
    </div>
  )
}

export default Header
