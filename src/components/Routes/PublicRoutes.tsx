import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getLocalStorageObject } from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';

interface Props {
  children?: React.ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const accessToken = getLocalStorageObject(LocalStorage.ACCESS_TOKEN);
    if (accessToken.length != 0) {
      router.push('/home');
    }
  }, []);
  return children;
};

export default PublicRoute;
