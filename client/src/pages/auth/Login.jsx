import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { LOGIN_USER } from '../../graphql/mutation'
import styles from './Auth.module.css'

const Login = () => {
  const [loginUser] = useMutation(LOGIN_USER)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [redir, setRedir] = useState(false)

  const onClickLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser({
        variables: { username: login, password: password },
      })
      console.log(data.login)
      localStorage.setItem('token', data.login)
      setRedir(true)
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.box} action="">
        <h1>Login</h1>
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
          type="text"
          placeholder="Password"
        />
        <button onClick={(e) => onClickLogin(e)} className={styles.btn}>
          Login
        </button>
        <Link to="/registration">
          <button className={styles.btn}>Registration</button>
        </Link>
        {redir && <Redirect to="/home" />}
      </form>
    </div>
  )
}

export default Login
