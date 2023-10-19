import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import BaseForm from './BaseForm';
import { useRouter } from 'next/router';

export default function ConfirmEmailForm() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
  });
  return (
    <div className="w-40">
      <h1 className="text-primary font-bold text-3xl text-center">
        Confirm your email
      </h1>
      <p className="text-secondary text-[14px] my-[20px] text-center">
        Please ensure your email is exist
      </p>
      <BaseForm>
        <FormControl>
          <h1 className="text-primary font-bold text-2xl text-center mb-[30px]">
            Enter your email
          </h1>
          {/* New Password */}
          <FormLabel>Email</FormLabel>
          <Input placeholder="Your email" type="email" />

          {/* Sign In Button */}
          <Button
            className="w-full mt-[20px]"
            colorScheme="teal"
            variant="solid"
            onClick={() => router.push('/auth/confirm-email/verify-otp')}>
            Send
          </Button>
        </FormControl>
      </BaseForm>
    </div>
  );
}
