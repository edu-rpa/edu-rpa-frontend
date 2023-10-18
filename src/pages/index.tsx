import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <p className="text-[red]">Home Page</p>
      <Button colorScheme="teal" variant="solid">
        Button
      </Button>
      <Button colorScheme="teal" variant="outline">
        Button
      </Button>
    </div>
  );
}
