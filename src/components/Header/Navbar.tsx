import { toggleSidebar } from '@/redux/slice/homeSlice';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
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
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/slice/userSlice';
import { userSelector } from '@/redux/selector';

import userApi from '@/apis/userApi';
import { useEffect, useState } from 'react';
import { getLocalStorageObject } from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';
import NotificationMenu from './NotificationMenu';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [userInfo, setUserInfo] = useState<any>(null);

  const removeAuthToken = () => {
    localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorage.PROCESS_LIST);
    localStorage.removeItem(LocalStorage.VARIABLE_LIST);
  };

  useEffect(() => {
    const accessToken = getLocalStorageObject(LocalStorage.ACCESS_TOKEN);
    if (accessToken.length != 0) {
      const fetchUserData = async () => {
        try {
          const userData = await userApi.getMe();
          setUserInfo(userData);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      };
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.length != 0) {
      dispatch(setUser(userInfo));
    }
  }, [userInfo]);

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
          onClick={() => router.push('/')}
        />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <NotificationMenu />

        <Flex alignItems="center">
          <Menu>
            <MenuButton py={2} transition="all 0.3s">
              <HStack>
                <Avatar size="sm" bg="gray.500" src={user.avatarUrl} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.email}
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
                  router.push('/');
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
