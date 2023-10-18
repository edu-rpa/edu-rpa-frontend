import LoginForm from '@/components/Forms/LoginForm';
import Image from 'next/image';
import React from 'react';
import RPA from '@/assets/images/RPA.png';

export default function Login() {
  return (
    <div className="mt-[80px]">
      <div className="flex justify-between w-4/5 m-auto">
        <LoginForm />
        <Image src={RPA} width={650} height={650} alt="RPA" />
      </div>
    </div>
  );
}
