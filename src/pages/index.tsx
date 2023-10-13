import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <p className="text-[red]">Home Page</p>
      <Button
        colorScheme="teal"
        size="md"
        onClick={() => {
          router.push('/auth/login');
        }}>
        Login
      </Button>
      <Button
        colorScheme="blue"
        variant="outline"
        size="md"
        className="ml-[20px]"
        onClick={() => {
          router.push('/auth/sign-up');
        }}>
        Sign up
      </Button>
    </div>
  );
}
