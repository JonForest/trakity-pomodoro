import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from './app/routes/Router';
import ScrollToTop from './app/components/ScrollToTop';

function App() {

  const client = new ApolloClient({
    uri: 'https://trakitypomodoro.herokuapp.com/v1/graphql',
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ApolloProvider client={client}>
      <div className="h-full">
        <Router />
      </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
