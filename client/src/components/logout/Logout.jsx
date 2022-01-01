import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/context'
import styles from './Logout.module.css'

const Logout = () => {
  const { setIsAuth } = useContext(AuthContext)
  const history = useHistory()

  const onClickLogOut = () => {
    localStorage.removeItem('token')
    history.push('/')
    setIsAuth(false)
  }

  return (
    <button className={styles.logoutButton} onClick={onClickLogOut}>
      LOGOUT
    </button>
  )
}

export default Logout
