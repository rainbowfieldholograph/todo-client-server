import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../modal/MyModal';
import { REMOVE_POST } from '../../graphql/mutation';

const RemoveTodoItem = ({ postId, todos, setTodos }) => {
  const [removePost, { loading }] = useMutation(REMOVE_POST);
  const [modal, setModal] = useState(false);

  const onClickRemove = async (id) => {
    try {
      await removePost({
        variables: {
          postId: id,
        },
      });
      setModal(false);
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      alert('Error');
      console.error(error);
    }
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={() => setModal(true)}>
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Typography
          sx={{ mb: '1em', textAlign: 'center' }}
          variant="h5"
          component="p"
        >
          Are you sure you want to delete this todo?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            disabled={loading}
            variant="contained"
            onClick={() => onClickRemove(postId)}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={() => setModal(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default RemoveTodoItem;
