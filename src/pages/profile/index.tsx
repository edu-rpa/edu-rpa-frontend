import React, { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import { QUERY_KEY } from '@/constants/queryKey';
import userApi from '@/apis/userApi';
import { useQuery } from '@tanstack/react-query';

interface ProfileFormData {
  fullName: string;
  email: string;
  avatar: FileList;
}

const ProfilePage: React.FC = () => {
  const toast = useToast();
  const { data: userInfo } = useQuery({
    queryKey: [QUERY_KEY.ME],
    queryFn: () => userApi.getMe(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>();
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    userInfo && userInfo.avatarUrl && setUserAvatar(userInfo.avatarUrl);
  }, [userInfo]);

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    toast({
      title: 'Profile updated.',
      position: 'top-right',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 500,
      isClosable: true,
    });
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('avatar', e.target.files as FileList);
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
            <Avatar size="2xl" src={userAvatar} />
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
            {userInfo && userInfo.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {userInfo && userInfo.email}
          </Text>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} p={5}>
              <FormControl isInvalid={!!errors.fullName}>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Input
                  id="fullName"
                  placeholder="Your name"
                  defaultValue={userInfo && userInfo.name}
                  {...register('fullName')}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  defaultValue={userInfo && userInfo.email}
                  {...register('email')}
                />
              </FormControl>

              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Save
              </Button>
            </Stack>
          </form>
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
