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
import { FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
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
  phoneNumber: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  title,
  imageSrc,
  githubUrl,
  email,
  phoneNumber,
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
    <HStack mt={4} spacing={4} justifyContent="center">
      <Link href={githubUrl} isExternal>
        <Icon as={FaGithub} w={6} h={6} _hover={{ color: 'gray.600' }} />
      </Link>
      <Link href={`mailto:${email}`} isExternal>
        <Icon as={FaEnvelope} w={6} h={6} _hover={{ color: 'gray.600' }} />
      </Link>
      <Link href={`tel:${phoneNumber}`} isExternal>
        <Icon as={FaPhone} w={6} h={6} _hover={{ color: 'gray.600' }} />
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
        Our Team
      </Heading>
      <Text
        className="w-60 m-auto text-center my-[10px]"
        color={'gray.600'}
        fontSize={{ base: 'sm', sm: 'lg' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
      </Text>
    </Box>

    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
      <TeamMemberCard
        name="Huỳnh Đại Vinh"
        title="Team Leader"
        imageSrc={VinhAvatar}
        githubUrl="https://github.com/alicejohnson"
        email="alice.johnson@example.com"
        phoneNumber="+1234567890"
      />
      <TeamMemberCard
        name="Nguyễn Đức An"
        title="Team Member"
        imageSrc={AnAvatar}
        githubUrl="https://github.com/bobsmith"
        email="bob.smith@example.com"
        phoneNumber="+1234567891"
      />
      <TeamMemberCard
        name="Nguyễn Quang Khánh"
        title="Team Member"
        imageSrc={KhanhAvatar}
        githubUrl="https://github.com/carolwilliams"
        email="carol.williams@example.com"
        phoneNumber="+1234567892"
      />
    </SimpleGrid>
  </Box>
);

export default OurTeamSection;
