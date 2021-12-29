import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import MyTodos from '../../pages/myTodos/MyTodos'
import Registration from '../../pages/auth/Registration'
import Login from '../../pages/auth/Login'
import { AuthContext } from '../../context/context'
import Header from '../header/Header'

const Router = () => {
  const { isAuth } = useContext(AuthContext)

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default Router
