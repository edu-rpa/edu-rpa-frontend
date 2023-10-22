import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  PinInput,
  PinInputField,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import BaseForm from './BaseForm';
import { useRouter } from 'next/router';

export default function VerityOTPForm() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
  });
  return (
    <div className="w-30">
      <BaseForm>
        <FormControl>
          <h1 className="text-primary font-bold text-2xl text-center mb-[30px]">
            Enter OTP
          </h1>
          {/* Pin Input */}
          <HStack className="text-center flex justify-center items-center">
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          {/* Sign In Button */}
          <div className="w-3/5 m-auto mt-[20px]">
            <Button
              className="w-full"
              colorScheme="teal"
              variant="solid"
              onClick={() => router.push('/auth/confirm-email/verify-otp')}>
              Submit
            </Button>
          </div>

          <FormHelperText className="text-center">
            <Button colorScheme="teal" variant="link">
              <p className="text-[13px]">Resend OTP</p>
            </Button>
          </FormHelperText>
        </FormControl>
      </BaseForm>
    </div>
  );
}
