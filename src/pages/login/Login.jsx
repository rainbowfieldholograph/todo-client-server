import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import { LOGIN_USER } from '../../graphql/mutation';
import AuthInput from '../../components/authInput/AuthInput';
import AuthButton from '../../components/authButton/AuthButton';
import AuthContainer from '../../components/authContainer/AuthContainer';

const Login = () => {
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { setIsAuth } = useContext(AuthContext);
  console.log(localStorage.getItem('token'));

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { username: login, password: password },
      });
      console.log('login data: ', data);
      localStorage.setItem('token', data.login);
      if (localStorage.getItem('token')) setIsAuth(true);
      history.push('/home');
    } catch (error) {
      alert('Ошибка');
      console.log(error);
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
      <AuthButton type="submit" disabled={loading}>
        Confirm
      </AuthButton>
      <AuthButton disabled={loading}>
        <Link to="/registration">Registration</Link>
      </AuthButton>
    </AuthContainer>
  );
};

export default Login;
