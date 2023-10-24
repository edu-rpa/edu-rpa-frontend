import { localStorageService } from '@/utils/localStorageService';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const profile = localStorageService.getProfile();
    profile ?? router.push('/auth/login');
  }, []);
  return <div></div>;
}
