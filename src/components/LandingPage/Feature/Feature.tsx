import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
  FcDoughnutChart,
  FcFlowChart,
  FcCollaboration,
  FcTodoList,
  FcReading,
} from 'react-icons/fc';

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}>
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}>
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text
            my={2}
            fontSize={'sm'}
            noOfLines={3}
            overflow="hidden"
            textOverflow="ellipsis">
            {description}
          </Text>
        </Box>
        <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

export default function FeatureHome() {
  return (
    <Box p={5} bgColor={'white'}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading
          fontSize={{ base: '2xl', sm: '4xl' }}
          fontWeight={'bold'}
          mt={5}
          color="teal.500">
          What We Offers
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          EduRPA introduces the power of RPA to the educational sector,
          automates essential tasks, facilitating a digital transformation in
          e-learning.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Design Workflow'}
            icon={<Icon as={FcFlowChart} w={10} h={10} />}
            description={
              'Our platform helps you to visualize, analyze your workflows in a user-friendly interface.'
            }
            href={'#'}
          />
          <Card
            heading={'Robot Automation'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              'Robots helps you to automate repetitive tasks, reduce human error, integrate with AI technology.'
            }
            href={'#'}
          />
          <Card
            heading={'Quiz Transformation'}
            icon={<Icon as={FcTodoList} w={10} h={10} />}
            description={
              'Transform your traditional exams, whether in Word, PDF, or paper format into quiz in Google Forms.'
            }
            href={'#'}
          />
          <Card
            heading={'E-learning Configuration'}
            icon={<Icon as={FcReading} w={10} h={10} />}
            description={
              'Manage eLearning environments, including teachers, students, and materials in Google Classroom.'
            }
            href={'#'}
          />
          <Card
            heading={'Grading Intelligence'}
            icon={<Icon as={FcDoughnutChart} w={10} h={10} />}
            description={
              'Our intelligent grading system utilizes AI to provide instant, accurate assessments. '
            }
            href={'#'}
          />
        </Flex>
      </Container>
    </Box>
  );
}
