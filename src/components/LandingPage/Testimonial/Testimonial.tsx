import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

import VinhAvatar from '@/assets/images/Vinh.jpg';
import KhanhAvatar from '@/assets/images/Khanh.jpg';
import AnAvatar from '@/assets/images/An.jpg';
import { StaticImageData } from 'next/image';

interface Props {
  children: React.ReactNode;
}

const Testimonial = (props: Props) => {
  const { children } = props;

  return <Box>{children}</Box>;
};

const TestimonialContent = (props: Props) => {
  const { children } = props;

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _hover={{
        bg: 'gray.100',
        cursor: 'pointer',
        transform: 'scale(1.05)',
        transition: 'transform .2s',
      }}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = (props: Props) => {
  const { children } = props;

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = (props: Props) => {
  const { children } = props;

  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: StaticImageData;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src.src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function TestimonialHome() {
  return (
    <Box bg="white">
      <Container maxW={'7xl'} p={10} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading color="teal.500">Our Clients Speak</Heading>
          <Text
            className="w-60 m-auto text-center my-[15px]"
            fontSize={18}
            color={'gray.600'}>
            Client expectations are always the foremost priority guiding our
            platform's continuous improvement and enhancement.
          </Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Easy To Use</TestimonialHeading>
              <TestimonialText>
                Thanks to this platform, I can now effortlessly automate the
                creation of e-learning exams, grade them, and receive the
                results in Gmail with just a few clicks.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={AnAvatar}
              name={'Duc An'}
              title={'High School Teacher'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Saving Time</TestimonialHeading>
              <TestimonialText>
                Applying AI in automatic grading is a good idea, it helps me
                save a lot of time and effort.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={VinhAvatar}
              name={'Dai Vinh'}
              title={'Online Teacher'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Outstanding Service</TestimonialHeading>
              <TestimonialText>
                Outstanding service that far exceeded my expectations, with a
                team that went above and beyond. Truly exceptional!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={KhanhAvatar}
              name={'Quang Khanh'}
              title={'Student'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
