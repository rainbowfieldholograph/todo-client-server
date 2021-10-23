import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { REGISTER_USER } from '../../graphql/mutation'
import styles from './Auth.module.css'

const Registration = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [registerUser] = useMutation(REGISTER_USER)

  const onClickRegistration = async (e) => {
    e.preventDefault()
    try {
      await registerUser({
        variables: {
          username: login,
          password: password,
        },
      })
      window.location.assign('/')
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.box} action="">
        <h1>Registration</h1>
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Login"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        <button onClick={(e) => onClickRegistration(e)} className={styles.btn}>
          Create account
        </button>
      </form>
    </div>
  )
}

export default Registration
