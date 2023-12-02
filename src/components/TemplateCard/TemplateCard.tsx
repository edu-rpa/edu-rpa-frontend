import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import SampleImage from '@/assets/images/sample.png';

export default function TemplateCard() {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={4}
          pos={'relative'}>
          <Image src={SampleImage} fill alt="Example" />
        </Box>
        <Stack>
          <Box className="grid grid-cols-3 mb-2">
            <Tag
              borderRadius="full"
              variant="solid"
              className="w-[5vw] p-[10px] flex justify-center items-center text-center"
              colorScheme="green">
              <TagLabel>OCR</TagLabel>
            </Tag>
            <Tag
              className="w-[5vw] p-[10px] flex justify-center items-center text-center"
              borderRadius="full"
              variant="solid"
              colorScheme="orange">
              <TagLabel>Email</TagLabel>
            </Tag>
            <Tag
              className="w-[5vw] p-[10px] flex justify-center items-center text-center"
              borderRadius="full"
              variant="solid"
              colorScheme="blue">
              <TagLabel>PDF</TagLabel>
            </Tag>
          </Box>

          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'xl'}
            fontFamily={'body'}>
            Scan Image
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et...
          </Text>
        </Stack>
        <Button variant="outline" colorScheme="teal" className="mt-[20px]">
          Try it
        </Button>
      </Box>
    </Center>
  );
}
