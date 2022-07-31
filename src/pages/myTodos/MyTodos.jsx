import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Box, CircularProgress, Container, Stack, Typography } from '@mui/material';
import Search from '../../components/search/Search';
import { GET_CURRENT_USER, GET_USER_POSTS } from '../../graphql/query';
import TodoItem from '../../components/todoItem/TodoItem';
import AddTodoItem from '../../components/addTodoItem/AddTodoItem';
import Logout from '../../components/logout/Logout';

const Home = () => {
  const [todos, setTodos] = useState();
  const [search, setSearch] = useState('');

  const { loading: todosLoading } = useQuery(GET_USER_POSTS, {
    onCompleted: (data) => {
      setTodos(data.getUserPosts);
    },
  });

  const { data: userData, loading: userLoading } = useQuery(GET_CURRENT_USER);

  const setSearchText = useCallback((text) => setSearch(text), []);

  console.log(userData, localStorage.getItem('token'));

  const searchTodos = () =>
    todos?.filter((todo) => todo?.title?.toUpperCase().includes(search.toUpperCase()));

  const flexBlockStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1.3rem',
    marginBottom: '1rem',
  };

  if (todosLoading || userLoading)
    return (
      <Box
        sx={{
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={150} />
      </Box>
    );

  return (
    <Container sx={{ marginBlock: '2rem' }}>
      <Box sx={flexBlockStyles}>
        <Typography
          sx={{
            width: 300,
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          variant="h5"
          component="p"
        >
          {userData.getCurrentUser.username}
        </Typography>
        <Logout />
      </Box>
      <Box sx={flexBlockStyles}>
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
          );
        })}
      </Stack>
    </Container>
  );
};

export default Home;
