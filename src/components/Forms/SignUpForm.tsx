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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { SignUpDto } from '@/dtos/authDto';
import { useToast } from '@chakra-ui/react';
import authApi from '@/apis/auth';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '@/redux/slice/authSlice';
import { authSelector } from '@/redux/selector';

interface SignUpFormProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SignUpForm(props: SignUpFormProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const authPayload = useSelector(authSelector);
  const dispatch = useDispatch();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Fullname is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values, actions) => {},
  });
  const handleSignUp = useMutation({
    mutationFn: async (payload: SignUpDto) => {
      return await authApi.signUp(payload);
    },
    onSuccess: () => {
      toast({
        title: 'Fill the confirm successfully !',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      dispatch(updateInfo(formik.values));
      props.setActiveStep(2);
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
  React.useEffect(() => {
    const { email, password, name } = authPayload;
    if (email && password && name) {
      formik.setValues({ email, password, name });
    }
  }, []);
  return (
    <div className="w-40">
      <BaseForm>
        <form onSubmit={formik.handleSubmit}>
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
          <FormControl isInvalid={formik.touched.name && !!formik.errors.name}>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              placeholder="Your full name"
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={formik.touched.email && !!formik.errors.email}>
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
          </FormControl>
          {/* Sign In Button */}
          <Button
            className="w-full mt-[20px]"
            colorScheme="teal"
            variant="solid"
            isLoading={handleSignUp.isPending}
            onClick={() => {
              handleSignUp.mutate(formik.values);
            }}>
            Sign up
          </Button>
          <div className="text-center mt-[10px]">
            Already have an account?{' '}
            <Link className="text-primary" href="/auth/login">
              Sign in ?
            </Link>
          </div>
        </form>
      </BaseForm>
    </div>
  );
}
