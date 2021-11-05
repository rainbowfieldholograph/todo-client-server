import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LOGIN_USER } from '../../graphql/mutation'
import styles from './Auth.module.css'

const Login = () => {
  const [loginUser] = useMutation(LOGIN_USER)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser({
        variables: { username: login, password: password },
      })
      localStorage.setItem('token', data.login)
      history.go('/home')
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.box} onSubmit={onSubmit} action="">
        <h1>Login</h1>
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
          Confirm
        </button>
        <Link to="/registration">
          <button className={styles.btn}>Registration</button>
        </Link>
      </form>
    </div>
  )
}

export default Login
