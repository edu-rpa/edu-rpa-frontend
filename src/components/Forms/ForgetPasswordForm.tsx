import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React from 'react';
import BaseForm from './BaseForm';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function ForgetPasswordForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState({
    newPassword: false,
    confirmPassword: false,
  });
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Confirm password is required'),
    }),
    onSubmit: (values, actions) => {},
  });
  return (
    <div className="w-40 mb-[80px]">
      <h1 className="text-primary font-bold text-3xl text-center">
        Recover your password
      </h1>
      <p className="text-secondary text-[14px] my-[20px] text-center">
        Regain Access to Your Account
      </p>
      <BaseForm>
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-primary font-bold text-2xl text-center mb-[30px]">
            Reset password
          </h1>
          <FormControl
            isInvalid={
              formik.touched.newPassword && !!formik.errors.newPassword
            }>
            {/* New Password */}
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Your new password"
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            {formik.touched.newPassword && formik.errors.newPassword && (
              <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Confirm password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <FormErrorMessage>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
              )}
          </FormControl>
          <Button
            className="w-full mt-[20px]"
            colorScheme="teal"
            variant="solid"
            onClick={() => router.push('/auth/login')}>
            Save
          </Button>
        </form>
      </BaseForm>
    </div>
  );
}
