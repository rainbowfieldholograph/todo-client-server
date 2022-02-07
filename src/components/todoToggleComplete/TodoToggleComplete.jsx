import { useMutation } from '@apollo/client'
import { Checkbox } from '@mui/material'
import { useCallback } from 'react'
import { UPDATE_POST } from '../../graphql/mutation'

const TodoToggleComplete = ({ id, completed, todos, setTodos }) => {
  const [updatePost, { loading }] = useMutation(UPDATE_POST)
  const onToggleCompleted = useCallback(
    async (id, completed) => {
      try {
        await updatePost({
          variables: {
            id: id,
            completed: completed,
          },
        })
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
    [updatePost, todos, setTodos]
  )

  return (
    <Checkbox
      size="large"
      checked={completed}
      disabled={loading}
      onClick={() => onToggleCompleted(id, !completed)}
    />
  )
}

export default TodoToggleComplete
