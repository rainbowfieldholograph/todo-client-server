import TodoToggleComplete from '../todoToggleComplete/TodoToggleComplete'
import RemoveTodoItem from '../removeTodoItem/RemoveTodoItem'
import { memo } from 'react'
import { Box, Typography } from '@mui/material'

const TodoItem = memo(function Item({
  todos,
  setTodos,
  postId,
  title,
  desc,
  completed,
  onToggleCompleted,
}) {
  return (
    <Box sx={{ border: '2px solid lightskyblue', padding: '1rem', wordWrap: 'break-word' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <TodoToggleComplete
          id={postId}
          onToggleCompleted={onToggleCompleted}
          completed={completed}
          todos={todos}
          setTodos={setTodos}
        />
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Typography component="p" variant="h5">
            {completed ? <del>{title}</del> : title}
          </Typography>
          <Typography component="p" variant="h6">
            {completed ? <del>{desc}</del> : desc}
          </Typography>
        </Box>
        <RemoveTodoItem todos={todos} setTodos={setTodos} postId={postId} />
      </Box>
    </Box>
  )
})

export default TodoItem
