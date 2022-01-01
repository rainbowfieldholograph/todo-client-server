import { useState, useCallback } from 'react'
import styles from './MyTodos.module.css'
import Search from '../../components/search/Search'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_POSTS } from '../../graphql/query'
import { UPDATE_POST } from '../../graphql/mutation'
import Loading from '../../components/loading/Loading'
import TodoItem from '../../components/todoItem/TodoItem'
import AddNewTodo from '../../components/addNewTodo/AddNewTodo'
import Logout from '../../components/logout/Logout'

const Home = () => {
  const [todos, setTodos] = useState([])
  const [search, setSearch] = useState('')

  const { loading } = useQuery(GET_USER_POSTS, {
    onCompleted: (data) => {
      setTodos(data.getUserPosts)
    },
  })

  const [updatePost] = useMutation(UPDATE_POST)

  const setSearchText = useCallback((text) => setSearch(text), [])

  const onToggleCompleted = useCallback(
    async (id, completed) => {
      try {
        await updatePost({
          variables: {
            id: id,
            completed: completed,
          },
        })
        console.log(id)
        setTodos(
          todos.map((todo) => {
            if (todo.id !== id) return todo
            return { ...todo, completed: !todo.completed }
          })
        )
      } catch (error) {
        alert(error)
      }
    },
    [updatePost, todos]
  )

  if (loading) return <Loading />

  return (
    <div className={styles.home}>
      <Logout />
      <div className={styles.box}>
        <AddNewTodo setTodos={setTodos} todos={todos} />
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
              onToggleCompleted={onToggleCompleted}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
