import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const go = (nextPath: string) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return path === '/login' ? <Login onNavigate={go} /> : <Home onNavigate={go} />;
}
