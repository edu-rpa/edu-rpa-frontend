import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Divider,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React from 'react';
import SVGIcon from '../Icons/SVGIcon';
import GoogleIcon from '@/assets/svgs/google-icon.svg';
import BaseForm from './BaseForm';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignUpForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [user, setUser] = React.useState({
    fullname: '',
    email: '',
    password: '',
  });
  return (
    <div className="w-40">
      <h1 className="text-primary font-bold text-3xl text-center">
        Create Your Account
      </h1>
      <p className="text-secondary text-[14px] my-[20px] text-center">
        Fill in the form or sign up with Google
      </p>
      <BaseForm>
        <FormControl>
          <h1 className="text-primary font-bold text-2xl text-center">
            Register Form
          </h1>
          {/* Google Button  */}
          <div className="flex justify-center items-center my-[20px]">
            <Button
              colorScheme="teal"
              variant="outline"
              leftIcon={<SVGIcon svgComponent={GoogleIcon} />}>
              Sign up with Google
            </Button>
          </div>
          <Box position="relative" padding="5">
            <Divider />
            <AbsoluteCenter
              px="4"
              className="text-[14px] text-secondary bg-[#fff]">
              or fill in the form
            </AbsoluteCenter>
          </Box>
          {/* Full Name */}
          <FormLabel>Full Name</FormLabel>
          <Input placeholder="Your full name" type="text" />
          {/* Email */}
          <FormLabel>Email</FormLabel>
          <Input placeholder="Your email" type="email" />
          {/* Password */}
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Your password"
              type={isVisible ? 'text' : 'password'}
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
          {/* Sign In Button */}
          <Button
            className="w-full mt-[20px]"
            colorScheme="teal"
            variant="solid"
            onClick={() => router.push('/auth/confirm-email')}>
            Sign up
          </Button>
          <FormHelperText className="text-center">
            <div className="mt-[10px]">
              Already have an account?{' '}
              <Link className="text-primary" href="/auth/login">
                Sign in ?
              </Link>
            </div>
          </FormHelperText>
        </FormControl>
      </BaseForm>
    </div>
  );
}
