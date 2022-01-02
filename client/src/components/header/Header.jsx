import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../graphql/query'
import styles from './Header.module.css'

const Header = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  return (
    <header className={styles.header}>
      <div>
        <h1>Maybetomorrow</h1>
      </div>
      <div>
        <h1>{data?.getCurrentUser?.username}</h1>
      </div>
    </header>
  )
}

export default Header
