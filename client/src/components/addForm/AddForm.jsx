import React, { useState } from 'react'
import styles from './AddForm.module.css'

const AddForm = React.memo(function AddForm({ addNew }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const addNewTask = async (e) => {
    e.preventDefault()
    try {
      await addNew(title, desc, false)
    } catch (error) {
      alert('Ошибка')
      console.log(error)
    }
    setTitle('')
    setDesc('')
  }

  return (
    <form onSubmit={addNewTask} action="" className={styles.addForm}>
      <div className={styles.box}>
        <label htmlFor="title" className={styles.title}>
          Введите название:
        </label>
        <input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          type="text"
        />
      </div>
      <div className={styles.box}>
        <label htmlFor="description" className={styles.title}>
          Введите описание:
        </label>
        <textarea
          className={styles.textarea}
          onChange={(e) => setDesc(e.target.value)}
          required
          value={desc}
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <button type="submit" className={styles.btn}>
        Создать задачу
      </button>
    </form>
  )
})

export default AddForm
