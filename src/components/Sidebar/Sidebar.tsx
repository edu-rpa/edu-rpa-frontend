import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

import { FaHome, FaRobot, FaFileInvoice } from 'react-icons/fa';
import { RiFlowChart } from 'react-icons/ri';
import { IoIosRocket } from 'react-icons/io';
import { FaFile } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import Navbar from '../Header/Navbar';
import SidebarList from './SidebarList';
import { useSelector } from 'react-redux';
import { homeSelector } from '@/redux/selector';

const sidebarItems = [
  { path: '/home', name: 'Home', icon: FaHome },
  { path: '/studio', name: 'Studio', icon: RiFlowChart },
  { path: '/robot', name: 'Robot', icon: FaRobot },
  { path: '/integration-service', name: 'Integration Service', icon: IoIosRocket },
  { path: '/storage', name: 'Storage', icon: FaFile },
  { path: '/document-template', name: 'Document Template', icon: FaFileInvoice },
];

interface Props {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const { isOpen, onClose } = useDisclosure();
  const pathName = usePathname();
  const { isHiddenSidebar } = useSelector(homeSelector);
  const leftAlignStyle = isHiddenSidebar ? 'left-[120px]' : 'left-[300px]';

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
      display="flex">
      {/* Sidebar */}
      <SidebarList data={sidebarItems} path={pathName} onClose={onClose} />
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

      <Box flex="1" overflowY="auto" overflowX="hidden">
        <Navbar />
        <Box
          style={{ transitionProperty: 'left' }}
          className={
            'relative top-[130px] transition-left duration-500 ease-in-out ' +
            leftAlignStyle
          }>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
