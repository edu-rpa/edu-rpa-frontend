import LoginForm from '@/components/Forms/LoginForm';
import Image from 'next/image';
import React, { useEffect } from 'react';
import RPA from '@/assets/images/RPA.png';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { setLocalStorageObject } from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';
import { useToast } from '@chakra-ui/react';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const tokenFromUrl = searchParams.get('token');
  const errorFromCallback = searchParams.get('error');

  useEffect(() => {
    if (tokenFromUrl) {
      toast({
        title: 'Login successfully!',
        status: 'success',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
      setLocalStorageObject(LocalStorage.ACCESS_TOKEN, tokenFromUrl);
      router.push('/home');
    }
  }, [tokenFromUrl]);

  useEffect(() => {
    if (errorFromCallback) {
      toast({
        title: `Login failed! Error: ${errorFromCallback}`,
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [errorFromCallback]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-between w-5/6 m-auto">
        <LoginForm />
        <Image
          className="ml-[30px] w-80"
          src={RPA}
          width={500}
          height={500}
          alt="RPA"
        />
      </div>
    </div>
  );
}
