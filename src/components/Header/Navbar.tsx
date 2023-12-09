import { toggleSidebar } from '@/redux/slice/homeSlice';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import Logo from '@/assets/images/logo.png';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useAuth from '@/hooks/useAuth';

import AvatarImage from '@/assets/images/An.jpg';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { removeAuthToken } = useAuth();
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      pos="fixed"
      top="0"
      left="0"
      style={{ zIndex: 1000 }}
      width="100vw"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between">
      <Box className="flex justify-between items-center">
        <IconButton
          aria-label="Toggle Sidebar"
          icon={<FiMenu fontSize="20" color="#319795" />}
          variant="outline"
          onClick={() => dispatch(toggleSidebar())}
        />
        <Image
          src={Logo}
          width={150}
          height={150}
          alt="Logo"
          className="ml-[10px] hover:cursor-pointer"
        />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton py={2} transition="all 0.3s">
              <HStack>
                <Avatar size="sm" src={AvatarImage.src} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Nguyễn Đức An</Text>
                  <Text fontSize="xs" color="gray.600">
                    ducan1406@gmail.com
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={() => router.push('/profile')}>
                Profile
              </MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  router.push('/auth/login');
                  removeAuthToken();
                }}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;
