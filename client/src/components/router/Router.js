import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Registration from '../../pages/auth/Registration'
import Login from '../../pages/auth/Login'
import { AuthContext } from '../../context/context'

const Router = () => {
  const { isAuth } = useContext(AuthContext)

  console.log(isAuth)
  return (
    <BrowserRouter>
      {isAuth ? (
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Redirect to="/home" />
        </Switch>
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
