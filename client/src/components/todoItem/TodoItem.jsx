import TodoToggleComplete from '../todoToggleComplete/TodoToggleComplete'
import styles from './TodoItem.module.css'
import RemoveTodoItem from '../removeTodoItem/RemoveTodoItem'
import { memo } from 'react'

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
    <div className={styles.box}>
      <div className={styles.flexBox}>
        <TodoToggleComplete
          id={postId}
          onToggleCompleted={onToggleCompleted}
          completed={completed}
          todos={todos}
          setTodos={setTodos}
        />
        <div className={styles.infoBox}>
          <h2>{completed ? <del>{title}</del> : title}</h2>
          <div className={styles.descr}>{completed ? <del>{desc}</del> : desc}</div>
        </div>
        <RemoveTodoItem todos={todos} setTodos={setTodos} postId={postId} />
      </div>
    </div>
  )
})

export default TodoItem
