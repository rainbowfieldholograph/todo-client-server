import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
          <Route>
            <div>Not found.</div>
          </Route>
          {console.log('user auth + ')}
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          {console.log('user auth - ')}
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default Router
