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

export default function ForgetPasswordForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [user, setUser] = React.useState({
    newPassword: '',
    confirmPassword: '',
  });
  return (
    <div className="w-40">
      <h1 className="text-primary font-bold text-3xl text-center">
        Recover your password
      </h1>
      <p className="text-secondary text-[14px] my-[20px] text-center">
        Regain Access to Your Account
      </p>
      <BaseForm>
        <FormControl>
          <h1 className="text-primary font-bold text-2xl text-center mb-[30px]">
            Reset password
          </h1>
          {/* New Password */}
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Your new password"
              type={isVisible.newPassword ? 'text' : 'password'}
            />
            <InputRightElement
              onClick={() =>
                setIsVisible((prevState) => ({
                  ...prevState,
                  newPassword: !prevState.newPassword,
                }))
              }>
              {isVisible.newPassword ? (
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
          {/* Confirm Password */}
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Confirm password"
              type={isVisible.confirmPassword ? 'text' : 'password'}
            />
            <InputRightElement
              onClick={() =>
                setIsVisible((prevState) => ({
                  ...prevState,
                  confirmPassword: !prevState.confirmPassword,
                }))
              }>
              {isVisible.confirmPassword ? (
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
            onClick={() => router.push('/auth/login')}>
            Save
          </Button>
        </FormControl>
      </BaseForm>
    </div>
  );
}
