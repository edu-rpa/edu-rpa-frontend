import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      router.push('/home');
    } else {
      router.push('/auth/login');
    }
  }, [isLoggedIn]);

  const setAuthToken = () => {
    setIsLoggedIn(true);
    localStorage.setItem('accessToken', '123456');
  };

  const removeAuthToken = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
  };

  return { isLoggedIn, setAuthToken, removeAuthToken };
};

export default useAuth;
