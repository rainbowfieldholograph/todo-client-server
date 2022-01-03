import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { REMOVE_POST } from '../../graphql/mutation'
import { IconButton } from '@mui/material'
import { Box, Button, Typography } from '@mui/material'
import MyModal from '../myModal/MyModal'
import DeleteIcon from '@mui/icons-material/Delete'

const RemoveTodoItem = ({ postId, todos, setTodos }) => {
  const [removePost, { loading }] = useMutation(REMOVE_POST)
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
      <IconButton aria-label="delete" onClick={() => setModal(true)}>
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
      <MyModal open={modal} onClose={() => setModal(false)}>
        <Typography sx={{ mb: '1em', textAlign: 'center' }} variant="h5" component="p">
          Вы действительно хотите удалить данную задачу?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button disabled={loading} variant="contained" onClick={() => onClickRemove(postId)}>
            Удалить
          </Button>
          <Button variant="contained" onClick={() => setModal(false)}>
            Отменить
          </Button>
        </Box>
      </MyModal>
    </>
  )
}

export default RemoveTodoItem
