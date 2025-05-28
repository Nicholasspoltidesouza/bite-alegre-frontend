import React, { useEffect } from 'react';
import Home from './Home';
import { useAuthContext } from '../contexts/authContext';
import { router } from 'expo-router';

const App: React.FC = () => {
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      router.push('/Feed');
    }
  }, [token]);

  return <Home />;
};

export default App;
