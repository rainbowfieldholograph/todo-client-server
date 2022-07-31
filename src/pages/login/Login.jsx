import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import { LOGIN_USER } from '../../graphql/mutation';
import AuthInput from '../../components/authInput/AuthInput';
import AuthContainer from '../../components/authContainer/AuthContainer';

const Login = () => {
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuth } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { username: login, password: password },
      });
      localStorage.setItem('token', data.login);
      if (localStorage.getItem('token')) setIsAuth(true);
      history.push('/home');
    } catch (error) {
      alert('Error');
      console.error(error);
    }
  };

  return (
    <AuthContainer onSubmit={onSubmit}>
      <h2>Login</h2>
      <AuthInput
        id="login"
        label="Login"
        value={login}
        onChange={(event) => setLogin(event.target.value)}
        disabled={loading}
      />
      <AuthInput
        id="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        disabled={loading}
        type="password"
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        Confirm
      </Button>
      <Button
        variant="contained"
        size="large"
        disabled={loading}
        LinkComponent={Link}
        to="/registration"
      >
        Registration
      </Button>
    </AuthContainer>
  );
};

export default Login;
