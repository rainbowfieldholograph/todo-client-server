import { TextField } from '@mui/material'

const AuthInput = ({ id, label, value, onChange, disabled, type = 'text' }) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    value={value}
    onChange={onChange}
    sx={{ maxWidth: 300, width: '100%' }}
    required
    disabled={disabled}
    type={type}
  />
)

export default AuthInput
