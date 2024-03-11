import { homeSelector } from '@/redux/selector';
import React from 'react';
import { useSelector } from 'react-redux';

interface SidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function SidebarContent({
  children,
  className,
  ...props
}: SidebarContentProps) {
  const { isHiddenSidebar } = useSelector(homeSelector);
  const extendSidebar = isHiddenSidebar ? 'w-[90vw]' : 'w-[75vw]';

  return (
    <div
      className={`bg-white rounded-[15px] py-[30px] mb-[30px] relative ${className} ${extendSidebar}`}
      style={{
        transition: 'left 0.5s ease-in-out',
      }}
      {...props}>
      {children}
    </div>
  );
}
