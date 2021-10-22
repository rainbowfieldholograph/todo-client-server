import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <h1>Todo List</h1>
      </div>
      <div>
        <h1>Login</h1>
      </div>
    </div>
  )
}

export default Header
