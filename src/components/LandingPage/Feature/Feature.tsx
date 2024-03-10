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
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
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
          What we offers
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          In today&apos;s fast-paced business environment, efficiency and
          innovation are at the forefront of success. Our suite of services is
          designed to revolutionize how you work, offering customized solutions
          that drive productivity and growth.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Process Modeling'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              'Optimize your operations with our advanced process modeling techniques. Our tools help you visualize, analyze your workflows, ensuring that you achieve maximum efficiency and quality in every aspect of your business.'
            }
            href={'#'}
          />
          <Card
            heading={'Robot Automation'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              'Embrace the future with our robotic automation services. We provide intelligent systems that automate repetitive tasks, reduce human error, and free up your team to focus on strategic initiatives that propel your business forward.'
            }
            href={'#'}
          />
          <Card
            heading={'Intelligent Grading'}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={
              'Our intelligent grading system utilizes AI to provide instant, accurate assessments. Ideal for educational institutions and training departments, this tool ensures that evaluations are fair, consistent, and objective.'
            }
            href={'#'}
          />
          <Card
            heading={'Email Processing'}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={
              'Transform the way your business handles task assignments with our robust Email Processing service. Our system organizes your incoming messages and autonomously executes tasks.'
            }
            href={'#'}
          />
          <Card
            heading={'Chat Bot'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              'Improve customer engagement with our AI-powered chatbots. They provide instant support, answer queries, and ensure that your customers receive the attention they deserve at any time of the day.'
            }
            href={'#'}
          />
        </Flex>
      </Container>
    </Box>
  );
}
