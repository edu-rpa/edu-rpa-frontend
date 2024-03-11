import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function BaseForm({ children }: Props) {
  return (
    <div className="bg-[#fff] w-full rounded-xl p-[30px] shadow-custom-1">
      {children}
    </div>
  );
}
