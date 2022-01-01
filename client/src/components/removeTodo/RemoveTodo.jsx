import React from 'react'
import Modal from '../modal/Modal'
import styles from './RemoveTodo.module.css'

const RemoveTodo = ({ modalVisible, setModalVisible, postId, onClickRemove }) => {
  return (
    <Modal visible={modalVisible} setVisible={setModalVisible}>
      <h2 className={styles.modalTitle}>Вы действительно хотите удалить данную задачу?</h2>
      <div className={styles.modalFlexBox}>
        <button className={styles.modalBtn} onClick={() => onClickRemove(postId)}>
          Удалить
        </button>
        <button className={styles.modalBtn} onClick={() => setModalVisible(false)}>
          Отменить
        </button>
      </div>
    </Modal>
  )
}

export default RemoveTodo
