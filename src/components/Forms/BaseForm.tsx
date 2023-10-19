import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function BaseForm({ children }: Props) {
  return (
    <div className="bg-[#fff] w-3/5 rounded-xl p-[30px] mr-[100px] shadow-custom-1">
      {children}
    </div>
  );
}
