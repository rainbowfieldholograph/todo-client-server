import './defaultStyles.css'
import Router from './components/router/Router'
import apolloClient from './utils/Apollo'
import { ApolloProvider } from '@apollo/client'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router />
    </ApolloProvider>
  )
}

export default App
