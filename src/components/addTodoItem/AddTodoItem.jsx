import { useMutation } from '@apollo/client';
import { Alert, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import { ADD_NEW_POST } from '../../graphql/mutation';
import AddForm from '../addForm/AddForm';
import Modal from '../modal/MyModal';

const AddNewTodo = ({ setTodos, todos }) => {
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);

  const [addNewPost, { loading }] = useMutation(ADD_NEW_POST);

  const addNewTask = async (title, desc, completed) => {
    try {
      const {
        data: { addPost: newTodo },
      } = await addNewPost({
        variables: {
          title: title,
          body: desc,
          completed: completed,
        },
      });

      setTodos([...todos, newTodo]);
      setModal(false);
    } catch (error) {
      setAlert(true);
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setModal(true)}>
        Add new todo
      </Button>
      <Modal open={modal} onClose={() => setModal(false)}>
        <AddForm addNew={addNewTask} loading={loading} />
      </Modal>
      <Snackbar
        open={alert}
        onClose={() => setAlert(false)}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setAlert(false)}
          sx={{ width: '100%' }}
          severity="error"
        >
          Error!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddNewTodo;
