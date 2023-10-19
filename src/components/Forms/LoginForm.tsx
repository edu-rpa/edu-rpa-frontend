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

export default function LoginForm() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  return (
    <BaseForm>
      <FormControl>
        <h1 className="text-primary font-bold text-3xl">Welcome</h1>
        <p className="text-secondary font-bold text-[15px] my-[20px]">
          Enter your email and password to sign in
        </p>
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
        <FormHelperText>
          <a className="text-primary" href="/">
            Forgot password ?
          </a>
        </FormHelperText>
        {/* Sign In Button */}
        <Button className="w-full mt-[20px]" colorScheme="teal" variant="solid">
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
        {/* Google Button  */}
        <Button
          className="w-full"
          colorScheme="teal"
          variant="outline"
          leftIcon={<SVGIcon svgComponent={GoogleIcon} />}>
          Sign in with Google
        </Button>
      </FormControl>
    </BaseForm>
  );
}
