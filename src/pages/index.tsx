import { LocalStorage } from '@/constants/localStorage';
import { getLocalStorageObject } from '@/utils/localStorageService';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = getLocalStorageObject(LocalStorage.ACCESS_TOKEN);
    if (accessToken) router.push('/home');
  }, []);
  return <div></div>;
}
