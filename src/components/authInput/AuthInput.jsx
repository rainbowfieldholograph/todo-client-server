import { TextField } from '@mui/material';

const AuthInput = (props) => (
  <TextField variant="outlined" sx={{ maxWidth: 300, width: '100%' }} required {...props} />
);

export default AuthInput;
