import React from 'react'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import '../styles/globals.css'

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
