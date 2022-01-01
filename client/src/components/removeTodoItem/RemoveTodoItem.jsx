import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { REMOVE_POST } from '../../graphql/mutation'
import Modal from '../modal/Modal'
import styles from './RemoveTodoItem.module.css'
import removeImg from '../../img/remove.png'

const RemoveTodoItem = ({ postId, todos, setTodos }) => {
  const [removePost] = useMutation(REMOVE_POST)
  const [modal, setModal] = useState(false)

  const onClickRemove = async (id) => {
    try {
      await removePost({
        variables: {
          postId: id,
        },
      })
      setModal(false)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
  }

  return (
    <>
      <button onClick={() => setModal(true)} className={styles.removeBtn}>
        <img src={removeImg} alt="remove" />
      </button>
      <Modal visible={modal} setVisible={setModal}>
        <h2 className={styles.modalTitle}>Вы действительно хотите удалить данную задачу?</h2>
        <div className={styles.modalFlexBox}>
          <button className={styles.modalBtn} onClick={() => onClickRemove(postId)}>
            Удалить
          </button>
          <button className={styles.modalBtn} onClick={() => setModal(false)}>
            Отменить
          </button>
        </div>
      </Modal>
    </>
  )
}

export default RemoveTodoItem
