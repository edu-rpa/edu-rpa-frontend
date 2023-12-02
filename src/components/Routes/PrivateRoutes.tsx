import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

interface Props {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn]);

  return children;
};

export default PrivateRoute;
