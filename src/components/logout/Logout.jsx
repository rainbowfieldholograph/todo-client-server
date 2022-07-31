import { Button } from '@mui/material';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/context';

const Logout = () => {
  const { setIsAuth } = useContext(AuthContext);
  const history = useHistory();

  const onClickLogOut = () => {
    localStorage.removeItem('token');
    history.push('/');
    setIsAuth(false);
  };

  return (
    <Button variant="outlined" onClick={onClickLogOut}>
      LOGOUT
    </Button>
  );
};

export default Logout;
