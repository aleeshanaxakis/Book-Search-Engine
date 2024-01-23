import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import { yourApolloClientInstance } from './path-to-your-apollo-client-instance';

function App() {
  return (
    <ApolloProvider client={yourApolloClientInstance}>
    <>
      <Navbar />
      <Outlet />
    </>
    </ApolloProvider>
  );
}

export default App;
