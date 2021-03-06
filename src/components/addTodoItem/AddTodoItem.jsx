import { useMutation } from '@apollo/client'
import { Alert, Button, Snackbar } from '@mui/material'
import { useCallback, useState } from 'react'
import { ADD_NEW_POST } from '../../graphql/mutation'
import AddForm from '../addForm/AddForm'
import MyModal from '../myModal/MyModal'

const AddNewTodo = ({ setTodos, todos }) => {
  const [modal, setModal] = useState(false)
  const [alert, setAlert] = useState(false)

  const [addNewPost, { loading }] = useMutation(ADD_NEW_POST, {
    onCompleted: ({ addPost: newPost }) => {
      setTodos([...todos, newPost])
      setModal(false)
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
      } catch (error) {
        setAlert(true)
        console.log(error)
      }
    },
    [addNewPost]
  )

  return (
    <>
      <Button variant="contained" onClick={() => setModal(true)}>
        Добавить новую задачу
      </Button>
      <MyModal open={modal} onClose={() => setModal(false)}>
        <AddForm addNew={addNewTask} loading={loading} />
      </MyModal>
      <Snackbar open={alert} onClose={() => setAlert(false)} autoHideDuration={3000}>
        <Alert onClose={() => setAlert(false)} sx={{ width: '100%' }} severity="error">
          Error!
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddNewTodo
