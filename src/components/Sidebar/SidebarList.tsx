import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import { IconType } from 'react-icons';
import { useSelector } from 'react-redux';
import { homeSelector } from '@/redux/selector';

interface LinkProps {
  path: string;
  name: string;
  icon: IconType;
}

interface SidebarListProps extends BoxProps {
  data: any;
  path: string;
  onClose: () => void;
}

const SidebarList = ({ onClose, data, path, ...props }: SidebarListProps) => {
  const router = useRouter();
  const { isHiddenSidebar } = useSelector(homeSelector);
  const MAX_WIDTH = 300;
  const MIN_WIDTH = 81;
  const sideBarWidth = !isHiddenSidebar ? MAX_WIDTH : MIN_WIDTH;
  return (
    <Box
      bg="white"
      borderRight="1px"
      pos="fixed"
      transition="width 0.5s ease"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: sideBarWidth }}
      style={{ height: '100vh' }}
      {...props}>
      <Flex alignItems="center" justifyContent="center" className="my-[20px]">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box className="mt-[10vh]">
        {data.map((link: any) => {
          const activeStyle =
            link.path == path ? 'bg-[#4FD1C5] text-white' : '';
          return (
            <SidebarItem
              key={link.name}
              icon={link.icon}
              onClick={() => router.push(link.path)}
              className={activeStyle}>
              {sideBarWidth >= 300 && (
                <p className="text-[14px] ">{link.name}</p>
              )}
            </SidebarItem>
          );
        })}
      </Box>
    </Box>
  );
};
export default SidebarList;
