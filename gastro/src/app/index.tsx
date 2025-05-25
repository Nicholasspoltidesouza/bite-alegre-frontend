import React from 'react';
import Home from './screens/Home';
import { useAuthContext } from '../contexts/authContext';
import Feed from './screens/Feed';

const App: React.FC = () => {
  const { token } = useAuthContext();

  console.log('token app: ', token);

  return token == null ? <Home /> : <Feed />;
};

export default App;
