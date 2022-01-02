import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { UPDATE_POST } from '../../graphql/mutation'
import styles from './TodoToggleComplete.module.css'

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
    <button
      disabled={loading ? true : false}
      className={styles.circle}
      onClick={() => onToggleCompleted(id, !completed)}
    >
      <div
        className={completed ? [styles.innerCircle, styles.clicked].join(' ') : styles.innerCircle}
      />
    </button>
  )
}

export default TodoToggleComplete
