import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { REGISTER_USER } from '../../graphql/mutation'
import styles from './Auth.module.css'

const Registration = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [registerUser] = useMutation(REGISTER_USER)

  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser({
        variables: {
          username: login,
          password: password,
        },
      })
      history.push('/')
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.box} action="" onSubmit={onSubmit}>
        <h1>Registration</h1>
        <input
          id="login"
          name="login"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Enter your login"
        />
        <input
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          type="password"
          placeholder="Enter your password"
        />
        <button type="submit" className={styles.btn}>
          Create account
        </button>
      </form>
    </div>
  )
}

export default Registration
