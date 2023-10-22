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
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React from 'react';
import SVGIcon from '../Icons/SVGIcon';
import GoogleIcon from '@/assets/svgs/google-icon.svg';
import BaseForm from './BaseForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

export default function LoginForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const initialValues = {
    firstName: '',
    email: '',
    password: '',
  };
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required(),
  });
  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <BaseForm>
      <FormControl>
        <h1 className="text-primary font-bold text-3xl">Welcome</h1>
        <p className="text-secondary font-bold text-[15px] my-[20px]">
          Enter your email and password to sign in
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={SignupSchema}>
          {({ handleSubmit, values, errors }) => (
            <div>
              <InputControl name="firstName" label="First Name" />
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
                <Link className="text-primary" href="/auth/forget-password">
                  Forgot password ?
                </Link>
              </FormHelperText>
              {/* Sign In Button */}
              <Button
                className="w-full mt-[20px]"
                colorScheme="teal"
                variant="solid"
                onClick={() => router.push('/')}>
                Sign in
              </Button>
            </div>
          )}
        </Formik>
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
