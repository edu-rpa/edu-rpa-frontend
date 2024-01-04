import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

interface Props {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/auth/login');
    }
  }, []);
  return children;
};

export default PrivateRoute;
