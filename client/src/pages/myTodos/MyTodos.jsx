import { useState, useCallback } from 'react'
import Search from '../../components/search/Search'
import { useQuery } from '@apollo/client'
import { GET_USER_POSTS } from '../../graphql/query'
import Loading from '../../components/loading/Loading'
import TodoItem from '../../components/todoItem/TodoItem'
import AddTodoItem from '../../components/addTodoItem/AddTodoItem'
import Logout from '../../components/logout/Logout'
import { Box, Container, Stack, Typography } from '@mui/material'

const Home = () => {
  const [todos, setTodos] = useState()
  const [search, setSearch] = useState('')

  const { loading } = useQuery(GET_USER_POSTS, {
    onCompleted: (data) => {
      setTodos(data.getUserPosts)
    },
  })

  const setSearchText = useCallback((text) => setSearch(text), [])

  const searchTodos = () =>
    todos?.filter((todo) => todo?.title?.toUpperCase().includes(search.toUpperCase()))

  if (loading)
    return (
      <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </Box>
    )

  return (
    <Container sx={{ marginBlock: '2rem' }}>
      <Logout />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <AddTodoItem setTodos={setTodos} todos={todos} />
        <Search search={search} setSearch={setSearchText} />
      </Box>
      <Typography
        textAlign="center"
        variant="h4"
        component="p"
        marginBottom="1em"
        sx={{ overflow: 'auto' }}
      >
        {search ? `Search: ${search}` : 'My todos'}
      </Typography>
      <Stack spacing={1}>
        {todos?.length === 0 && (
          <Typography variant="h5" component="p" textAlign="center">
            Todos not found.
          </Typography>
        )}
        {searchTodos()?.map((todo) => {
          return (
            <TodoItem
              todos={todos}
              setTodos={setTodos}
              key={todo.id}
              postId={todo.id}
              title={todo.title}
              desc={todo.body}
              completed={todo.completed}
            />
          )
        })}
      </Stack>
    </Container>
  )
}

export default Home
