import React from 'react';
import { Box, Heading, Container, Text, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams } from 'next/navigation';
import robotCode from '../../../constants/robotCode';
import CodeViewer from '@/components/CodeViewer/CodeViewer';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import robotApi from '@/apis/robotApi';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';

const RobotCode = () => {
  const router = useRouter();
  const params = useParams();

  const { data: robotDetail, isLoading } = useQuery({
    queryKey: [QUERY_KEY.PROCESS_DETAIL],
    queryFn: () => robotApi.getRobotByID(params.id as string),
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Container maxW="container.xl" className="bg-white h-[100vh]">
      <Box className="flex justify-between items-center w-90 m-auto">
        <IconButton
          colorScheme="teal"
          aria-label="Prev to home"
          variant="outline"
          isRound={true}
          size="lg"
          onClick={() => router.push('/robot')}
          icon={<ChevronLeftIcon />}
        />
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          color="teal"
          my={5}
          py={8}>
          Robot Code
        </Heading>
        <Box></Box>
      </Box>

      <Box
        bg="gray.100"
        p={4}
        rounded="lg"
        shadow="md"
        mb={6}
        className="w-90 m-auto">
        <Text fontSize="lg" fontWeight="bold">
          Robot Information:
        </Text>
        <Text>ID: {params && params.id} </Text>
      </Box>
      <Box className="w-90 m-auto">
        <CodeViewer code={robotDetail.code} language="robot" />
      </Box>
    </Container>
  );
};

export default RobotCode;
