import React from 'react';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';

export default function ContactUsHome() {
  return (
    <Box bgColor={'white'}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading
          fontSize={{ base: '2xl', sm: '4xl' }}
          fontWeight={'bold'}
          mt={10}
          color="teal.500">
          Contact Us
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Feel free to reach out to us anytime. We&apos;re here to assist you
          with any questions or concerns you may have.
        </Text>
      </Stack>
      <Container maxW="full" m={0} centerContent overflow="hidden">
        <Flex>
          <Box
            color="#319795"
            bg="#E0F2F1"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}>
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                      Fill up the form below to contact
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          color="#319795"
                          _hover={{ bg: '#4FD1C5', color: 'white' }}
                          leftIcon={<MdPhone size="20px" />}>
                          0852531027
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          color="#319795"
                          _hover={{ bg: '#4FD1C5', color: 'white' }}
                          leftIcon={<MdEmail size="20px" />}>
                          edurpa.contact@gmail.com
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          color="#319795"
                          _hover={{ bg: '#4FD1C5', color: 'white' }}
                          leftIcon={<MdLocationOn size="20px" />}>
                          268 Ly Thuong Kiet, HCMC, Viet Nam
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start">
                      <IconButton
                        aria-label="facebook"
                        variant="ghost"
                        size="lg"
                        _hover={{ bg: '#4FD1C5', color: 'white' }}
                        icon={<MdFacebook size="28px" />}
                      />
                      <IconButton
                        aria-label="github"
                        variant="ghost"
                        size="lg"
                        _hover={{ bg: '#4FD1C5', color: 'white' }}
                        icon={<BsGithub size="28px" />}
                      />
                      <IconButton
                        aria-label="discord"
                        variant="ghost"
                        size="lg"
                        _hover={{ bg: '#4FD1C5', color: 'white' }}
                        icon={<BsDiscord size="28px" />}
                      />
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                              <BsPerson color="gray.800" />
                            </InputLeftElement>
                            <Input
                              type="text"
                              size="md"
                              bg="white"
                              placeholder="Your name"
                              color="#319795"
                              borderRadius="md"
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="email">
                          <FormLabel>Email</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                              <MdOutlineEmail color="gray.800" />
                            </InputLeftElement>
                            <Input
                              type="text"
                              size="md"
                              bg="white"
                              color="#319795"
                              placeholder="Your email"
                              borderRadius="md"
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="message">
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: 'gray.300',
                            }}
                            placeholder="Your message"
                            bg="white"
                            color="#319795"
                            borderRadius="md"
                          />
                        </FormControl>
                        <FormControl id="sendButton" float="right">
                          <Button
                            variant="solid"
                            bg="#319795"
                            color="white"
                            _hover={{ bg: '#4FD1C5', color: 'white' }}
                            borderRadius="md">
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
