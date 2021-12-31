import { useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'
import { ADD_NEW_POST } from '../../graphql/mutation'
import AddForm from '../addForm/AddForm'
import Modal from '../modal/Modal'
import styles from './AddNewTodo.module.css'

const AddNewTodo = ({ setTodos, todos }) => {
  const [modal, setModal] = useState(false)
  const toggleModal = useCallback(() => setModal(!modal), [modal])

  const [addNewPost] = useMutation(ADD_NEW_POST, {
    onCompleted: ({ addPost: newPost }) => {
      setTodos([...todos, newPost])
    },
  })

  const addNewTask = useCallback(
    async (title, desc, completed) => {
      try {
        await addNewPost({
          variables: {
            title: title,
            body: desc,
            completed: completed,
          },
        })
        toggleModal(modal)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    [addNewPost, toggleModal, modal]
  )

  return (
    <>
      <button onClick={() => toggleModal(true)} className={styles.btn}>
        Добавить новую задачу
      </button>
      <Modal visible={modal} setVisible={toggleModal}>
        <AddForm addNew={addNewTask} />
      </Modal>
    </>
  )
}

export default AddNewTodo
