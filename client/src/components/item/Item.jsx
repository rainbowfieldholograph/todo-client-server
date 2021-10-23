import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { REMOVE_POST } from '../../graphql/mutation'
import Circle from '../circle/Circle'
import styles from './Item.module.css'
import removeImg from '../../img/remove.png'
import Modal from '../modal/Modal'

const Item = ({ postId, title, desc, completed, onToggleCompleted, index }) => {
  const [modalVisible, setModalVisible] = useState()
  const [removePost] = useMutation(REMOVE_POST)

  const onClickRemove = async () => {
    try {
      await removePost({
        variables: {
          postId: postId,
        },
      })
      setModalVisible(false)
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.flexBox}>
        <Circle index={index} onToggleCompleted={onToggleCompleted} completed={completed} />
        <div className={styles.infoBox}>
          <h2>{completed ? <del>{title}</del> : title}</h2>
          <p>{completed ? <del>{desc}</del> : desc}</p>
        </div>
        <button onClick={() => setModalVisible(true)} className={styles.removeBtn}>
          <img src={removeImg} alt="remove" />
        </button>
        <Modal visible={modalVisible} setVisible={setModalVisible}>
          <div>
            <h2 className={styles.modalTitle}>Вы действительно хотите удалить данную задачу?</h2>
            <div className={styles.modalFlexBox}>
              <button className={styles.modalBtn} onClick={() => onClickRemove()}>
                Удалить
              </button>
              <button className={styles.modalBtn} onClick={() => setModalVisible(false)}>
                Отменить
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Item
