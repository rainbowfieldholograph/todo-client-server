import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_INFO_FROM_TOKEN } from '../../graphql/query'
import styles from './Header.module.css'

const Header = () => {
  const { data } = useQuery(GET_INFO_FROM_TOKEN, {
    variables: { token: localStorage.getItem('token') },
  })
  return (
    <div className={styles.header}>
      <div>
        <h1>Maybetomorrow</h1>
      </div>
      <div>
        <h1>{data?.getInfoFromToken?.username}</h1>
      </div>
    </div>
  )
}

export default Header
