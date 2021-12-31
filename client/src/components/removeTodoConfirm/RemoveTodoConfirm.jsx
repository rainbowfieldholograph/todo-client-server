import React from 'react'
import Modal from '../modal/Modal'
import styles from './RemoveTodoConfirm.module.css'

const RemoveTodoConfirm = ({ modalVisible, setModalVisible, postId, onClickRemove }) => {
  return (
    <Modal visible={modalVisible} setVisible={setModalVisible}>
      <div>
        <h2 className={styles.modalTitle}>Вы действительно хотите удалить данную задачу?</h2>
        <div className={styles.modalFlexBox}>
          <button className={styles.modalBtn} onClick={() => onClickRemove(postId)}>
            Удалить
          </button>
          <button className={styles.modalBtn} onClick={() => setModalVisible(false)}>
            Отменить
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default RemoveTodoConfirm
