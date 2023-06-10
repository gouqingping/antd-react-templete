import { useRoutes } from 'react-router-dom';
import { ArrayRoutes } from './routes';
import AuthProvider from './utils/AuthProvider';
import { useSystem } from '@/hooks/useSystem';
import { useState } from 'react';
const App = () => {
  const [load, setLoad] = useState(false);
  const { init, getTitle } = useSystem();
  !load && init((c) => setLoad(c));
  document.title = getTitle();
  const GlobalRouter = useRoutes(ArrayRoutes);
  // eslint-disable-next-line react/react-in-jsx-scope
  return <AuthProvider>{load && GlobalRouter}</AuthProvider>;
};

export default App;
