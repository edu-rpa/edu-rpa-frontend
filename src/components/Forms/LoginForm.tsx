import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Divider,
  AbsoluteCenter,
  Link,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SVGIcon from '../Icons/SVGIcon';
import GoogleIcon from '@/assets/svgs/google-icon.svg';
import BaseForm from './BaseForm';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { LoginDto } from '@/dtos/authDto';
import authApi from '@/apis/auth';
import { localStorageService } from '@/utils/profile';
import useAuth from '@/hooks/useAuth';

export default function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const { setAuthToken } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values, actions) => {},
  });

  const handleLogin = useMutation({
    mutationFn: async (payload: LoginDto) => {
      return await authApi.login(payload);
    },
    onSuccess: (data) => {
      toast({
        title: 'Login successfully !',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      localStorageService.setProfile(data);
      router.push('/');
    },
    onError: () => {
      toast({
        title: 'There are some errors in form. Please check carefully !',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    },
  });

  return (
    <BaseForm>
      <form onSubmit={formik.handleSubmit}>
        <h1 className="text-primary font-bold text-3xl">Welcome</h1>
        <p className="text-secondary font-bold text-[15px] my-[20px]">
          Enter your email and password to sign in
        </p>

        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          isInvalid={formik.touched.password && !!formik.errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              type={isVisible ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputRightElement onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? (
                <ViewIcon
                  color="gray.400"
                  boxSize={5}
                  className="hover:opacity-50 hover:cursor-pointer"
                />
              ) : (
                <ViewOffIcon
                  color="gray.400"
                  boxSize={5}
                  className="hover:opacity-50 hover:cursor-pointer"
                />
              )}
            </InputRightElement>
          </InputGroup>
          {formik.touched.password && formik.errors.password && (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          )}
          <FormHelperText>
            <Link href="/auth/forget-password">
              <p className="text-primary">Forgot password?</p>
            </Link>
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          className="w-full mt-[20px]"
          colorScheme="teal"
          variant="solid"
          isLoading={handleLogin.isPending}
          onClick={() => handleLogin.mutate(formik.values)}>
          Sign in
        </Button>

        <Box position="relative" padding="5">
          <Divider />
          <AbsoluteCenter
            px="4"
            className="text-[14px] text-secondary bg-[#fff]">
            or log in with Google
          </AbsoluteCenter>
        </Box>

        <Button
          className="w-full"
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            setAuthToken();
            router.push('/home');
          }}
          leftIcon={<SVGIcon svgComponent={GoogleIcon} />}>
          Sign in with Google
        </Button>
      </form>
    </BaseForm>
  );
}
