import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/logo.png';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  return (
    <div className="bg-[#fff] w-full shadow-header fixed top-0 left-0">
      <div className="w-11/12 m-auto py-[20px] flex justify-between">
        <Image src={logo} width={150} height={150} alt="Logo" />
        <div className="flex justify-between items-center w-[200px]">
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => router.push('/auth/sign-up')}>
            Sign up
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => router.push('/auth/login')}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
