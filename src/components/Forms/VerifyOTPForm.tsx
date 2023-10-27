import {
  FormControl,
  FormHelperText,
  Button,
  HStack,
  PinInput,
  PinInputField,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react'; // Import useState
import BaseForm from './BaseForm';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/redux/selector';
import { useMutation } from '@tanstack/react-query';
import { ResendOtpDto, VerifyOtpDto } from '@/dtos/authDto';
import authApi from '@/apis/auth';
import { removeInfo } from '@/redux/slice/authSlice';

export default function VerifyOTPForm() {
  const { email } = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleOtpSubmit = useMutation({
    mutationFn: async (payload: VerifyOtpDto) => {
      return await authApi.verifyOtp(payload);
    },
    onSuccess: () => {
      toast({
        title: 'Verify OTP successfully !',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      dispatch(removeInfo());
      router.push('/auth/login');
    },
    onError: () => {
      toast({
        title: 'OTP is wrong. Please check carefully !',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    },
  });

  const handleResendOtp = useMutation({
    mutationFn: async (payload: ResendOtpDto) => {
      return await authApi.resendOtp(payload);
    },
    onSuccess: () => {
      toast({
        title: 'Resend OTP successfully !',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Resend OTP fail. Please try again !',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    },
  });

  return (
    <div className="w-30">
      <BaseForm>
        <FormControl>
          <h1 className="text-primary font-bold text-2xl text-center mb-[30px]">
            Enter OTP
          </h1>
          <HStack className="text-center flex justify-center items-center">
            <PinInput>
              {otpValues.map((value, index) => (
                <PinInputField
                  key={index}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                />
              ))}
            </PinInput>
          </HStack>
          <div className="w-3/5 m-auto mt-[20px]">
            <Button
              className="w-full"
              colorScheme="teal"
              variant="solid"
              isLoading={handleOtpSubmit.isPending}
              onClick={() => {
                const otpCode = otpValues.join('');
                handleOtpSubmit.mutate({ email, otpCode });
              }}>
              Submit
            </Button>
          </div>
          <FormHelperText className="text-center">
            <Button
              colorScheme="teal"
              variant="link"
              isLoading={handleResendOtp.isPending}
              onClick={() => {
                handleResendOtp.mutate({ email });
              }}>
              <p className="text-[13px]">Resend OTP</p>
            </Button>
          </FormHelperText>
        </FormControl>
      </BaseForm>
    </div>
  );
}
