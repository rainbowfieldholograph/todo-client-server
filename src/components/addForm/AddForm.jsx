import { Box, Button, TextField, Typography } from '@mui/material';
import { memo, useState } from 'react';

const AddForm = memo(function AddForm({ addNew, loading }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const addNewTask = async (event) => {
    event.preventDefault();
    await addNew(title, desc, false);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem' }}
      component="form"
      onSubmit={addNewTask}
      action=""
    >
      <Typography component="p" variant="h5">
        Add new Todo
      </Typography>
      <TextField
        label="Title"
        id="todo-title"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        sx={{ maxWidth: 400, width: '100%' }}
        disabled={loading}
      />
      <TextField
        id="todo-description"
        onChange={(event) => setDesc(event.target.value)}
        required
        value={desc}
        label="Description"
        multiline
        maxRows={6}
        sx={{ maxWidth: 400, width: '100%' }}
        disabled={loading}
      />
      <Button disabled={loading} variant="contained" type="submit">
        Создать задачу
      </Button>
    </Box>
  );
});

export default AddForm;
