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
                <Avatar
                  size="sm"
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
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
              <MenuItem>Profile</MenuItem>
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
