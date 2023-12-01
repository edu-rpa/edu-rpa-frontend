import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaHome, FaRobot } from 'react-icons/fa';
import { RiFlowChart } from 'react-icons/ri';
import { IoIosRocket } from 'react-icons/io';
import { FaFile } from 'react-icons/fa6';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav/MobileNav';
import SidebarList from './SidebarList';

const sidebarItems = [
  { path: '/home', name: 'Home', icon: FaHome },
  { path: '/studio-2', name: 'Studio', icon: RiFlowChart },
  { path: '/robot', name: 'Robot', icon: FaRobot },
  { path: '/service', name: 'Integration Service', icon: IoIosRocket },
  { path: '/storage', name: 'Storage', icon: FaFile },
];

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathName = usePathname();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Box>
        <SidebarList
          data={sidebarItems}
          path={pathName}
          onClose={onClose}
          className="hidden md:block"
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarList data={sidebarItems} path={pathName} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <h1>Hello</h1>
    </Box>
  );
};

export default Sidebar;
