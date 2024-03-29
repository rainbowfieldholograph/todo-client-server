import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '@mui/material';
import AuthContainer from '../../components/authContainer/AuthContainer';
import AuthInput from '../../components/authInput/AuthInput';
import { REGISTER_USER } from '../../graphql/mutation';

const Registration = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser({
        variables: {
          username: login,
          password: password,
        },
      });
      history.push('/');
    } catch (error) {
      alert('Ошибка');
      console.error(error);
    }
  };

  return (
    <AuthContainer onSubmit={onSubmit}>
      <h2>Registration</h2>
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
      <Button type="submit" variant="contained" disabled={loading} size="large">
        Create account
      </Button>
    </AuthContainer>
  );
};

export default Registration;
