import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Registration from '../../pages/auth/Registration'
import Login from '../../pages/auth/Login'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route>
          <div>Not found.</div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
