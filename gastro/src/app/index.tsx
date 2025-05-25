import React from 'react';
import Home from './screens/Home';
import { useAuthContext } from '../contexts/authContext';
import Feed from './screens/Feed';

const App: React.FC = () => {
  const { token,user, role } = useAuthContext();
  console.log('Token: ', token);
  console.log('User: ', user);
  console.log('Role: ', role);
  //return token ? <Feed /> : <Home />;
  return <Home/>
};

export default App;
