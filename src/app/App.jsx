import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SplashPage from '../components/pages/SplashPage/SplashPage';
import GlobalNavigator from '/src/components/organisms/GlobalNavigator/GlobalNavigator';
import { loginUserData } from '../utils/controlUserData';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSplashed, setIsSplashed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashed(true);

      if (loginUserData.id) {
        navigate('/library/booktree');
      } else {
        navigate('/login');
      }

      return () => clearTimeout(timer);
    }, 3000);
  });

  if (!isSplashed) return <SplashPage />;

  if (pathname === ('/login' || '/register')) return <Outlet />;

  return (
    <>
      <Outlet />
      <GlobalNavigator />
    </>
  );
}

export default App;
