import { Button } from '@mui/material'

const AuthButton = ({ children, type = 'button', disabled }) => {
  return (
    <Button
      type={type}
      variant="contained"
      sx={{ maxWidth: 200, width: '100%' }}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

export default AuthButton
