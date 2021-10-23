import React, { useState } from 'react'
import styles from './AddForm.module.css'

const AddForm = ({ addNew, setModal }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const addNewTask = async () => {
    console.log(addNew)
    try {
      await addNew(title, desc)
      setModal(false)
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
    setTitle('')
    setDesc('')
  }

  return (
    <div className={styles.addForm}>
      <div>
        <h3 className={styles.title}>Введите название:</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          type="text"
        />
      </div>
      <div>
        <h3 className={styles.title}>Введите описание:</h3>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className={styles.input}
          type="text"
        />
      </div>
      <button onClick={() => addNewTask()} className={styles.btn}>
        Создать задачу
      </button>
    </div>
  )
}

export default AddForm
