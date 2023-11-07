import { localStorageService } from '@/utils/localStorageService';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
const DynamicCustomModeler = dynamic(
  () => import('@/components/Bpmn/CustomModeler'),
  { ssr: false }
);

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   const profile = localStorageService.getProfile();
  //   profile ?? router.push('/auth/login');
  // }, []);
  return (
    <div>
      <DynamicCustomModeler />
    </div>
  );
}
