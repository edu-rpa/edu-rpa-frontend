import React from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import VinhAvatar from '@/assets/images/Vinh.jpg';
import KhanhAvatar from '@/assets/images/Khanh.jpg';
import AnAvatar from '@/assets/images/An.jpg';

interface TeamMemberCardProps {
  name: string;
  title: string;
  imageSrc: any;
  githubUrl: string;
  email: string;
  linkedInUrl: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  title,
  imageSrc,
  githubUrl,
  email,
  linkedInUrl,
}) => (
  <VStack
    bg={'gray.50'}
    boxShadow={'xl'}
    borderRadius="lg"
    p={10}
    textAlign="center"
    role="group"
    _hover={{
      bg: 'gray.100',
      cursor: 'pointer',
      transform: 'scale(1.05)',
      transition: 'transform .2s',
    }}>
    <Image
      className="rounded-full mb-4 w-[150px] h-[150px]"
      src={imageSrc}
      alt={`Picture of ${name}`}
    />
    <Text fontWeight="bold" fontSize="xl">
      {name}
    </Text>
    <Text fontSize="md" color="gray.500">
      {title}
    </Text>
    <Text fontSize="md" color="gray.600">
      Software Engineer
    </Text>
    <HStack mt={4} spacing={10}>
      <Link href={githubUrl} isExternal>
        <Icon as={FaGithub} w={6} h={6} _hover={{ color: '#4FD1C5' }} />
      </Link>
      <Link href={`mailto:${email}`} isExternal>
        <Icon as={FaEnvelope} w={6} h={6} _hover={{ color: '#4FD1C5' }} />
      </Link>
      <Link href={linkedInUrl} isExternal>
        <Icon as={FaLinkedin} w={6} h={6} _hover={{ color: '#4FD1C5' }} />
      </Link>
    </HStack>
  </VStack>
);

const OurTeamSection: React.FC = () => (
  <Box p={8} bg="white">
    <Box className="mb-[30px]">
      <Heading
        as="h2"
        size="xl"
        fontWeight="bold"
        mb={5}
        textAlign="center"
        color="teal.500">
        Who We Are
      </Heading>
      <Text
        className="w-60 m-auto text-center my-[10px]"
        color={'gray.600'}
        fontSize={{ base: 'sm', sm: 'lg' }}>
        We are a thesis team majoring in Computer Science from VNU-HCMUT, Viet
        Nam. This platform represents our wholehearted contribution to the
        community by applying RPA technology into the digital transformation of
        education.
      </Text>
    </Box>

    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
      <TeamMemberCard
        name="Huỳnh Đại Vinh"
        title="MT20KHTN, VNU-HCMUT"
        imageSrc={VinhAvatar}
        githubUrl="https://github.com/02david20"
        email="vinh.huynhdavid2002@hcmut.edu.vn"
        linkedInUrl="https://www.linkedin.com/in/vinh-hu%E1%BB%B3nh-3617511a7/"
      />
      <TeamMemberCard
        name="Nguyễn Đức An"
        title="MT20KHTN, VNU-HCMUT"
        imageSrc={AnAvatar}
        githubUrl="https://github.com/anduckhmt146"
        email="an.nguyenduc1406@hcmut.edu.vn"
        linkedInUrl="https://www.linkedin.com/in/anduckhmt146/"
      />
      <TeamMemberCard
        name="Nguyễn Quang Khánh"
        title="MT20KHTN, VNU-HCMUT"
        imageSrc={KhanhAvatar}
        githubUrl="https://github.com/devquangkhanh09"
        email="khanh.nguyenqk09@hcmut.edu.vn"
        linkedInUrl="https://www.linkedin.com/in/quang-khanh-nguyen/"
      />
    </SimpleGrid>
  </Box>
);

export default OurTeamSection;
