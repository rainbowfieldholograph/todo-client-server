import { useState, useCallback } from 'react'
import styles from './MyTodos.module.css'
import Search from '../../components/search/Search'
import { useQuery } from '@apollo/client'
import { GET_USER_POSTS } from '../../graphql/query'
import Loading from '../../components/loading/Loading'
import TodoItem from '../../components/todoItem/TodoItem'
import AddTodoItem from '../../components/addTodoItem/AddTodoItem'
import Logout from '../../components/logout/Logout'

const Home = () => {
  const [todos, setTodos] = useState([])
  const [search, setSearch] = useState('')

  const { loading } = useQuery(GET_USER_POSTS, {
    onCompleted: (data) => {
      setTodos(data.getUserPosts)
    },
  })

  const setSearchText = useCallback((text) => setSearch(text), [])

  if (loading) return <Loading />

  return (
    <div className={styles.home}>
      <Logout />
      <div className={styles.box}>
        <AddTodoItem setTodos={setTodos} todos={todos} />
        <Search search={search} setSearch={setSearchText} />
      </div>
      <h1 className={styles.title}>{search ? `Поиск по запросу: ${search}` : 'Все задачи'}</h1>
      <div className={styles.contentBox}>
        {todos?.length === 0 && <p>Посты не были найдены</p>}
        {todos?.map((i, index) => {
          return (
            <TodoItem
              todos={todos}
              setTodos={setTodos}
              key={i.id + index}
              postId={i.id}
              title={i.title}
              desc={i.body}
              completed={i.completed}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
