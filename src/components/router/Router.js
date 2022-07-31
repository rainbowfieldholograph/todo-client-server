import { useContext } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import MyTodos from '../../pages/myTodos/MyTodos';
import Registration from '../../pages/registration/Registration';
import Login from '../../pages/login/Login';
import { AuthContext } from '../../context/context';
import Header from '../header/Header';

const Router = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <HashRouter>
      {isAuth ? (
        <>
          <Header />
          <Switch>
            <Route exact path="/home">
              <MyTodos />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Redirect to="/" />
        </Switch>
      )}
    </HashRouter>
  );
};

export default Router;
