import { useMutation } from '@apollo/client'
import React from 'react'
import { REMOVE_POST } from '../../graphql/mutation'
import Circle from '../circle/Circle'
import styles from './Item.module.css'

const Item = ({ postId, title, desc, completed, onToggleCompleted, index }) => {
  const [removePost] = useMutation(REMOVE_POST)

  const onClickRemove = async () => {
    console.log('ID', removePost)
    try {
      await removePost({
        variables: {
          postId: postId,
        },
      })
      alert('Удаление прошло успешно')
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
        <button onClick={() => onClickRemove()} className={styles.removeBtn}>
          X
        </button>
      </div>
    </div>
  )
}

export default Item
