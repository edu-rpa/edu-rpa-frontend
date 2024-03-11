import React, { use, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import userApi from '@/apis/userApi';
import { setUser } from '@/redux/slice/userSlice';
import { userSelector } from '@/redux/selector';
import { useDispatch, useSelector } from 'react-redux';

interface ProfileFormData {
  fullName: string;
  email: string;
  avatar: FileList;
}

const ProfilePage: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [userName, setUserName] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] =
    useState<boolean>(false);

  useEffect(() => {
    setUserName(user.name);
  }, [user]);

  const handleUpdateProfile = async () => {
    setIsLoadingUpdateProfile(true);
    if (userName !== user.name && userName !== '') {
      const userFromApi = await userApi.updateProfile({
        name: userName,
      });
      toast({
        title: 'Profile updated.',
        position: 'top-right',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      dispatch(setUser(userFromApi));
    }
    setIsLoadingUpdateProfile(false);
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const userFromApi = await userApi.uploadAvatar(file);
      // NOTE: if user is set to userFromApi completely, the avatarUrl will stay the same and the new avatar will not be displayed (or it will be displayed after a hard refresh)
      dispatch(
        setUser({ ...userFromApi, avatarUrl: URL.createObjectURL(file) })
      );
    }
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <SidebarContent>
      <Box className="w-90 m-auto">
        <Box className="flex justify-between items-center relative">
          <Box
            position="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <Avatar size="2xl" src={user.avatarUrl} />
            {isHovered && (
              <div className="overlay px-[10px]" onClick={handleClick}>
                <Button colorScheme="teal" size="sm" aria-label="Upload avatar">
                  Change Avatar
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={onAvatarChange}
                  ref={hiddenFileInput}
                />
              </div>
            )}
          </Box>
        </Box>
        <Box ml={3}>
          <Text fontWeight="bold" fontSize="2xl">
            {user.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {user.email}
          </Text>
        </Box>
        <Box>
          <Stack spacing={4} p={5}>
            <FormControl>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <Input
                id="fullName"
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                disabled
                placeholder="Your email"
                value={user.email}
              />
            </FormControl>

            <Button
              colorScheme="teal"
              isLoading={isLoadingUpdateProfile}
              onClick={handleUpdateProfile}
              disabled={
                isLoadingUpdateProfile ||
                userName === user.name ||
                userName === ''
              }>
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
      <style jsx>{`
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 50%;
        }
      `}</style>
    </SidebarContent>
  );
};

export default ProfilePage;
