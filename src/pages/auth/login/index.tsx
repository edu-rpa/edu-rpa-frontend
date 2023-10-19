import LoginForm from '@/components/Forms/LoginForm';
import Image from 'next/image';
import React from 'react';
import RPA from '@/assets/images/RPA.png';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-between w-5/6 m-auto">
        <LoginForm />
        <Image
          className="ml-[30px] w-80"
          src={RPA}
          width={500}
          height={500}
          alt="RPA"
        />
      </div>
    </div>
  );
}
