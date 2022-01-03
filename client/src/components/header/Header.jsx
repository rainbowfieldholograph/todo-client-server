import { useQuery } from '@apollo/client'
import { Box, Typography } from '@mui/material'
import { GET_CURRENT_USER } from '../../graphql/query'

const Header = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightskyblue',
        padding: '1rem',
      }}
      component="header"
    >
      <Typography component="p" variant="h5">
        Maybetomorrow
      </Typography>
      <Typography component="p" variant="h5">
        {data?.getCurrentUser?.username}
      </Typography>
    </Box>
  )
}

export default Header
