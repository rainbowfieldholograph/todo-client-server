import './defaultStyles.css'
import Router from './components/router/Router'
import apolloClient from './utils/Apollo'
import { ApolloProvider } from '@apollo/client'
import { useEffect, useState } from 'react'
import { AuthContext } from './context/context'

const App = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
      console.log('s')
    }
  }, [])

  console.log(isAuth)

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <ApolloProvider client={apolloClient}>
        <Router />
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
