import { Box } from '@mui/material'

const AuthContainer = ({ children, onSubmit }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        height: '100%',
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        action=""
        sx={{
          maxWidth: 600,
          width: '100%',
          minHeight: 500,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1.2rem',
          border: '1px solid rgba(0,0,0,0.3)',
          padding: '1rem',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AuthContainer
