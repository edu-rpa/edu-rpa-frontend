import React from 'react';
import { Box, Center, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  return (
    <Center height="100vh">
      <Box textAlign="center">
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The page you&apos;re looking for does not seem to exist
        </Text>
        <Button
          colorScheme="teal"
          className="mt-[20px]"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          onClick={() => {
            router.push('/home');
          }}>
          Back to Home
        </Button>
      </Box>
    </Center>
  );
};

export default NotFound;
