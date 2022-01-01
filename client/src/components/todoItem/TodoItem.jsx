import React, { useState } from 'react'
import Circle from '../circle/Circle'
import styles from './TodoItem.module.css'
import removeImg from '../../img/remove.png'
import { REMOVE_POST } from '../../graphql/mutation'
import { useMutation } from '@apollo/client'
import RemoveTodoConfirm from '../removeTodo/RemoveTodo'

const TodoItem = React.memo(function Item({
  todos,
  setTodos,
  postId,
  title,
  desc,
  completed,
  onToggleCompleted,
}) {
  const [modalConfirm, setModalConfirm] = useState()
  const [removePost] = useMutation(REMOVE_POST)

  const onClickRemove = async (id) => {
    try {
      await removePost({
        variables: {
          postId: id,
        },
      })
      setModalConfirm(false)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.flexBox}>
        <Circle id={postId} onToggleCompleted={onToggleCompleted} completed={completed} />
        <div className={styles.infoBox}>
          <h2>{completed ? <del>{title}</del> : title}</h2>
          <div className={styles.descr}>{completed ? <del>{desc}</del> : desc}</div>
        </div>
        <button onClick={() => setModalConfirm(true)} className={styles.removeBtn}>
          <img src={removeImg} alt="remove" />
        </button>
        <RemoveTodoConfirm
          modalVisible={modalConfirm}
          setModalVisible={setModalConfirm}
          postId={postId}
          onClickRemove={onClickRemove}
        />
      </div>
    </div>
  )
})

export default TodoItem
