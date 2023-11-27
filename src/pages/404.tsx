import React from 'react';
import { Box, Center, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  return (
    <Center height="100vh">
      <Box textAlign="center">
        <Heading fontSize="6xl" color="red.500">
          404
        </Heading>
        <Text fontSize="2xl" mt={4}>
          Oops! Page not found.
        </Text>
        <Text fontSize="lg" mt={2}>
          The page you are looking for might have been removed or does not
          exist.
        </Text>
        <Button
          colorScheme="teal"
          className="mt-[20px]"
          onClick={() => {
            router.push('/');
          }}>
          Back to Home
        </Button>
      </Box>
    </Center>
  );
};

export default NotFound;
