import { Box, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.main',
        padding: '1rem',
      }}
      component="header"
    >
      <Typography component="p" variant="h5" color="whitesmoke">
        Maybetomorrow
      </Typography>
    </Box>
  )
}

export default Header
